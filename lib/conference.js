var common = require("../common");
var redis = require("redis");
var config = require("../config").config;

//连接Redis
var redisClient = redis.createClient(config.redis.port, config.redis.host);

//查找会议
function findConf(confid, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
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
	redisClient.hset(config.redis.storage.confKey, confid, conf, function (err) {
		var key2 = config.redis.storage.userConfPrefix + userid;
		redisClient.hset(key2, confid, conf, function (err) {
			callback(1);
		});
	});
};

//会议邀请加入人
function inviteConf(confid, userInfo, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		confInfo = JSON.parse(confInfo);
		if (common.IsNullOrEmpty(confInfo.users)) {
			confInfo.users = [];
		}
		confInfo.users.push(userInfo);

		redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err) {
			callback(1);
		});
	});
};

//会议批量踢人
function quitConf(confid, users, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		confInfo = JSON.parse(confInfo);
		if (common.IsNullOrEmpty(confInfo.users)) {
			callback(0);
		}
		else {
			confInfo.users.forEach(function (user) {
				users.forEach(function (item) {
					if (user.callid == item.callid) {
						user.state = 2;
					}
				});
			});

			redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err) {
				callback(1);
			});
		}
	});
};

//设置加入人的callid
function setJoinConf(confid, callid, number, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		confInfo = JSON.parse(confInfo);
		if (common.IsNullOrEmpty(confInfo.users)) {
			callback(0);
		}
		else {
			confInfo.users.forEach(function (user) {
				if(user.number == number)
				{
					user.callid = callid;
					user.state = 1;
				}
			});

			redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err) {
				callback(1);
			});
		}
	});
};
//设置退出人的状态
function setQuitConf(confid, callid, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		confInfo = JSON.parse(confInfo);
		if (common.IsNullOrEmpty(confInfo.users)) {
			callback(0);
		}
		else {
			confInfo.users.forEach(function (user) {
				if(user.callid == callid)
					user.state = 2;
			});

			redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err) {
				callback(1);
			});
		}
	});
};

//删除会议信息
function removeConf(confid, callback) {
	redisClient.hdel(config.redis.storage.confKey, confid, function (err) {
		callback(1);
	});
};

exports.find = findConf;
exports.save = saveConf;
exports.invite = inviteConf;
exports.quite = quitConf;
exports.setJoin = setJoinConf;
exports.setQuit = setQuitConf;
exports.remove = removeConf;