<?php
session_start();
$islogin=isset($_SESSION['mdtoken']);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>明道会议</title>
<link rel="stylesheet" type="text/css" href="static/css/basic.css">
<link rel="stylesheet" type="text/css" href="static/css/index.css">

<script type="text/javascript" src="static/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="static/js/JSON.js"></script>
<script type="text/javascript" src="static/js/global.js"></script>
<script type="text/javascript" src="static/js/config.js"></script>
<script type="text/javascript" src="static/js/main.js"></script>
</head>
<body>
<div class="top TxtCenter">
	<div class="logo"></div>
	<br>
	<?php
		$createConfHref='logging.php?mod=login';
		if($islogin)
			$createConfHref='###';
	?>
	<a class="login" href="<?php echo $createConfHref; ?>"></a>
</div>
<div class="bottom TxtCenter">
	<?php 
		if($islogin){
	?>
	<!--已经登录-->
	<div class="userinfo">
		<div class="Left">
				<img src="###" class="Left avatar">
				<div class="Left pLeft10 mTop5 TxtLeft">
					<div class="username"></div>
					<div class="usercompanys"></div>
				</div>
				<div class="Clear"></div>
		</div>
		<div class="Right">
			<a href="javascript:;" class="conFbutton button">我的会议记录</a>
			<a href="logging.php?mod=logout" class="logoutbtn button mLeft10">登出</a>
		</div>
		<div class="Clear"></div>
	</div>
	<?php
		}else{
	?>
	<!--还未登录的情况-->
	<a class="mdlogin button" href="logging.php?mod=login"><font>使用明道帐号登录</font></a>
	<?php
		}
	?>
	
</div>
</body>
<script type="text/javascript">
	jQuery.ajax({
		url:"ajax/user.php?op=getcurrent",
		dataType:'JSON',
		async:false,
		success:function(data){
			main.current=data.user;
			$("img.avatar").attr("src",main.current.avatar100);
			$("div.username").text(main.current.name);
			$("div.usercompanys").text(main.current.company);
		}
	});
</script>
</html>


