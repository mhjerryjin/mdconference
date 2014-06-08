<?php
	include_once('./source/function.php');
	session_start();
	//如果没登录，并且不是来宾
	$isguest=false;
	if(!isset($_SESSION['mdtoken'])&&!isset($_SESSION['guest']))
	{
		redirect('join.php?mod=outer&id='.$_GET['id'],true);
	}
	if(isset($_SESSION['guest'])){
		$isguest=true;
	}
	
	include_once('./source/template.php');
	
	include_once('./source/yuntongxun/yuntongxun.php');
	
	if(empty($_GET['id'])) redirect('index.php',true);
	

	$metting = json_decode(request('getConf',array('id'=>$_GET['id'])));
	
	if (property_exists($metting,'status')){
		printarr($metting);
		exit();
	}
	printarr($metting);
	exit();
	//如果会议需要密码
	$allowjoin=false; //是否允许加入会议
	
	if($isguest){
		$current=$_SESSION['guest'];
		$current['user']=array('id'=>$current['number'],'name'=>$current['name'],'avatar100'=>'static/images/default.gif');
		$create=array('id'=>'','name'=>'明道用户','avatar100'=>'static/images/default.gif');
	}else{
		include_once('./source/mingdaosdk/AccessToken.php');
		include_once('./source/mingdaosdk/Account.php');
	
		$oauth=new AccessToken(null,null,$_SESSION['mdtoken']);
		$account=new Account($oauth);
		$userinfo=$account->get_user_by_uid($metting->uid);
		$create=$userinfo['user'];
	
		$current=$account->get_user_baseinfo();
		
		if($current['user']['id']==$create['id']){
			$allowjoin=true;
		}
	}
	
	//允许访问，放到用户的允许访问列表里
	$mettings=array();
	
	if(!empty($metting->pwd))
	{
		if(!empty($_POST['password'])){
			$check_pasword=$_POST['password'];
			if($check_pasword==$metting->pwd){
				$allowjoin=true;
			}
		}
	}else{
		$allowjoin=true;//没有密码
	}
	
	if(isset($_SESSION['mettings'])){
		$mettings=$_SESSION['mettings'];
	}
	if(in_array($_GET['id'], $mettings)){
		$allowjoin=true;
	}
	
	
	if(!$allowjoin){
		redirect('join.php?mod=pwd&id='.$_GET['id'],true);
	}
	
	if(!in_array($_GET['id'], $mettings)){
		$mettings[]=$_GET['id'];
		$_SESSION['mettings']=$mettings;
	}
	
	
	$mettingcurrent=json_decode(request("getUser",array("id"=>$current['user']['id'])));
	
	request('setNumber',array('id'=>$_GET['id'],'uid'=>$current['user']['id'],'number'=>$mettingcurrent->voip));
	
	
	include_once ('./source/block/block_mettinguser.php');
	
	
	include template('metting');
?>

