var $selectuser = function (el, param) {
            var _self = this,
                setting = $.extend({
                    id: 'user_list'
                }, param);
            _self.init = function () {
                    _self.bindEvent();
            }
            _self.bindEvent = function () {
                var userdialog = $("#" + setting.id),
                    search_input = $("#userdialog_key"),
                    letter_list = $("#userlist"),
                    depart_list = $("#departs"),
                    letterfilter = $("#letterfilter");

                search_input.keyup(function () {
                    _self.search();
                });
                //添加一个用户
                userdialog.find("a.empAdd").click(function () {
                    var li = $(this).parent("li").clone();
                    _self.cloneToResult(li);

                });
                //按照首字母过滤用户
                letterfilter.find("a").click(function () {
                    letterfilter.find("a").removeClass("Bold");
                    $(this).addClass("Bold")
                    if ($(this).text() == "全部") {
                        letter_list.find("li").removeClass("Hidden");
                    } else {
                        letter_list.find("li").addClass("Hidden");
                        letter_list.find("li[firstname='" + $(this).text() + "']").removeClass("Hidden");
                    }
                });

                //添加整个部门的用户
                userdialog.find("a.empAddDepart").click(function () {
                    var departItem = $(this).parent("div.departmentitem"),
                        departuserlist = departItem.next("div.departuserlist");
                    if (departuserlist.find("li").length > 0) {
                        departuserlist.find("li").each(function () {
                            var li = $(this).clone();
                            return _self.cloneToResult(li)
                        });
                    }
                    return false;
                });
                //展开/收起 部门下的用户列
                userdialog.find("div.departmentitem").click(function () {
                    if ($(this).next("div.departuserlist").is(":hidden")) {
                        $(this).find("img").attr("src", "/Images/Ico_Down.gif");
                    } else {
                        $(this).find("img").attr("src", "/Images/Ico_Left.gif");
                    }

                    $(this).next("div.departuserlist").toggle();
                });
                //鼠标放上，操作按钮呈现，鼠标离开，操作按钮隐藏
                userdialog.delegate("li,div.departmentitem", "mouseenter", function () {
                    $(this).find("a").show();
                });
                userdialog.delegate("li,div.departmentitem", "mouseleave", function () {
                    $(this).find("a").hide();
                });
                //删除已经选择的用户
                userdialog.delegate("a.empDelete", "click", function () {
                    $(this).parent("li").remove();
                });

            }
            _self.cloneToResult = function (li) {
                
                
                //如果用户已经被选择，则不再添加
                if ($("#userdialogresult").find("li[UserID='" + li.attr("UserID") + "']").length > 0) {
                    alert("用户已经添加在列表里了");
                    return false;
                }
                li.removeAttr("class");
                li.find("span.letter").remove();
                var close = $("<a/>").addClass("Right empDelete").attr("href", "javascript:;").text("×");
                li.find("a.empAdd").after(close).remove();
                $("#userdialogresult").append(li);
                return true;
            }

            _self.search = function () {
                var keywords = $("#userdialog_key").val(),
                    userdialog = $("#" + setting.id),
                    letterfilter = $("#letterfilter"),
                    filter = letterfilter.find("a.Bold"),
                    firstname = filter.text() != "全部" ? filter.text() : "";
                $("ul.employeeitem>li").find("span.letter").text('');
                if (keywords.isNull()) {
                    if (firstname.isNull())
                        $("ul.employeeitem>li").removeClass("Hidden");
                    else
                        $("ul.employeeitem>li[firstname='" + firstname + "']").removeClass("Hidden");

                    var departmentitem = userdialog.find("div.departmentitem");
                    departmentitem.show();
                    departmentitem.find("img").attr("/Images/Ico_Left.gif");
                    departmentitem.next("div.departuserlist").hide();
                } else {
                    $("ul.employeeitem>li").addClass("Hidden");
                    $("ul.employeeitem>li").each(function () {
                        var search = $(this).attr("search");
                        var tempfirstname = $(this).attr("firstname");
                        if (firstname.isNull() || (tempfirstname && firstname == tempfirstname)) {
                            if (search.contains(keywords)) {
                                $(this).removeClass("Hidden");
                            }
                        }
                    });

                    var departmentitem = userdialog.find("div.departmentitem");
                    departmentitem.each(function () {
                        var departuserlist = $(this).next("div.departuserlist");
                        if (departuserlist.find("li").length > departuserlist.find("li.Hidden").length) {
                            $(this).show();
                            $(this).find("img").attr("/Images/Ico_Down.gif");
                            $(this).next("div.departuserlist").show();
                        } else {
                            $(this).hide();
                        }
                    });
                }
                letterfilter.find("a").each(function () {
                    if ($(this).text() != "全部") {
                        var first = $("#userlist ul.employeeitem>li[firstname='" + $(this).text() + "']:not(.Hidden)").first();
                        if (first.length) {
                            first.find("span.letter").text($(this).text());
                        }
                    }
                });
                $("#departs ul.employeeitem>li").removeClass("lasttreeline").addClass("treeline");
                $("#departs div.departuserlist").each(function () {
                    var last = $(this).find("ul.employeeitem>li:not(.Hidden)").last();
                    if (last.length) {
                        last.addClass("lasttreeline").removeClass("treeline");
                    }
                });


            }
            _self.init();
        }