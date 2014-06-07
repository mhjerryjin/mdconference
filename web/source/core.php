<?php
session_start();
if(!isset($_SESSION['mdtoken'])){
	echo '<script>location.href="index.php";</script>';
	exit();
}
?>