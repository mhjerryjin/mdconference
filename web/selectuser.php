<?php

?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="css/style.min.css" rel="stylesheet" />
<title>语音会议</title>
</head>
<body>
    <div class="Hk_wrap">
        <div class="Hk_userTop">
            <div class="Hk_user">
                <div class="Hk_topic">
                    <a href="#">
                        <img src="images/topic.png" />
                    </a>
                </div>
                <div class="Hk_Name">
                    <div class="Hk_names">路扬</div>
                    <div class="Hk_title">WEB前端开发工程师</div>
                </div>
            </div>
            <div class="Hk_company">
                <a id="coms">
                    <span class="coms">梅花与明道</span>
                    <span class="slide"></span>
                </a>
                <div class="slideMenu" id="slideMenu">
                    <a href="#">梅花与明道</a>
                    <a href="#">梅花与明道</a>
                    <a href="#">梅花与明道</a>
                    <a href="#">梅花与明道</a>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="Hk_SearchWrap">
            <div class="Hk_SearchBtn">
                <a id="invite1" class="local">邀请网络内成员</a>
                <a id="invite2">邀请外部用户</a>
                <div class="clear"></div>
            </div>
            <div class="Hk_Search" id="Hk_Search">
                <div class="Hk_SearchArea">
                    <input type="text" placeholder="搜索成员" class="Hk_SearchText" />
                    <input type="button" name="" value="" class="Hk_serBtn" />
                    <div class="clear"></div>
                </div>
            </div>
            <div class="Hk_invite" id="Hk_invite" style="display:none;">
                <div class="Hk_inviteType">
                    <a class="selected" id="mobile">手机号码邀请</a>
                    <a id="links">邀请链接</a>
                </div>
                <div class="Hk_inviteInfo" id="mobile_con">
                    <div class="Hk_mobile">
                        <input type="text" class="Hk_MName" placeholder="请输入姓名" />
                        <input type="tel" required="required" class="Hk_MTel" placeholder="请输入手机号码" />
                        <div class="clear"></div>
                    </div>
                    <div class="Hk_mobile">
                        <input type="text" class="Hk_MName" placeholder="请输入姓名" />
                        <input type="tel" required="required" class="Hk_MTel" placeholder="请输入手机号码" />
                        <div class="clear"></div>
                    </div>
                    <div class="Hk_mobile">
                        <input type="text" class="Hk_MName" placeholder="请输入姓名" />
                        <input type="tel" required="required" class="Hk_MTel" placeholder="请输入手机号码" />
                        <div class="clear"></div>
                    </div>
                    <div class="Hk_Madd">
                        <a id="addGo">继续添加…</a>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="Hk_inviteInfo" id="links_con" style="display:none">
                    <div class="Hk_linkCon">
                        <div class="Hk_link_title">外部用户使用此链接即可加入会议：正在创建的会议名</div>
                        <div class="Hk_link_href">
                            http://abc.com/downcomp2m.aspx?pic_id=jui28381&Catalogid=ju...
                        </div>
                        <div class="Hk_Copy">
                            <a class="copys">复制链接</a>
                            <div class="share">
                                分享到：
                                <a class="wb" title="分享到微博">分享到微博</a>
                                <a class="wx" title="分享到微信">分享到微信</a>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="Hk_pagination">
                    <a class="Hk_prev">&lt; 返回上一步</a>
                    <a class="Hk_next">
                        <span class="text">确认</span>
                        <span class="icon"></span>
                    </a>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div id="user_list">
            <div class="Hk_selectWrap">
            <div class="Hk_selectArea">
                <div class="Hk_searchType">
                    <a id="names" class="select">
                        <span class="all">全部</span>
                        按姓名查找
                    </a>
                    <a id="depart">
                        按部门查找
                    </a>
                </div>
                <div class="Hk_users" id="userList1">
                    <div class="Hk_leftFont">
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                        <span>D</span>
                        <span>E</span>
                        <span>F</span>
                        <span>G</span>
                        <span>H</span>
                        <span>J</span>
                        <span>K</span>
                        <span>L</span>
                        <span>M</span>
                        <span>N</span>
                        <span>O</span>
                        <span>P</span>
                        <span>Q</span>
                        <span>R</span>
                        <span>S</span>
                        <span>T</span>
                        <span>W</span>
                        <span>X</span>
                        <span>Y</span>
                        <span>Z</span>
                    </div>
                    <div class="Hk_userList">
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                        <div class="searchItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="addItem" title="添加">添加</div>
                        </div>
                    </div>
                </div>
                <div class="Hk_users" id="userList2" style="display:none;">
                    <div class="item">
                        <div class="itemLeft">
                            产品技术部(13)
                            <img src="images/Ico_Left.gif" />
                        </div>
                        <div class="itemRight">
                            添加部门所有成员
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="subList">
                        <div class="subItem">
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端开发工程师</div>
                            <div class="addItem">添加</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Hk_selectedArea">
                <div class="Hk_selectedTitle">
                    <span class="yixuan">已选同事</span>
                    <span class="clearAll">清除所有</span>
                </div>
                <div class="Hk_users">
                    <div class="Hk_userList">
                        <div class="subItem">
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                        <div class="subItem">
                            <div class="firstLetter"></div>
                            <div class="avatar">
                                <img src="images/topic.png" />
                            </div>
                            <div class="fullname">路扬</div>
                            <div class="job">WEB前端工程师</div>
                            <div class="remove" title="移除">移除</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            </div>
            <div class="Hk_pagination">
                <a class="Hk_prev">&lt; 返回上一步</a>
                <a class="Hk_next">
                    <span class="text">下一步</span>
                    <span class="icon"></span>
                </a>
            </div>
        <div class="clear"></div>
        </div>
        <div class="clear"></div>
    </div>

    
<script src="js/jquery-1.7.2.min.js"></script>
<script src="js/jquery.mousewheel.js"></script>
<script src="js/perfect-scrollbar.min.js"></script>
<script src="js/Script.js"></script>
</body>
</html>
