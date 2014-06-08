<?php
	@header('Content-type: text/html;charset=UTF-8');
	include_once('./source/template.php');
    include_once('./source/core.php');
    include_once('./source/char.php');
    include_once('./source/mingdaosdk/AccessToken.php');
    include_once('./source/mingdaosdk/Account.php');
    
    $oauth=new AccessToken(null,null,$_SESSION['mdtoken']);
    $account=new Account($oauth);
    $result=$account->get_user_all();
    $users=array();
    $first=array();
    foreach ($result['users'] as $user){
    	$py=zh2py::conv($user['name']);
    	$firstname = strtoupper($py[0]);
    	if(!in_array($firstname,$first))
    		$first[]=$firstname;
    	$user['firstname']= $firstname;
    	$users[$firstname][]=$user;
    }
    sort($first);
    
    $invitelink='http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].'/join.php?mod=outer&id='.$_GET['id'];
    
    
    include template('selectuser');
    
?>

