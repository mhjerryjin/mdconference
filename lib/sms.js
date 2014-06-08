var common = require("../common");
var ytx = require("yuntongxun");
var config = require("../config").config;

//发送模板短信
function sendNoticeSms(res, req) {
	var callback = qs.parse(url.parse(req.url).query).c;
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (json) {
			if (common.IsNullOrEmpty(json))
				common.Write(res, req, result, true, true);
			else {
				jsonObj = JSON.parse(json);
				var api = ytx.init(config.yuntongxun);
				var conInfo = {"to": jsonObj.mps, "templateId": "1", "datas": ["1"]};
				api.templateSMS(conInfo, function (err, re, data) {
					if (data.statusCode == "000000")
						common.Write(res, req, null, true, true);
					else
						common.Write(res, req, null, true, false);
				});
			}
		});
	}
};

exports.sendNotice = sendNoticeSms;