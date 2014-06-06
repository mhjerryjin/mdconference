var qs = require("querystring");
var url = require("url");
var common = require("../common");
var ytx = require("yuntongxun");
var config = require("../config").config;

//处理首页
function processHomepage(res, req) {
	var api = ytx.init(config.yuntongxun);
	api.createSubAccount({friendlyName:'jerry1'}, function (err, req, data) {
		common.Write(res, req, data, true, true);
	});
};

exports.homepage = processHomepage;