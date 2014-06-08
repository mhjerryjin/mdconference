<?php
session_start();
if(isset($_SESSION['mdtoken'])){
	redirect('metting.php?id='.$_GET['id'],true);
}
if(isset($_SESSION['guest'])){
	redirect('metting.php?id='.$_GET['id'],true);
}
$id=$_GET['id'];

include template('join_outer');
?>