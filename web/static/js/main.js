var main={};

main.getUser=function(userid) {
	global.request(config.yuntongxun.geturl('getUser'),{id:userid},function(data){
		console.dir(data);
	})
}
main.createConf=function(userid,pwd){
	global.request(config.yuntongxun.geturl('createConf'),{id:userid,pwd:pwd?pwd:''},function(data){

	})
}
main.stopConf=function(id){
	global.request(config.yuntongxun.geturl('stopConf'),{id:id},function(data){

	})
}