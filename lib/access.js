var qs = require("querystring");
var url = require("url");
var common = require("../common");
var user = require("./user");
var conference = require("./conference");
var ytx = require("yuntongxun");
var config = require("../config").config;
var async = require("async");

//处理首页
function Homepage(res, req) {
	var html = '<html><header><title>云话 明道 mingdao.com,企业社会化协作平台,企业2.0产品</title></header><body>';
	html += '<p>明道云话</p>';
	html += '</body></html>';

	common.WriteHtml(res, req, html);
};

//创建账号，返回voip等信息
function getSubAccount(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);

				var userid = jsonObj.appid + '.' + jsonObj.id;

				user.find(userid, function (status, result) {
					if (status == 0) {
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

//返回某个用户所有创建的会议信息
function getUserConferences(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);

				var userid = jsonObj.appid + '.' + jsonObj.id;

				user.getConfs(userid, function (status, confs) {
					var info = {status: 1, confs: []};
					for (var i in confs) {
						delete confs[i].pwd;
						info.confs.push(confs[i]);
					}
					common.Write(res, req, info, true, true);
				});
			}
		});
	}
};

//创建会议
function createConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				var conInfo = {"autorecord": true};
//				if (!common.IsNullOrEmpty(jsonObj.pwd))
//					conInfo.passwd = jsonObj.pwd;
				conInfo.quiturl = "quit";
				conInfo.joinurl = "join";
				conInfo.delreporturl = "stop";
				conInfo.mediaopturl = "record";

				var userid = jsonObj.appid + '.' + jsonObj.id;

				var api = ytx.init(config.yuntongxun);
				api.createConf(conInfo, function (err, re, data) {
					if (err) {
						console.log(err);
						common.Write(res, req, null, true, false);
					}
					else {
						if (data.statusCode == "000000") {
							jsonObj = {id: data.confid, uid: jsonObj.id, appid: jsonObj.appid, vid: data.voiptoconfid, name: jsonObj.name, time: jsonObj.time, pwd: jsonObj.pwd, ctime: new Date().toString()};
							conference.save(userid, data.confid, jsonObj, function (status) {
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

//获取会议基本信息
function getConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				conference.find(jsonObj.id, function (status, result) {
					if (status == 1) {
						console.log(result);
						jsonObj.status = 1;
						common.Write(res, req, result, true, true);
					}
					else
						common.Write(res, req, null, true, false);
				});
			}
		});
	}
};

//获取会议信息以及邀请加入的用户
function getConferenceUsers(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				getConferenceWithYTX(jsonObj.id, function (status, result) {
					if (status == 1 && result.state == 1) {
						conference.find(jsonObj.id, function (status2, confInfo) {
							if (status2 == 1) {
								confInfo.status = 1;
								delete confInfo.vid;
								delete confInfo.name;
								delete confInfo.time;
								delete confInfo.pwd;
								delete confInfo.ctime;
								common.Write(res, req, confInfo, true, true);
							}
							else
								common.Write(res, req, null, true, false);
						});
					}
					else
						common.Write(res, req, null, true, false);
				});
			}
		});
	}
};

//停止会议
function stopConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				var conInfo = {"confid": jsonObj.id, "autohangup": true};
				conInfo.delurl = "stop";
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

//加入会议
function joinConference(res, req) {
//	var callback = qs.parse(url.parse(req.url).query).c;
//	if (req.method != "POST") {
//		common.Write(res, req, null, true, false);
//	}
//	else {
//		common.GetReqResut(res, req, function (json) {
//			if (common.IsNullOrEmpty(json))
//				common.Write(res, req, null, true, false);
//			else {
//				jsonObj = JSON.parse(json);
//				var conInfo = {"confid": jsonObj.id, "callid": "", "role": 1};
//				var api = ytx.init(config.yuntongxun);
//				api.joinConf(conInfo, function (err, re, data) {
//					if (data.statusCode == "000000")
//						common.Write(res, req, null, true, true);
//					else
//						common.Write(res, req, null, true, false);
//				});
//			}
//		});
//	}
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				async.eachSeries(jsonObj.users, function (key, next) {
					var userInfo = {"callid": "", "id": key.id, "number": key.number, "name": key.name, "state": 0};
					conference.add(jsonObj.id, userInfo, function (status) {
						next();
					});
				}, function (err) {
					common.Write(res, req, null, true, true);
				});
			}
		});
	}
};

//邀请加入会议
function inviteConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				async.eachSeries(jsonObj.users, function (key, next) {
					var conInfo = {"confid": jsonObj.id, "number": key.number, "role": 0};
					conInfo.joinurl = "join";
					var api = ytx.init(config.yuntongxun);
					api.inviteJoinConf(conInfo, function (err, re, data) {
						console.log(data);
						if (data.statusCode == "000000") {
							var userInfo = {"callid": "", "id": key.id, "number": key.number, "name": key.name, "state": 0};
							conference.add(jsonObj.id, userInfo, function (status) {
								next();
							});
						}
						else {
							next();
						}
					});
				}, function (err) {
					common.Write(res, req, null, true, true);
				});
			}
		});
	}
};

//呼叫加入会议的手机
function callAllConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				conference.find(jsonObj.id, function (status, confInfo) {
					if (status == 1) {
						if (common.IsNullOrEmpty(confInfo.users))
							common.Write(res, req, {"status": 0, "msg": "会议尚为有人加入"}, true, true);
						else {
							async.eachSeries(confInfo.users, function (key, next) {
								if (key.state == 0 && !common.IsNullOrEmpty(key.number)) {
									var conInfo = {"confid": jsonObj.id, "number": key.number, "role": 0};
									conInfo.joinurl = "join";
									var api = ytx.init(config.yuntongxun);
									api.inviteJoinConf(conInfo, function (err, re, data) {
										console.log(data);
										next();
									});
								}
								else
									next();
							}, function (err) {
								common.Write(res, req, null, true, true);
							});
						}
					}
					else
						common.Write(res, req, {"status": 0, "msg": "会议不存在"}, true, true);
				});
			}
		});
	}
};

//退出会议
function quitConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				async.eachSeries(jsonObj.users, function (key, next) {
					var conInfo = {"confid": jsonObj.id, "callid": key.callid};
					var api = ytx.init(config.yuntongxun);
					api.quitConf(conInfo, function (err, re, data) {
						console.log(data);
						next();
					});
				}, function (err) {
					conference.quite(jsonObj.id, jsonObj.users, function (status) {
						if (status == 1)
							common.Write(res, req, null, true, true);
						else
							common.Write(res, req, null, true, false);
					});
				});
			}
		});
	}
};

//静音参会者
function muteConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				async.eachSeries(jsonObj.users, function (key, next) {
					var conInfo = {"confid": jsonObj.id, "callid": key.callid};
					var api = ytx.init(config.yuntongxun);
					api.confMute(conInfo, function (err, re, data) {
						console.log(data);
						next();
					});
				}, function (err) {
					common.Write(res, req, null, true, true);
				});
			}
		});
	}
};
//取消静音参会者
function unmuteConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				async.eachSeries(jsonObj.users, function (key, next) {
					var conInfo = {"confid": jsonObj.id, "callid": key.callid};
					var api = ytx.init(config.yuntongxun);
					api.confUnMute(conInfo, function (err, re, data) {
						console.log(data);
						next();
					});
				}, function (err) {
					common.Write(res, req, null, true, true);
				});
			}
		});
	}
};

//设置会议密码
function setNumberConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				conference.setNumber(jsonObj.id, jsonObj.uid, jsonObj.number, function (status) {
					if (status == 1)
						common.Write(res, req, null, true, true);
					else
						common.Write(res, req, null, true, false);
				});
			}
		});
	}
};

//设置会议密码
function pwdConference(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, null, true, false);
			else {
				jsonObj = JSON.parse(json);
				conference.setPwd(jsonObj.id, jsonObj.pwd, function (status) {
					if (status == 1)
						common.Write(res, req, null, true, true);
					else
						common.Write(res, req, null, true, false);
				});
			}
		});
	}
};

//从云通讯获取会议信息
function getConferenceWithYTX(confid, callback) {
	var conInfo = {"confid": confid, "QueryConfState": ""};
	var api = ytx.init(config.yuntongxun);
	api.queryConfState(conInfo, function (err, re, data) {
		if (data.statusCode == "000000")
			callback(1, data);
		else
			callback(0, null);
	});
};

//保存用户信息
function saveUser(res, req, userid, data) {
	var json = {id: data.SubAccount.subAccountSid, token: data.SubAccount.subToken, voip: data.SubAccount.voipAccount, voipPwd: data.SubAccount.voipPwd};
	user.save(userid, json, function (status) {
		common.Write(res, req, {status: "1", user: json}, true, true);
	});
};

exports.homepage = Homepage;
exports.getAccount = getSubAccount;
exports.getUserConfs = getUserConferences;
exports.getConf = getConference;
exports.getConfUsers = getConferenceUsers
exports.createConf = createConference;
exports.joinConf = joinConference;
exports.inviteConf = inviteConference;
exports.callAllConf = callAllConference;
exports.quiteConf = quitConference;
exports.muteConf = muteConference;
exports.unmuteConf = unmuteConference;
exports.pwdConf = pwdConference;
exports.setNumber = setNumberConference
exports.stopConf = stopConference;

//getConferenceWithYTX('60002559', function (status, result) {
//	console.log(result);
//});