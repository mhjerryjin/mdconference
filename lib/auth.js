var common = require("../common");
var user = require("./user");
var xmlReader = require("xml2js");
var config = require("../config").config;

//呼叫鉴权
function processAccess(res, req) {
	if (req.method != "POST") {
		common.Write(res, req, null, true, false);
	}
	else {
		common.GetReqResut(res, req, function (bodyContent) {
			if (common.IsNullOrEmpty(bodyContent))
				common.Write(res, req, result, true, true);
			else {
				var parser = new xmlReader.Parser();
				parser.parseString(bodyContent, function (error, data) {

					console.log(data);

					var action = data['request']['action'];
					var type = data['request']['type'];
					var orderid = data['request']['orderid'];
					var caller = data['request']['caller'];
					var called = data['request']['called'];

					var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><Response><statuscode>0000</statuscode>";

					if (action == "CallAuth") {
						xml += "<statusmsg><statusmsg>";
						xml += "<record>1<record>";
					}
					else if (action == "CallEstablish") {
						xml += "<statusmsg><statusmsg>";
						xml += "<billdata>1<billdata>";
					}
					else if (action == "Hangup") {
						xml += "<statusmsg><statusmsg>";
						xml += "<totalfee><totalfee>";
					}
					xml += "</Response>";

					common.WriteXML(res, req, xml);
				});
			}
		});
	}
};

exports.access = processAccess;