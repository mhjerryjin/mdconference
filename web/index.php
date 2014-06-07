<?php
session_start();
if(isset($_SESSION['mdtoken'])){
	include_once('./source/function.php');
	redirect('main.php',true);
}else
{
	include_once('./config/config.php');
	include_once('./source/mingdaosdk/AccessToken.php');

	$oauth=new AccessToken(CLIENT_ID,CLIENT_SECRET);

	$code_url=$oauth->getAuthorizeURL(CALLBACK_URL);

	echo '<script>location.href="'.$code_url.'";</script>';
}

?>