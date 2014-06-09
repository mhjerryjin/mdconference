var main={};

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
			location.href="selectuser.php?id="+data.id;
		}else{
			alert("创建会议失败，刷新页面试试");
		}
	});
}

/*
 * 对会议执行操作
 */
main.conf=function($controller,callback){
	global.request(config.yuntongxun.geturl($controller),{id:main.metting.id,uid:main.current.id},function(data){
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
main.getConfUsers=function(callback){
	main.conf('getConfUsers',function(data){
 		callback&&callback(data);
 	});
}

/*
 * 停止会议
 * id:云通讯会议编号
 */
main.stopConf=function(){
	main.conf('stopConf',function(data){
 		
 	});
}

/*
 * 发起呼叫
 */
main.callAllConf=function(){
	main.conf('callAllConf',function(data){
		
	});
}

main.joinbatch=function($controller,users,callback){
	global.request(config.yuntongxun.geturl($controller),{id:main.metting.id,uid:main.current.id,users:users},function (data){
 		callback&&callback(data);
	});
}

main.joinConf=function(users,callback){
	main.joinbatch('joinConf',users, callback);
}

/*
 * 邀请加入会议
 * users[{id:'',number:'',name:''}] --id：用户ID，number：电话号码,name：用户姓名
 */
 main.inviteConf=function(users,callback){
	 main.joinbatch('inviteConf',users, callback);
 }

/*
 * 批量操作封装
 * users[{callid:''}] --callid：参会用户列表的callid
 */
main.batch=function($controller,users,callback){
	global.request(config.yuntongxun.geturl($controller),{id:main.metting.id,uid:'',users:users},function (data){
		callback&&callback(data);
	});
}
/*
 * 批量踢人
 * users[{callid:''}] --callid：参会用户列表的callid
 */
main.quitConf=function(users,callback){
	main.batch('quitConf',users,function(data){
		callback&&callback(data);
	});
}

/*
 * 批量静音
 * users[{callid:''}] --callid：参会用户列表的callid
 */
main.muteConf=function(users,callback){
	main.batch('muteConf',users,function(data){
		callback&&callback(data);
	});
}

/*
 * 批量取消静音
 * users[{callid:''}] --callid：参会用户列表的callid
 */
main.unmuteConf=function(users,callback){
	main.batch('unmuteConf',users,function(data){
		callback&&callback(data);
	});
}

