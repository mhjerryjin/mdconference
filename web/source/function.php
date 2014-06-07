<?php
function redirect($url,$exit=false){
	echo '<script>location.href="'.$url.'";</script>';
	if($exit)exit();
}
?>