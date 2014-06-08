<?php
include_once('./source/template.php');
session_start();
$islogin=isset($_SESSION['mdtoken']);
$isstop=false;
if(!empty($_GET['stop'])){
	$isstop=true;
}
include template('index');

?>


