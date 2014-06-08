<?php
	@header('Content-type: text/html;charset=UTF-8');
	include_once('./source/template.php');
	include_once('./source/function.php');
	include_once('./source/core.php');
	
	
	include_once('./source/yuntongxun/yuntongxun.php');
	
	
	
	
    if(empty($_POST['users'])||empty($_GET['id']))redirect('index.php',true);
    
    $usersjson=$_POST['users'];
    
    $users=json_decode($usersjson);
    
    $num=count($users);
    
    $param=array('id'=>$_GET['id']);
    
    
    $metting=json_decode(request("getConf",$param));
    
   
  	include template('invite');
    
?>
