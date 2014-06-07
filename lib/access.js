var qs = require("querystring");
var url = require("url");
var common = require("../common");
var user = require("./user");
var conference = require("./conference");
var ytx = require("yuntongxun");
var config = require("../config").config;

//处理首页
function Homepage(res, req) {
	var html = '<html><header><title>明道 mingdao.com,企业社会化协作平台,企业2.0产品</title></header><body>';
	html += '<p>明道语音会议</p>';
	html += '</body></html>';

	common.WriteHtml(res, req, html);
};

//创建账号，返回voip等信息
function getSubAccount(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, result, true, true);
			else {
				jsonObj = JSON.parse(json);

				var userid = jsonObj.appid + jsonObj.id;

				user.find(userid, function (status, result) {
					if (status == 1) {
						var api = ytx.init(config.yuntongxun);
						var conInfo = {"friendlyName": userid};
						api.createSubAccount(conInfo, function (err, re, data) {
							if (data.statusCode == "111150") {
								//账号已经存在
								api.querySubAccountByName(conInfo, function (err2, re2, data2) {
									saveUser(res, req, userid, data2);
								});
							}
							else if (data.statusCode == "000000") {
								saveUser(res, req, userid, data);
							}
							else
								common.Write(res, req, null, true, false);
						});
					}
					else {
						console.log(result);
						common.Write(res, req, result, true, true);
					}
				});
			}
		});
	}
};

//创建会议
function createConference(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, result, true, true);
			else {
				jsonObj = JSON.parse(json);
				var conInfo = {"autorecord": true};
				if (!common.IsNullOrEmpty(jsonObj.pwd))
					conInfo.passwd = jsonObj.pwd;

				var api = ytx.init(config.yuntongxun);
				api.createConf(conInfo, function (err, re, data) {
					if (err)
						common.Write(res, req, null, true, false);
					else {
						if (data.statusCode == "000000") {
							jsonObj = {id: data.confid, vid: data.voiptoconfid, pwd: jsonObj.pwd};
							conference.save(data.confid, jsonObj, function (status) {
								jsonObj.status = 1;
								delete jsonObj.pwd;
								common.Write(res, req, jsonObj, true, true);
							});
						}
						else
							common.Write(res, req, null, true, false);
					}
				});
			}
		});
	}
};

//停止会议
function stopConference(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, result, true, true);
			else {
				jsonObj = JSON.parse(json);
				var conInfo = {"confid": jsonObj.id};
				var api = ytx.init(config.yuntongxun);
				api.dismissConf(conInfo, function (err, re, data) {
					if (data.statusCode == "000000") {
						conference.remove(data.confid, function (status) {
							common.Write(res, req, null, true, true);
						});
					}
					else
						common.Write(res, req, null, true, false);
				});
			}
		});
	}
};

//保存用户信息
function saveUser(res, req, userid, data) {
	var json = {id: data.SubAccount.subAccountSid, token: data.SubAccount.subToken, voip: data.SubAccount.voipAccount, voipPwd: data.SubAccount.voipPwd};
	user.save(userid, json, function (status) {
		common.Write(res, req, {status: "1", user: json}, true, true);
	});
}


exports.homepage = Homepage;
exports.getAccount = getSubAccount;
exports.createConf = createConference;
exports.stopConf = stopConference;