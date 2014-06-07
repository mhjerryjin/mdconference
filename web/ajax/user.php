<?php
@header('Content-type: aplication/json;charset=UTF-8');
include_once('../source/core.php');

$op=$_GET['op'];
$result='';
switch ($op) {
	case 'getcurrent':
		$result=getcurrentuser();
		break;
	
	default:
		$result=geterror();
		break;
}
echo $result;
exit();



function getcurrentuser(){
	include_once('../source/mingdaosdk/AccessToken.php');
	include_once('../source/mingdaosdk/Account.php');
	$oauth=new AccessToken(null,null,$_SESSION['mdtoken']);
	$account=new Account($oauth);
	$baseinfo=$account->get_user_baseinfo();
	return json_encode($baseinfo);
}
function geterror(){
	$error=array();
	$error['code']=10001;
	return json_encode($error);
}