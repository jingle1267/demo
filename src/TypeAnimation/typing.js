var heading = document.querySelector("h1");
var data = ["有事者，事竟成；","破釜沉舟，百二秦关终归楚；","苦心人，天不负；","卧薪尝胆，三千越甲可吞吴。","蒲松龄","https://demo.94275.cn/TypeAnimation/"];
var j = 0;
var i = 0;

var k;

function typing(){
    if(heading.innerHTML.length === data[j].length){
        k = 0;
        setTimeout(del, 1200);
    }
    if(i<data[j].length){
        heading.innerHTML += data[j].charAt(i);
        i++;
        setTimeout(typing, 50);
    }
    else{
        j++;
        i = 0;
        k = 0;
        setTimeout(typing, 3000);
    }
    if(j === data.length){
        j = 0;
    }
}

// var check = document.getElementById("check");
// var k = 0;
function del(){
    if(heading.innerHTML.length == 0){
        clearTimeout(time);
    }
    else{
        heading.innerHTML = heading.innerHTML.slice(0, heading.innerHTML.length - k);
        k++;
        var time = setTimeout(del, 100);
    }
}

typing();