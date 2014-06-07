var config = {
	server: {
		port: 8080
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
	mdapi: {
		appkey: 'F5F59336384F',
		appsecret: '23EB2FD6714C3527CE488FBFD2CF5062',
		homeuri: 'http://mdcon.mingdao.com/home',
		callbackuri: 'http://mdcon.mingdao.com/mdcallback',
		shortenuri: 'http://mdu.pw/yourls-api.php?url={0}&action=shorturl&signature=f02c34246b&format=json',
		appuri: {
			authorize: 'https://api.mingdao.com/oauth2/authorize',
			access_token: 'https://api.mingdao.com/oauth2/access_token',
			passportuseretail: 'https://api.mingdao.com/passport/detail',
			create_feed: 'https://api.mingdao.com/post/update',
			create_feed_file: 'https://api.mingdao.com/post/upload',
			my_joined_group: 'https://api.mingdao.com/group/my_joined',
			create_sys: 'https://api.mingdao.com/message/create_sys',
			get_autoid: 'https://api.mingdao.com/mdprivate/token/getautoid',
			//get_autoid: 'http://172.16.22.159/md.api.web/mdprivate/token/getautoid',
			access_tokenbyid: 'https://api.mingdao.com/mdprivate/token/create',
			//access_tokenbyid: 'http://172.16.22.159/md.api.web/mdprivate/token/create',
			logout: 'https://api.mingdao.com/passport/logout'
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
handle["/createConf"] = accessHandler.createConf;
handle["/joinConf"] = accessHandler.joinConf;
handle["/stopConf"] = accessHandler.stopConf;
handle["/auth"] = authHandler.access;

exports.router = handle;