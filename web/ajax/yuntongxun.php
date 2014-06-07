<?php
@header('Content-type: aplication/json;charset=UTF-8');
include_once('../source/HttpRequest.php');
include_once('../config/config.php');
include_once('./ajaxbase.php');


$op=$_GET['op'];

define("APP_ID", $_config['yuntongxun']['appid']);
define("YUNTONGXUN_URL", $_config['yuntongxun']['url']);

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

	$response=$http->post(YUNTONGXUN_URL.$controller,$param);
	return json_encode($response);
}

?>