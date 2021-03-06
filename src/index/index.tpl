<!doctype html>
<html>
<head>
    <title>前端优秀动画效果</title>
    <meta name="author" content="jingle1267">
    <meta name="description" content="Christmas Tree">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<div style="position: relative;">
    <div id="large-header" class="large-header">
        <canvas id="demo-canvas" width="375" height="667"></canvas>
    </div>

    <div class="navcontainer">
        <nav id="nav" class="navlist">
            <ul>
                {{#sliders}}
                <li style="{{style}}"><a href="{{{path}}}">{{name}}</a></li>
                {{/sliders}}
            </ul>
        </nav>
        <div style="height: 1px"></div>
        <div class="suspension">
            <a class="cart" title="手机扫码查看" id="cart">
                <div class="pic">
                    <div class="pic-content" id="qrcode"></div>
                </div>
            </a>
            <a href="javascript:void(0)" class="back-top" style="display: block;" title="返回顶部"></a>
        </div>

    </div>

    <div class="titlebar">
        <h1>前端优秀动画效果</h1>
    </div>

</div>

<div style="display:none">
    <script type="text/javascript" src="https://s95.cnzz.com/z_stat.php?id=1260545070&web_id=1260545070"></script>
</div>

</body>
</html>