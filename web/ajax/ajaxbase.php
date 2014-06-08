<?php
session_start();

if(!isset($_SESSION['mdtoken'])){
	$result = nologin();
	echo $result;
	exit();
}
function nologin(){
	$error=array();
	$error['code']=10000;
	return json_encode($error);
}
function geterror(){
	$error=array();
	$error['code']=10001;
	return json_encode($error);
}

?>