<?php
	
	include_once('./source/template.php');
	include_once('./source/function.php');
	include_once('./source/core.php');
	include_once('./source/yuntongxun/yuntongxun.php');
	
	if(empty($_GET['id'])) redirect('index.php',true);
	

	$metting = json_decode(request('getConf',array('id'=>$_GET['id'])));
	
	if (property_exists($metting,'status')){
		printarr($metting);
		exit();
	}
	//如果会议需要密码
	$allowjoin=true; //是否允许加入会议
	if(!empty($metting->pwd))
	{
		if(!empty($_POST['password'])){
			$check_pasword=$_POST['password'];
			if($check_pasword!=$metting->pwd){
				$allowjoin=false;
			}
		}
		else{
			$allowjoin=false;
		}
	}
	if(!$allowjoin){
		redirect('join.php?mod=pwd&id='.$_GET['id'],true);
	}
		
	include_once('./source/mingdaosdk/AccessToken.php');
	include_once('./source/mingdaosdk/Account.php');

	$oauth=new AccessToken(null,null,$_SESSION['mdtoken']);
	$account=new Account($oauth);
	$userinfo=$account->get_user_by_uid($metting->uid);
	$create=$userinfo['user'];
	
	$current=$account->get_user_baseinfo();
	
	$mettingcurrent=json_decode(request("getUser",array("id"=>$current['user']['id'])));
	
	request('setNumber',array('id'=>$_GET['id'],'uid'=>$current['user']['id'],'number'=>$mettingcurrent->voip));
	
	
	include_once ('./source/block/block_mettinguser.php');
	
	
	include template('metting');
?>

