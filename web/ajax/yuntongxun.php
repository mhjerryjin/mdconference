<?php
@header('Content-type: aplication/json;charset=UTF-8');
include_once('../source/HttpRequest.php');
include_once('../source/core.php');


$op=$_GET['op'];
$result='';
define( "APP_ID" , '1234567890' );

switch ($op) {
	case 'getUser':
		$result=getUser();
		break;
	case 'createConf':
		$result=createConf();
		break;
	case 'stopConf':
		$result=stopConf();
		break;
	default:
		$result=geterror();
		break;
}
echo $result;
exit();

function getUser(){
	$http=new HttpRequest();
	// 接收参数
	$str = file_get_contents("php://input");
	// 转为json
	$param = json_decode($str);

	$param->appid=APP_ID;

	$response=$http->post(geturl().'getuser',$param);
	return json_encode($response);
}

function createConf(){
	$http=new HttpRequest();
	
	// 接收参数
	$str = file_get_contents("php://input");
	// 转为json
	$param = json_decode($str);
	
	$param->appid=APP_ID;

	$response=$http->post(geturl().'createConf',$param);
	return json_encode($response);
}

function stopConf(){
	$http=new HttpRequest();
	// 接收参数
	$str = file_get_contents("php://input");
	// 转为json
	$param = json_decode($str);
	
	$response=$http->post(geturl().'stopConf',$param);
	return json_encode($response);
}


function geturl(){
	include_once('../config/config.php');
	return $_config['yuntongxun']['url'];
}

function geterror(){
	$error=array();
	$error['code']=10001;
	return json_encode($error);
}
?>