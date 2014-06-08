var qs = require("querystring");
var url = require("url");
var common = require("../common");
var config = require("../config").config;
var conference = require("./conference");
var user = require("./user");

//加入会议回调处理
function processJoin(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.Log("processJoin:" + req.url);
		var confid = qs.parse(url.parse(req.url).query).confid;
		var callid = qs.parse(url.parse(req.url).query).callid;
		var jointime = qs.parse(url.parse(req.url).query).jointime;
		var number = qs.parse(url.parse(req.url).query).number;

		if (!common.IsNullOrEmpty(confid) && !common.IsNullOrEmpty(callid) && !common.IsNullOrEmpty(number)) {
			conference.setJoin(confid, callid, number, function (status) {
				common.Write(res, req, null, true, true);
			});
		}
		else
			common.Write(res, req, null, true, false);
	}
};

//退出会议回调处理
function processQuit(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.Log("processQuit:" + req.url);
		var confid = qs.parse(url.parse(req.url).query).confid;
		var callid = qs.parse(url.parse(req.url).query).callid;
//		var quittime = qs.parse(url.parse(req.url).query).quittime;

		if (!common.IsNullOrEmpty(confid) && !common.IsNullOrEmpty(callid)) {
			conference.setQuit(confid, callid, function (status) {
				common.Write(res, req, null, true, true);
			});
		}
		else
			common.Write(res, req, null, true, false);
	}
};

//解散、停止会议回调处理
function processStop(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.Log("processStop:" + req.url);
		var confid = qs.parse(url.parse(req.url).query).confid;

		if (!common.IsNullOrEmpty(confid)) {
			conference.remove(confid, function (status) {
				common.Write(res, req, null, true, true);
			});
		}
		else
			common.Write(res, req, null, true, false);
	}
};

//录音地址处理
function processRecord(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.Log("processRecord:" + req.url);
		//confid={confid}&callid={callid}&notifytype={notifytype}&result={result}&state={state}&recordurl={recordurl}&recordduration={recordduration}
		var confid = qs.parse(url.parse(req.url).query).confid;
		var notifytype = qs.parse(url.parse(req.url).query).notifytype;
		var result = qs.parse(url.parse(req.url).query).result;
		var state = qs.parse(url.parse(req.url).query).state;
		var recordurl = qs.parse(url.parse(req.url).query).recordurl;

		if (!common.IsNullOrEmpty(confid)) {
			if (notifytype == "2" && result == "0" && state == "12")
				user.setConfRecord(confid, recordurl, function (status) {
					common.Write(res, req, null, true, true);
				});
		}
		else
			common.Write(res, req, null, true, false);
	}
};

exports.quit = processQuit;
exports.join = processJoin;
exports.stop = processStop;
exports.record = processRecord;