var main={};

/*
 * 获取用户子账号和token
 */
main.getUser=function(userid) {
	global.request(config.yuntongxun.geturl('getuser'),{id:userid},function(data){
		console.dir(data);
	});
}

/*
 * 获取会议信息
 */
 main.getConf=function(id){
 	global.request(config.yuntongxun.geturl('getConf'),{id:id},function(data){

	});
 }


/*
 * 创建会议
 */
main.createConf=function(userid,name,pwd,time){
	global.request(config.yuntongxun.geturl('createConf'),
	{
		id:userid,
		name:name||'',
		pwd:pwd||'',
		time:time||'',
	},function(data){

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
 * users[{id:'',number:'',name:''}] --id：用户ID，number：电话号码,name：用户姓名
 */
 main.inviteConf=function(id,userid,users){
 	global.request(config.yuntongxun.geturl('inviteConf'),{id:id,uid:userid,users:users},function (data){

	});
 }

