$(function () {
    $(".back-top").hide();
    $(".back-top").live("click", function () {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    })
    $(window).bind('scroll resize', function () {
        if ($(window).scrollTop() <= 400) {
            $(".back-top").hide();
        } else {
            $(".back-top").show();
        }
    })
})

function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

if (!isPC()) {
    jQuery('#cart').hide()
}

jQuery('#qrcode').qrcode({width: 139, height: 139, text: window.location.href});