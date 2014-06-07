﻿<?php
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
            <div class="Hk_meetInfo">
                <div class="Hk_meetLocal">当前会议</div>
                <div class="Hk_meetNames">语音会议名称</div>
            </div>
            <div class="Hk_user" style="float:right;">
                <div class="Hk_topic">
                    <a href="#">
                        <img src="images/topic.png" />
                    </a>
                </div>
                <div class="Hk_Name">
                    <div class="Hk_names">路扬</div>
                    <div class="Hk_title">创建会议</div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="orderTime">
            <div class="orderName">已选择的会议成员&nbsp;&nbsp;&nbsp;共 8 人</div>
            <div class="Hk_userLists">
                <ul>
                    <li>
                        <div class="topics">
                            <a>
                                <img src="images/topic.png" />
                            </a>
                        </div>
                        <div class="Hk_infos">
                            <div class="Hk_infoName">路扬</div>
                            <div class="Hk_infoTel">12312312312</div>
                        </div>
                    </li>
                    <li>
                        <div class="topics">
                            <a>
                                <img src="images/topic.png" />
                            </a>
                        </div>
                        <div class="Hk_infos">
                            <div class="Hk_infoName">路扬</div>
                            <div class="Hk_infoTel">12312312312</div>
                        </div>
                    </li>
                    <li>
                        <div class="topics">
                            <a>
                                <img src="images/topic.png" />
                            </a>
                        </div>
                        <div class="Hk_infos">
                            <div class="Hk_infoName">路扬</div>
                            <div class="Hk_infoTel">12312312312</div>
                        </div>
                    </li>
                    <li>
                        <div class="topics">
                            <a>
                                <img src="images/topic.png" />
                            </a>
                        </div>
                        <div class="Hk_infos">
                            <div class="Hk_infoName">路扬</div>
                            <div class="Hk_infoTel">12312312312</div>
                        </div>
                    </li>
                    <li>
                        <div class="topics">
                            <a>
                                <img src="images/topic.png" />
                            </a>
                        </div>
                        <div class="Hk_infos">
                            <div class="Hk_infoName">路扬</div>
                            <div class="Hk_infoTel">12312312312</div>
                        </div>
                    </li>
                    <li>
                        <div class="topics">
                            <a>
                                <img src="images/topic.png" />
                            </a>
                        </div>
                        <div class="Hk_infos">
                            <div class="Hk_infoName">路扬</div>
                            <div class="Hk_infoTel">12312312312</div>
                        </div>
                    </li>
                    <li>
                        <div class="topics">
                            <a>
                                <img src="images/topic.png" />
                            </a>
                        </div>
                        <div class="Hk_infos">
                            <div class="Hk_infoName">路扬</div>
                            <div class="Hk_infoTel">12312312312</div>
                        </div>
                    </li>
                    <li>
                        <div class="topics">
                            <a>
                                <img src="images/topic.png" />
                            </a>
                        </div>
                        <div class="Hk_infos">
                            <div class="Hk_infoName">路扬</div>
                            <div class="Hk_infoTel">12312312312</div>
                        </div>
                    </li>
                    <div class="clear"></div>
                </ul>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="orderTime">
            <div class="orderName">已预约的会议时间</div>
            <div class="orderDates">
                <div class="input-group date form_datetime ordates" data-link-field="dtp_input1">
                    <input class="form-control" type="text" value="2014-06-18 15:00" />
				    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
			    <input type="hidden" id="Hidden1" value="" />
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="Hk_pagination" style="text-align:center; margin-top:40px;">
            <a class="Hk_prev tp_0" href="selectUser.html">&lt; 返回上一步</a>
            <a class="Hk_next" href="#">
                <span class="text tp_0">开始会议</span>
            </a>
        </div>
        <div class="clear"></div>
    </div>
<script type="text/javascript" src="static/js/jquery-1.11.1.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/Script.js"></script>
<script type="text/javascript">
    jQuery.ajax({
        url:"ajax/user.php?op=getcurrent",
        dataType:'JSON',
        async:false,
        success:function(data){
            var current=data.user;
            $("img.avatar").attr("src",current.avatar100);
            $("div.username").text(current.name);
            $("div.usercompanys").text(current.company);
        }
    });
</script>

</body>
</html>