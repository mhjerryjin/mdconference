<?php
    include_once('./source/core.php');
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="static/css/style.min.css" rel="stylesheet" />
<link href="static/css/bootstrap.min.css" rel="stylesheet" />
<link href="static/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
<title>语音会议</title>
</head>
<body>
    <div class="Hk_wrap">
        <div class="Hk_userTop">
            <div class="Hk_user">
                <div class="Hk_topic">
                    <a href="#">
                        <img src="static/images/topic.png" />
                    </a>
                </div>
                <div class="Hk_Name">
                    <div class="Hk_names">路扬</div>
                    <div class="Hk_title">创建会议</div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="Hk_meeting">
            <div class="Hk_meetName">会议名称</div>
            <div>
                <input type="text" id="confname" class="Hk_meetText" placeholder="输入会议名称" />
            </div>
            <div class="clear"></div>
        </div>
        <div class="Hk_meeting">
            <a id="begin" class="meetBtn selBtn">实时开始会议</a>
            <a id="order" class="meetBtn">预约会议</a>
            <div class="approves" id="orderDate">
                <div class="input-group date form_datetime" data-link-field="dtp_input1">
                    <input class="form-control" type="text" value="" placeholder="请设定会议开始时间" />
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
                <input type="hidden" id="dtp_input1" value="" />
            </div>
            <div class="clear"></div>
        </div>
         <div class="Hk_setPwd">
             <div class="Hk_selectPwd">
                 <input type="checkbox" class="chebox" id="chebox" /> 
                 <span>加入此会议需要密码</span>
             </div>
             <div class="Hk_pwd" id="pwd1">
                 <input type="password" id="password" class="Hk_pwdText" placeholder="设置密码" />
                 <div class="Hk_pwdLine"></div>
                 <input type="password" id="check_password" class="Hk_pwdText" placeholder="确认密码" />
                 <div class="clear"></div>
             </div>
             <div class="clear"></div>
         </div>
        <div class="Hk_pagination">
            <a class="Hk_prev" href="javascript:history.back();">&lt; 返回上一步</a>
            <a class="Hk_next" href="javascript:next();">
                <span class="text">下一步</span>
                <span class="icon"></span>
            </a>
        </div>
        <div class="clear"></div>
    </div>
</body>
<script type="text/javascript" src="static/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="static/js/JSON.js"></script>
<script type="text/javascript" src="static/js/global.js"></script>
<script type="text/javascript" src="static/js/config.js"></script>
<script type="text/javascript" src="static/js/main.js"></script>
<script type="text/javascript" src="static/js/bootstrap.min.js"></script>
<script type="text/javascript" src="static/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="static/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="static/js/Script.js"></script>
<script type="text/javascript">
    jQuery.ajax({
        url:"ajax/user.php?op=getcurrent",
        dataType:'JSON',
        async:false,
        success:function(data){
            main.current=data.user;
        }
    });
    function next() {
        var name=$("#confname").val();
        var password=$("#password").val();
        var check_password=$("#check_password").val();
        var checkbox=$("#chebox").prop('checked');
        if(checkbox&&check_password!=password){
            alert("两次密码输入不一致");
        }else if(!checkbox){
            check_password='';
        }
        main.createConf(name,check_password);
    }
</script>
</html>