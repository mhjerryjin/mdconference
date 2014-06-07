var main={};

main.getUser=function(userid) {
	global.request(config.yuntongxun.geturl('getuser'),{id:userid,appid:config.appid},function(data){
		console.dir(data);
	})
}
main.createConf=function(argument){
	global.request(config.yuntongxun.geturl('createConf'),{},function(data){

	})
}
main.stopConf=function(argument){
	global.request(config.yuntongxun.geturl('stopConf'),{},function(data){

	})
}