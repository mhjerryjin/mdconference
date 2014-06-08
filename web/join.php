<?php
if(empty($_GET['mod'])||!in_array($_GET['mod'], array('pwd','outer'))){
	exit();
}
if(empty($_GET['id']))
{
	exit();
}
include_once('./source/template.php');
include_once('./source/function.php');


include_once('./source/join_'.$_GET['mod'].'.php');

?>