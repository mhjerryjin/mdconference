<?php
	include_once('./source/function.php');
	include_once('./source/core.php');
	include_once('./config/config.php');
	include_once('./source/HttpRequest.php');

	if(empty($_GET['id'])) redirect('index.php',true);
	define("APP_ID", $_config['yuntongxun']['appid']);

	$id=$_GET['id'];

	$param=array('id'=>$id,'appid',APP_ID);

	$url=$_config['yuntongxun']['url'].'getConf';
	$http=new HttpRequest();

	$response = $http->post($url,$param);
	//如果会议需要密码
	$ischeck=true; //是否允许加入会议
	if(!empty($response['pwd']))
	{
		if(!empty($_POST['password'])){
			$password=$_POST['password'];
			if($password!=$response['pwd']){
				$ischeck=false;
			}
		}
		else{
			$ischeck=false;
		}
	}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>云话</title>
<script type="text/javascript" src="static/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="static/js/JSON.js"></script>
<script type="text/javascript" src="static/js/global.js"></script>
<script type="text/javascript" src="static/js/config.js"></script>
<script type="text/javascript" src="static/js/main.js"></script>
</head>

<body>
	<?php
		if($ischeck){
	?>
	<script type="text/javascript">
		main.metting={id:global.getParam()['id']};
		main.joinConf();
	</script>
	<?php
		}else{
	?>
	<form action="" method="post">
		<input type="password" id="password" name="password">
		<button type="submit">提交密码</button>
	</form>
	<?php
		}
	?>

</body>

<script type="text/javascript">
    jQuery.ajax({
        url:"ajax/user.php?op=getcurrent",
        dataType:'JSON',
        async:false,
        success:function(data){
            main.current=data.user;
        }
    });

</script>
</html>