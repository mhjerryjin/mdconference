<?php
@header('Content-type: aplication/json;charset=UTF-8');
include_once('../source/HttpRequest.php');
include_once('../config/config.php');
include_once('../source/mingdaosdk/AccessToken.php');
include_once('../source/mingdaosdk/Account.php');
include_once('./ajaxbase.php');

$op=$_GET['op'];
define("APP_ID", $_config['yuntongxun']['appid']);
define("YUNTONGXUN_URL", $_config['yuntongxun']['url']);

$result=request($op);
switch ($op){
	case "joinConf":
	case "inviteConf":
		send_sysmessage();
		break;
}
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

function send_sysmessage(){
	$oauth=new AccessToken(CLIENT_ID,CLIENT_SECRET,$_SESSION['mdtoken']);
	$account=new Account($oauth);
	
	$current=$account->get_user_baseinfo();
	
	// 接收参数
	$str = file_get_contents("php://input");
	// 转为json
	$param = json_decode($str);
	$users=$param->users;
	$link='http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].'/metting.php?id='.$param->id;
	$msg=$current['user']['name'].'邀请您加入会议，请<a href="'.$link.'" target="_blank">点击这里加入</a> 如果不能点击请复制此链接进入  '.$link;
	foreach ($users as $user){
		if(!empty($user->id)&&$current['user']['id']!=$user->id){
			$response = $account->sent_sys($user->id,$current['user']['project']['id'],$msg);
		}
	}
}


?>