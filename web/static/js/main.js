var main={};

/*
 * 获取用户子账号和token
 */
main.getUser=function(userid) {
	global.request(config.yuntongxun.geturl('getUser'),{id:userid},function(data){
		console.dir(data);
	});
}

/*
 * 创建会议
 */
main.createConf=function(userid,pwd){
	global.request(config.yuntongxun.geturl('createConf'),{id:userid,pwd:pwd?pwd:''},function(data){

	});
}

/*
 * 停止会议
 * id:云通讯会议编号
 */
main.stopConf=function(id){
	global.request(config.yuntongxun.geturl('stopConf'),{id:id},function(data){

	});
}

/*
 * 加入会议
 * id:云通讯会议编号
 */
main.joinConf=function(id){
	global.request(config.yuntongxun.geturl('joinConf'),{id:id},function (data){

	});
}

/*
 * 邀请加入会议
 */
 main.inviteConf=function(){
 	global.request(config.yuntongxun.geturl('inviteConf'),{id:id},function (data){

	});
 }

