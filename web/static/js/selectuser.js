var selectuser = function (el, param) {
            var _self = this,
                setting = $.extend({
                    id: 'user_list'
                }, param);
            _self.init = function () {
                    _self.bindEvent();
            }
            _self.bindEvent = function () {
                var search_input = $("#search_key"),
                    fromuser = $("#fromuser"),
                    touser = $("#touser div.Hk_userList");

                search_input.keyup(function () {
                    _self.search();
                });
                //添加一个用户
                fromuser.find("div.searchItem").click(function () {
                    var li = $(this).clone();
                    _self.cloneToResult(li);

                });
                //删除已经选择的用户
                touser.delegate("div.remove", "click", function () {
                    $(this).parent("div.subItem").remove();
                });

            }
            _self.cloneToResult = function (item) {
                
                
                //如果用户已经被选择，则不再添加
                if ($("#touser div.Hk_userList").find("div[UserID='" + item.attr("UserID") + "']").length > 0) {
                    alert("用户已经添加在列表里了");
                    return false;
                }
                item.removeClass("searchItem").addClass("subItem");
                var close = $("<div/>").addClass("remove").attr("title", "移除").text("移除");
                item.find("div.addItem").after(close).remove();
                $("#touser div.Hk_userList").append(item);
                return true;
            }

            _self.search = function () {
                var keywords = $("#search_key").val(),
                    fromuser = $("#fromuser");
                if (keywords=='') {
                } else {
                	keywords=keywords.toLowerCase();
                    fromuser.find("div.Hk_userList>div.searchItem").addClass("Hidden");
                    fromuser.find("div.Hk_userList>div.searchItem").each(function () {
                        var search = $(this).attr("search").toLowerCase();
                        if (search.indexOf(keywords)!=-1) {
                            $(this).removeClass("Hidden");
                        }
                    });
                }
            }
            _self.next=function(){
            	var users=new Array();
            	$("#touser div.Hk_userList>div.subItem").each(function(){
            		var id=$(this).attr("userid");
            		var name=$(this).find("div.fullname").text();
            		var avatar=$(this).find("div.avatar").find("img").attr("src");
            		users.push({id:id,number:'',name:name,avatar:avatar});
            	});
            	$("#mobile_con>div.Hk_mobile").each(function(){
        			var name=$(this).find("input.Hk_MName").val();
        			var number=$(this).find("input.Hk_MTel").val();
        			if(number!=''){
        				users.push({id:'',name:name,number:number,avatar:"static/images/default.gif"});
        			}
        		});
            	if(users.length==0){
            		alert("至少要邀请一个人亲");
            		return;
            	}
            	users.push({id:main.current.id,name:main.current.name,number:'',avatar:main.current.avatar100});
            	
            	$("#from").find("input[name='users']").val(JSON.stringify(users));
            	$("#from").attr("action","invite.php?id="+main.metting.id).submit();
            }
            _self.init();
        }