var common = require("../common");
var redis = require("./redisFactory");
var config = require("../config").config;

//连接Redis
var redisClient = redis.create();


//新增预约会议
function addReserveConf(userid, userInfo, callback) {

};

//删除预约会议
function removeReserveConf(userid, userInfo, callback) {

};

exports.add = addReserveConf;
exports.remove = removeReserveConf;