var common = require("../common");
var redis = require("redis");
var config = require("../config").config;

//连接Redis
var redisClient = redis.createClient(config.redis.port, config.redis.host);

//查找用户
function findUser(userid, callback) {
	redisClient.get(config.redis.storage.userPrefix + userid, function (err, userinfo) {
		if (!common.IsNullOrEmpty(userinfo)) {
			var userinfo = JSON.parse(userinfo);
			callback(1, userinfo);
		}
		else
			callback(0, null);
	});
};

//保存用户信息，并设置超期时间
function saveUser(userid, userinfo, callback) {
	var key = config.redis.storage.userPrefix + userid;
	redisClient.setnx(key, JSON.stringify(userinfo), function (err) {
		redisClient.expire(key, config.redis.storage.userExpiretime * 60, function (ex) {
			callback(1);
		});
	});
};

exports.find = findUser;
exports.save = saveUser;