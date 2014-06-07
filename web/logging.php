<?php
	session_start();
	include_once('./source/function.php');
	if(empty($_GET['mod'])|| !in_array($_GET['mod'], array('login','logout')))
	{
		redirect('index.php',true);
	}
	$_GET['mod']();


	function login(){

		$islogin=isset($_SESSION['mdtoken']);

		if($islogin){
			include_once('./source/function.php');
			redirect('index.php',true);
		}else
		{
			include_once('./config/config.php');
			include_once('./source/mingdaosdk/AccessToken.php');

			$oauth=new AccessToken(CLIENT_ID,CLIENT_SECRET);

			$code_url=$oauth->getAuthorizeURL(CALLBACK_URL);
			redirect($code_url,true);
		}
	}

	function logout(){
		$_SESSION = array();
		if (isset($_COOKIE[session_name()])) {
		setcookie(session_name(), '', time()-42000, '/');
		}
		// 最后彻底销毁session.
		session_destroy();
		redirect('index.php',true);
	}
?>