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
if(empty($_GET['mod'])||!in_array($_GET['mod'],array('mettinguser')))
{
	exit();
}

$mod=$_GET['mod'];

include ('./source/block/block_'.$mod.'.php');
include template('block/'.$mod);
?>