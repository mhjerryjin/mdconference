﻿$("#coms").click(function () {
    $("#slideMenu").slideToggle(300)
})
$("#coms2").on("mouseover",function () {
    $("#slideMenu").slideDown(300)
})
$("#slideMenu").on("mouseleave", function () {
    var timer = 0;
    timer = setTimeout(function () {
        $("#slideMenu").slideUp(300)
    },1000)
})
$("#Hk_camUser").on("mouseleave", function () {
    var timer = 0;
    timer = setTimeout(function () {
        $("#Hk_camUser").slideUp(300)
    }, 1000)
})
$("#invite1").click(function () {
    $("#invite1").addClass("local");
    $("#invite2").removeClass("local");
    $("#Hk_Search").show();
    $("#Hk_invite").hide()
    $("#user_list").show()
})
$("#invite2").click(function () {
    $("#invite2").addClass("local");
    $("#invite1").removeClass("local");
    $("#Hk_invite").show();
    $("#Hk_Search").hide()
    $("#user_list").hide()
})
$("#mobile").click(function () {
    $("#mobile").addClass("selected");
    $("#links").removeClass("selected");
    $("#links_con").hide();
    $("#mobile_con").show();
})
$("#links").click(function () {
    $("#links").addClass("selected");
    $("#mobile").removeClass("selected");
    $("#mobile_con").hide();
    $("#links_con").show();
})
$("#names").click(function () {
    $("#names").addClass("select");
    $("#depart").removeClass("select");
    $("#userList1").show();
    $("#userList2").hide();
})
$("#depart").click(function () {
    $("#depart").addClass("select");
    $("#names").removeClass("select");
    $("#userList2").show();
    $("#userList1").hide();
})
$("#chebox").change(function () {
    if ($("#chebox").prop("checked")) {
        $("#pwd1").slideDown(200);
    } else {
        $("#pwd1").slideUp(200);
        $("#pwd1 input").val("");
    }
})
$("#begin").click(function () {
    $("#begin").addClass("selBtn");
    $("#order").removeClass("selBtn");
    $("#orderDate").hide();
})
$("#order").click(function () {
    $("#order").addClass("selBtn");
    $("#begin").removeClass("selBtn");
    $("#orderDate").show();
})

//$('.form_datetime').datetimepicker({
//    language:  'zh-CN',
//    weekStart: 1,
//    todayBtn: 1,
//    pickerPosition: "bottom-left",
//});
$("#userCheck").click(function () {
    $("#Hk_camUser").slideToggle(200);
})
$("#camera").click(function () {
    $("#camera span").toggleClass("camBtn2","camBtn")
    $("#camera_con").toggle();
    $("#message_con").toggle();
    $("#PC span").removeClass("PC2")
    $("#desktop").hide();
})
$("#PC").click(function () {
    $("#PC span").toggleClass("PC2", "PC")
    $("#camera span").removeClass("camBtn2")
    $("#camera_con").hide();
    $("#desktop").toggle();
    $("#message_con").toggle();
    $("#camera_con").hide();
})
$("#lock").click(function () {
    $("#lock span").toggleClass("lock2", "lock")
})
$("#luyin").click(function () {
    $("#luyin span.audio").toggleClass("audio2", "audio")
})
$("#mettinguser").delegate("#joinBtn", "click", function () {
    $("#joinBtn").addClass("highlight");
    $("#unJoinBtn").removeClass("highlight");
    $("#join_con").show();
    $("#unJoin_con").hide();

})
$("#mettinguser").delegate("#unJoinBtn", "click", function () {
    $("#joinBtn").removeClass("highlight");
    $("#unJoinBtn").addClass("highlight");
    $("#join_con").hide();
    $("#unJoin_con").show();

})
$("#mettinguser").delegate("#addUserBtn", "click", function () {
    $("#bodyBg").fadeIn(200)
    $("#userWrap").fadeIn(200)

})
$("#Hk_reRight").click(function () {
    $("#slideMenu").slideToggle(200);
})

if (typeof ($.fn.datetimepicker) != 'undefined') {
    $('.form_datetime').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        pickerPosition: "bottom-left",
    });
}

$(document).ready(function () {
    var heights = $(document).height();
    var heis = heights - 770;
    $(".bottomArea").css("height", heis)
})
$(window).resize(function(){
    var heights = $(document).height();
    var heis = heights - 770;
    $(".bottomArea").css("height", heis)
    if (heights < 770) {
        $(".bottomArea").css("height", "0")
    }
})

$("#bodyBg , #closeBtn").click(function () {
    $("#userWrap").fadeOut(200)
    $("#bodyBg").fadeOut(200)
})