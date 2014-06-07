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

//获取用户所有创建会议信息
function getUserConfs(userid, callback) {
	var key = config.redis.storage.userPrefix + userid;
	redisClient.hgetall(key, function (err, confs) {
		callback(1, confs);
	});
};

//新增用户创建的会议信息
function addConf(userid, confid, confInfo, callback) {
	var key = config.redis.storage.userConfPrefix + userid;
	redisClient.hset(key, confid, JSON.stringify(confInfo), function (err) {
		callback(1);
	});
};

//回调之后设置用户的会议的录音文件地址
function setConfRecord(confid, recordAddress, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (!common.IsNullOrEmpty(confInfo)) {
			confInfo = JSON.parse(confInfo);
			var key = config.redis.storage.userConfPrefix + confInfo.appid + "." + confInfo.uid;

			redisClient.hget(key, confid, function (err2, conf) {
				if (!common.IsNullOrEmpty(conf)) {
					conf = JSON.parse(conf);
					conf.record = recordAddress;
					redisClient.hset(key, confid, JSON.stringify(conf), function (err3) {
						callback(1);
					});
				}
				else
					callback(0);
			});
		}
		else
			callback(0);
	});
};

exports.find = findUser;
exports.save = saveUser;
exports.getConfs = getUserConfs;
exports.addConf = addConf;
exports.setConfRecord = setConfRecord;