var common = require("../common");
var user = require("./user");
var redis = require("./redisFactory");
var config = require("../config").config;

//连接Redis
var redisClient = redis.create();

//查找会议
function findConf(confid, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		console.log(confInfo);
		if (common.IsNullOrEmpty(confInfo))
			callback(0, null);
		else {
			var conf = JSON.parse(confInfo);
			callback(1, conf);
		}
	});
};

//保存会议信息
function saveConf(userid, confid, confInfo, callback) {
	redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err) {
		//新增用户创建会议
		user.addConf(userid, confid, confInfo, function (status) {
			callback(1);
		});
	});
};

//会议加入人
function addConf(confid, userInfo, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (common.IsNullOrEmpty(confInfo))
			callback(0);
		else {
			confInfo = JSON.parse(confInfo);
			if (common.IsNullOrEmpty(confInfo.users)) {
				confInfo.users = [];
			}
			confInfo.users.push(userInfo);

			redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err2) {
				callback(1);
			});
		}
	});
};

//会议批量踢人
function quitConf(confid, users, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (common.IsNullOrEmpty(confInfo))
			callback(0);
		else {
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

				redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err2) {
					callback(1);
				});
			}
		}
	});
};

//设置参会者的callid
function setJoinConf(confid, callid, number, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (common.IsNullOrEmpty(confInfo))
			callback(0);
		else {
			confInfo = JSON.parse(confInfo);
			if (common.IsNullOrEmpty(confInfo.users))
				callback(0);
			else {
				confInfo.users.forEach(function (user) {
					if (user.number == number) {
						user.callid = callid;
						user.state = 1;
						common.Log("processJoin:" + callid + " " + user.id + " " + user.name + " sucess");
					}
				});

				redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err2) {
					callback(1);
				});
			}
		}
	});
};
//设置参会者的状态
function setQuitConf(confid, callid, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (common.IsNullOrEmpty(confInfo))
			callback(0);
		else {
			confInfo = JSON.parse(confInfo);
			if (common.IsNullOrEmpty(confInfo.users))
				callback(0);
			else {
				confInfo.users.forEach(function (user) {
					if (user.callid == callid) {
						user.state = 2;
						common.Log("processQuit:" + user.callid + " " + user.id + " " + user.name + " sucess");
					}
				});

				redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err2) {
					callback(1);
				});
			}
		}
	});
};

//设置参会者的静音状态
function setMuteConf(confid, callid, mute, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (common.IsNullOrEmpty(confInfo))
			callback(0);
		else {
			confInfo = JSON.parse(confInfo);
			if (common.IsNullOrEmpty(confInfo.users))
				callback(0);
			else {
				confInfo.users.forEach(function (user) {
					if (user.callid == callid)
						user.mute = mute;
				});

				redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err2) {
					callback(1);
				});
			}
		}
	});
};

//根据用户编号设置会议当中的Number用于云通讯回调
function setNumberConf(confid, userid, number, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (common.IsNullOrEmpty(confInfo))
			callback(0);
		else {
			confInfo = JSON.parse(confInfo);
			if (common.IsNullOrEmpty(confInfo.users))
				callback(0);
			else {
				confInfo.users.forEach(function (user) {
					if (user.id == userid)
						user.number = number;
				});

				redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err2) {
					callback(1);
				});
			}
		}
	});
};

//重新设置会议密码
function setPwdConf(confid, pwd, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (common.IsNullOrEmpty(confInfo))
			callback(0);
		else {
			confInfo = JSON.parse(confInfo);
			confInfo.pwd = pwd;
			redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err2) {
				callback(1);
			});
		}
	});
};

//设置会议callout属性
function setAttConf(confid, callout, callback) {
	redisClient.hget(config.redis.storage.confKey, confid, function (err, confInfo) {
		if (common.IsNullOrEmpty(confInfo))
			callback(0);
		else {
			confInfo = JSON.parse(confInfo);
			confInfo.callout = callout;
			redisClient.hset(config.redis.storage.confKey, confid, JSON.stringify(confInfo), function (err2) {
				callback(1);
			});
		}
	});
};

//删除会议信息
function removeConf(confid, callback) {
	redisClient.hdel(config.redis.storage.confKey, confid, function (err) {
		common.Log("processStop:" + confid + " sucess");
		callback(1);
	});
};

exports.find = findConf;
exports.save = saveConf;
exports.add = addConf;
exports.quit = quitConf;
exports.setJoin = setJoinConf;
exports.setQuit = setQuitConf;
exports.setMute = setMuteConf;
exports.setNumber = setNumberConf;
exports.setPwd = setPwdConf;
exports.setAtt = setAttConf;
exports.remove = removeConf;