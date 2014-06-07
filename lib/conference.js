var common = require("../common");
var redis = require("redis");
var config = require("../config").config;

//连接Redis
var redisClient = redis.createClient(config.redis.port, config.redis.host);

//查找会议
function findConf(confid, callback) {
	redisClient.hget(config.redis.userConfPrefix + confid, function (err, confInfo) {
		if (!common.IsNullOrEmpty(confInfo)) {
			var confinfo = JSON.parse(confInfo);
			callback(1, confinfo);
		}
		else
			callback(0, null);
	});
};

//保存会议信息
function saveConf(confid, confInfo, callback) {
	var key = config.redis.userConfPrefix + confid;
	redisClient.hset(key, JSON.stringify(confInfo), function (err) {
			callback(1);
	});
};

exports.find = findConf;
exports.save = saveConf;