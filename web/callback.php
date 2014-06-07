<?php
include_once('./config/config.php');
include_once('./source/function.php');
include_once('./source/mingdaosdk/AccessToken.php');

$oauth=new AccessToken(CLIENT_ID,CLIENT_SECRET);

if (isset($_REQUEST['code'])) {
	$keys = array();
	$keys['code'] = $_REQUEST['code'];
	$keys['redirect_uri'] = CALLBACK_URL;
	try {
		$token = $oauth->getAccessToken('code', $keys ) ;
	} catch (OAuthException $e) {
		
	}
}

if ($token) {
	session_start();
	$_SESSION['mdtoken'] = $token['access_token'];

	redirect('index.php',true);
}
?>