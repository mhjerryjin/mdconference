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
}


$mettingusers=array();
$mettingusers[0]=array();
$mettingusers[1]=array();

foreach ($joins as $join){
	if(!empty($join->id)&&isset($usersinfoarr[$join->id])){
		$join->avatar=$usersinfoarr[$join->id]['avatar100'];
	}else{
		$join->avatar='static/images/default.gif';
	}
	$mettingusers[$join->state][]=$join;
}

$joinnum=count($mettingusers[1]);
$nojoinnum=count($mettingusers[0]);
?>