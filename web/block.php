<?php
include_once('./source/core.php');
include_once('./source/template.php');
if(empty($_GET['mod'])||!in_array($_GET['mod'],array('mettinguser')))
{
	exit();
}

$mod=$_GET['mod'];

include ('./source/block/block_'.$mod.'.php');
include template('block/'.$mod);
?>