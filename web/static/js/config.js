var config={
	yuntongxun:{
		base:'http://mdconf.mingdao.com/',
		url:'ajax/yuntongxun.php',
		geturl:function($controller){
			return config.yuntongxun.url+'?op='+$controller;
		}
	}
}