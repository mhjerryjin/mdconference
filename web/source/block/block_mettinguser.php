<?php
include_once('./source/yuntongxun/yuntongxun.php');


$conUsers=json_decode(request("getConfUsers",array("id"=>$_REQUEST['id'])));

if(empty($conUsers->users)){
	exit();
}

$joins=$conUsers->users;

$uids=array();



foreach ($joins as $join){
	if(!empty($join->id)){
		$uids[]=$join->id;
	}
}

if(!$isguest){
	include_once('./source/mingdaosdk/AccessToken.php');
	include_once('./source/mingdaosdk/Account.php');
	$oauth=new AccessToken(null,null,$_SESSION['mdtoken']);
	$account=new Account($oauth);
	
	$usersinfo=$account->get_users_by_uids(implode(',',$uids));
	$usersinfoarr=array();
	
	foreach ($usersinfo['users'] as $user){
		$usersinfoarr[$user['id']]=$user;
	}
	
	if(!isset($create))
	{
		$metting = json_decode(request('getConf',array('id'=>$_GET['id'])));
		
		$userinfo=$account->get_user_by_uid($metting->uid);
		$create=$userinfo['user'];
	}
}


$mettingusers=array();
$mettingusers[0]=array();
$mettingusers[1]=array();

foreach ($joins as $join){
	if(!empty($join->id)&&isset($usersinfoarr[$join->id])){
		$join->avatar=$usersinfoarr[$join->id]['avatar100'];
		$join->department=$usersinfoarr[$join->id]['department'];
	}else{
		$join->avatar='static/images/default.gif';
		$join->department='来宾';
	}
	$mettingusers[$join->state][]=$join;
}
$joinnum=count($mettingusers[1]);
$nojoinnum=count($mettingusers[0]);
$joinBtn=empty($_COOKIE['mettinguserbtn'])?'joinBtn':$_COOKIE['mettinguserbtn'];


?>