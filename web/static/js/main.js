var main={};

/*
 * 获取用户子账号和token
 */
main.getUser=function() {
	global.request(config.yuntongxun.geturl('getuser'),{id:main.current.id},function(data){
		console.dir(data);
	});
}

/*
 * 创建会议
 */
main.createConf=function(name,pwd,time){
	global.request(config.yuntongxun.geturl('createConf'),
	{
		id:main.current.id,
		name:name||'',
		pwd:pwd||'',
		time:time||'',
	},function(data){
		if(data.id){
			location.href="metting.php?id="+data.id;
		}else{
			alert("创建会议失败，刷新页面试试");
		}
	});
}

/*
 * 对会议执行操作
 */
main.conf=function($controller,callback){
	global.request(config.yuntongxun.geturl($controller),{id:main.metting.id},function(data){
		callback&&callback(data);
	});
}

/*
 * 获取会议信息
 */
 main.getConf=function(){
 	main.conf('getConf',function(data){
 		
 	})
 }

/*
 * 获取所有参会成员
 */
main.getConfUsers=function(){
	main.conf('getConfUsers',function(data){
 		
 	})
}

/*
 * 停止会议
 * id:云通讯会议编号
 */
main.stopConf=function(){
	main.conf('stopConf',function(data){
 		
 	})
}

/*
 * 加入会议
 * id:云通讯会议编号
 */
main.joinConf=function(){
	global.request(config.yuntongxun.geturl('joinConf'),{id:main.metting.id},function (data){
		if(data.status){
			alert("加入成功");
		}
	});
}

/*
 * 邀请加入会议
 * users[{id:'',number:'',name:''}] --id：用户ID，number：电话号码,name：用户姓名
 */
 main.inviteConf=function(users){
 	global.request(config.yuntongxun.geturl('inviteConf'),{id:main.metting.id,uid:main.current.id,users:users},function (data){

	});
 }

/*
 * 批量操作封装
 * users[{callid:''}] --callid：参会用户列表的callid
 */
main.batch=function($controller,users,callback){
	global.request(config.yuntongxun.geturl($controller),{id:main.metting.id,uid:main.current.id,users:users},function (data){
		callback&&callback(data);
	});
}
/*
 * 批量踢人
 * users[{callid:''}] --callid：参会用户列表的callid
 */
main.quitConf=function(users){
	main.batch('quitConf',users,function(data){

	})
}

/*
 * 批量静音
 * users[{callid:''}] --callid：参会用户列表的callid
 */
main.muteConf=function(users){
	main.batch('muteConf',users,function(data){

	})
}

/*
 * 批量静音
 * users[{callid:''}] --callid：参会用户列表的callid
 */
main.unmuteConf=function(users){
	main.batch('unmuteConf',users,function(data){

	})
}