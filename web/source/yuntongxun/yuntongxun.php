<?php
include_once('/source/HttpRequest.php');
include_once('/config/config.php');

define("APP_ID", $_config['yuntongxun']['appid']);
define("YUNTONGXUN_URL", $_config['yuntongxun']['url']);

function request($controller,$param){
	$http=new HttpRequest();

	$param['appid']=APP_ID;

	$response=$http->post(YUNTONGXUN_URL.$controller,$param);
	return json_encode($response);
}