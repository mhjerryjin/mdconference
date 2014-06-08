﻿var qs = require("querystring");
var url = require("url");
var common = require("../common");
var config = require("../config").config;
var conference = require("./conference");

//加入会议回调处理
function processJoin(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		console.log("processJoin:" + req.url);
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
		console.log("processQuit:" + req.url);
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

exports.quit = processQuit;
exports.join = processJoin;