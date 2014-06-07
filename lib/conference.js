var common = require("../common");
var redis = require("redis");
var config = require("../config").config;

//连接Redis
var redisClient = redis.createClient(config.redis.port, config.redis.host);

//查找会议
function findConf(confid, callback) {
	redisClient.hget(config.redis.confKey, confid, function (err, confInfo) {
		if (!common.IsNullOrEmpty(confInfo)) {
			var confinfo = JSON.parse(confInfo);
			callback(1, confinfo);
		}
		else
			callback(0, null);
	});
};

//保存会议信息
function saveConf(userid, confid, confInfo, callback) {
	var conf = JSON.stringify(confInfo);
	redisClient.hset(config.redis.confKey, confid, conf, function (err) {
		var key2 = config.redis.userConfPrefix + userid;
		redisClient.hset(key2, confid, conf, function (err) {
			callback(1);
		});
	});
};

//会议邀请加入人
function inviteConf(confid, userInfo, callback) {
	redisClient.hget(config.redis.confKey, confid, function (err, confInfo) {
		confInfo = JSON.parse(confInfo);
		if (common.IsNullOrEmpty(confInfo.users)) {
			confInfo.users = [];
		}
		confInfo.users.push(userInfo);

		redisClient.hset(config.redis.confKey, confid, JSON.stringify(confInfo), function (err) {
			callback(1);
		});
	});
};

//删除会议信息
function removeConf(confid, callback) {
	redisClient.hdel(config.redis.confKey, confid, function (err) {
		callback(1);
	});
};

exports.find = findConf;
exports.save = saveConf;
exports.invite = inviteConf;
exports.remove = removeConf;