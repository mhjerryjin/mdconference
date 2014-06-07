<?php
@header('Content-type: aplication/json;charset=UTF-8');
include_once('../source/HttpRequest.php');

include_once('./ajaxbase.php');


$op=$_GET['op'];

define( "APP_ID" , '1234567890' );

$result=request($op);
echo $result;
exit();

function request($controller){
	if(!$controller) return geterror();
	$http=new HttpRequest();
	// 接收参数
	$str = file_get_contents("php://input");
	// 转为json
	$param = json_decode($str);

	$param->appid=APP_ID;

	$response=$http->post(geturl().$controller,$param);
	return json_encode($response);
}

function geturl(){
	include_once('../config/config.php');
	return $_config['yuntongxun']['url'];
}


?>