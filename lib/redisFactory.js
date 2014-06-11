/**
 * Created by Jerry on 14-6-10.
 */
var redis = require("redis");
var config = require("../config").config;

function createRedis() {
	var redisClient;
	if (config.redis.info.needauth) {
		redisClient = redis.createClient(config.redis.info.product.host);
		redisClient.auth(config.redis.info.product.uid, config.redis.info.product.pwd)
	}
	else
		redisClient = redis.createClient(config.redis.info.dev.port, config.redis.info.dev.host);

	return redisClient;
};

exports.create = createRedis;



