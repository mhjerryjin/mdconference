var global={};
global.request=function (url,param,callback) {
	jQuery.ajax({
        url: url,
        type:"POST",
        processData:false,
        data: JSON.stringify(param),
        success: function (data) { 
        	callback&&callback(data);
        }
    })
}

global.getParam=function(){
	var url = location.href;  //获取url中"?"符后的字串  
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substring(url.indexOf("?") + 1);
        str = str.replace(/#/g, "");
        if (url.indexOf("&") == -1) {
            theRequest[str.substring(0, str.indexOf("="))] = str.substring(str.indexOf("=") + 1);
        }
        else {
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].substring(0, strs[i].indexOf("="))] = strs[i].substring(strs[i].indexOf("=") + 1);
            }
        }

    } else if (url.indexOf("&") != -1) {
        var str = url.substring(url.indexOf("&") + 1);
        str = str.replace(/#/g, "");
        if (url.indexOf("&") == -1) {
            theRequest[str.substring(0, str.indexOf("="))] = str.substring(str.indexOf("=") + 1);
        }
        else {
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].substring(0, strs[i].indexOf("="))] = strs[i].substring(strs[i].indexOf("=") + 1);
            }
        }
    }
    return theRequest;
}

//写入
global.setCookie=function(name, value) {
    var nextyear = new Date();
    nextyear.setFullYear(nextyear.getFullYear() + 10);
    var expireDate = nextyear.toGMTString();
    if (document.domain.indexOf('.mingdao.com') == -1) {
        document.cookie = name + "=" + escape(value) + ";expires=" + expireDate + ";path=/";
    } else {
        document.cookie = name + "=" + escape(value) + ";expires=" + expireDate + ";path=/;domain=.mingdao.com";
    }
}
//读取
global.getCookie=function(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null;
}