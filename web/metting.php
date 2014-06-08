<?php
	include_once('./source/template.php');
	include_once('./source/function.php');
	include_once('./source/core.php');
	include_once('./config/config.php');
	include_once('./source/HttpRequest.php');

	if(empty($_GET['id'])) redirect('index.php',true);
	define("APP_ID", $_config['yuntongxun']['appid']);

	$id=$_GET['id'];

	$param=array('id'=>$id,'appid',APP_ID);

	$url=$_config['yuntongxun']['url'].'getConf';
	$http=new HttpRequest();

	$response = $http->post($url,$param);
	//如果会议需要密码
	$ischeck=true; //是否允许加入会议
	if(!empty($response['pwd']))
	{
		if(!empty($_POST['password'])){
			$password=$_POST['password'];
			if($password!=$response['pwd']){
				$ischeck=false;
			}
		}
		else{
			$ischeck=false;
		}
	}
	include template('metting');
?>

