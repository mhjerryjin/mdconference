﻿var config = {
	server: {
		port: 80
	},
	redis: {
		host: '127.0.0.1',
		port: 6379,
		storage: {
			userPrefix: 'md.ytx.u.', //用户信息
			userExpiretime : 720, //分钟，超时时间
			confKey: 'md.ytx.conf.key', //会议信息
			userConfPrefix: 'md.ytx.uc.' //会议信息
		}
	},
	yuntongxun: {
		accountSid: 'aaf98f89449fa40e0144b974ec1e13cb',
		authToken: 'd213fb19a8b24ce7b899eaa3fcc4907b',
		appId: 'aaf98fda45df8fde0145f38eedc21164',
		resturi: 'https://app.cloopen.com:8883',
		baseUrl: 'https://sandboxapp.cloopen.com:8883',
		softVersion: '2013-12-26'
	},
	filepath: 'd:/weixin/',
	logpath: 'd:/log.txt'
};
exports.config = config;

var accessHandler = require("./lib/access");
var authHandler = require("./lib/auth");
var handle = {};
handle["/"] = accessHandler.homepage;
handle["/getuser"] = accessHandler.getAccount;
handle["/getConf"] = accessHandler.getConf;
handle["/getConfUsers"] = accessHandler.getConfUsers;
handle["/createConf"] = accessHandler.createConf;
handle["/joinConf"] = accessHandler.joinConf;
handle["/inviteConf"] = accessHandler.inviteConf;
handle["/quiteConf"] = accessHandler.quiteConf;
handle["/muteConf"] = accessHandler.muteConf;
handle["/unmuteConf"] = accessHandler.unmuteConf;
handle["/stopConf"] = accessHandler.stopConf;

handle["/auth"] = authHandler.access;

exports.router = handle;