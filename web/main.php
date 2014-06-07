<?php
	include_once('./source/core.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>明道会议</title>
<script type="text/javascript" src="static/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="static/js/JSON.js"></script>
<script type="text/javascript" src="static/js/global.js"></script>
<script type="text/javascript" src="static/js/config.js"></script>
<script type="text/javascript" src="static/js/main.js"></script>
<script type="text/javascript">
	jQuery.ajax({
		url:"ajax/user.php?op=getcurrent",
		dataType:'JSON',
		async:false,
		success:function(data){
			main.current=data.user;
		}
	});

	main.getUser(main.current.id);
</script>
</head>

<body>
</body>
</html>