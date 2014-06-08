<?php
	session_start();
	include_once('./source/function.php');
	if(empty($_GET['mod'])|| !in_array($_GET['mod'], array('login','logout','guest')))
	{
		redirect('index.php',true);
	}
	$_GET['mod']();


	function login(){
		if(isset($_SESSION['mdtoken'])){
			redirect('index.php',true);
		}
		include_once('./config/config.php');
		include_once('./source/mingdaosdk/AccessToken.php');
		
		if(!empty($_GET['id']))
		{
			$_SESSION['mettingid']=$_GET['id'];
		}
		$oauth=new AccessToken(CLIENT_ID,CLIENT_SECRET);

		$code_url=$oauth->getAuthorizeURL(CALLBACK_URL);
		redirect($code_url,true);
		
	}

	function logout(){
		$_SESSION = array();
		if (isset($_COOKIE[session_name()])) {
		setcookie(session_name(), '', time()-42000, '/');
		}
		session_destroy();
		redirect('index.php',true);
	}
	
	function guest(){
		$name = $_POST['name'];
		$number=$_POST['number'];
		
		$guest=array('name'=>$name,'number'=>$number);
		include_once('./source/yuntongxun/yuntongxun.php');
		request('joinConf',array('id'=>$_GET['id'],'users'=>array(array('id'=>$number,'name'=>$name,'number'=>$number))));
		
		$_SESSION['guest']=$guest;
		
		redirect('metting.php?id='.$_GET['id'],true);
	}
?>