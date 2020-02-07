const fs = require('fs');
var Mustache = require('mustache');

var map = new Map();
generateIndex();

setTimeout(function () {
    // console.log(map)
}, 500);

function generateIndex() {
    console.log('generateIndex()');
    fs.readFile('README.md', 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        // console.log('str:', data);
        var str_arr = data.split('\n');
        // console.log(str_arr);

        for (var i = 0; i < str_arr.length; i++) {
            let item = str_arr[i];
            if (item.startsWith('|') && item.endsWith('|')) {
                let item_arr = item.split('|');
                if (item_arr.length !== 5) {
                    console.exception('And exception hanppened, item:', item);
                    continue;
                }
                let key = item_arr[3];
                let value = item_arr[2];
                 key = key.replace(/^\s*|\s*$/g,"");
                console.log(key, ' - ', value);
                map.set(key, value)
                // console.log('item;', item);
            }
        }

        if (map.length <= 0) {
            return;
        }

        component();

    });
}

function component() {
    console.log(map)

    var home_items = [];

    let aim_path = './src'
    var dirlist = fs.readdirSync(aim_path);
    if (dirlist.length === 0) {
        context.exception('exception');
    } else {
        let i = 0;
        dirlist.forEach(function (dirname) {
            var new_path = aim_path + "/" + dirname;
            var stat = fs.statSync(new_path);                             //要检查是否为文件夹，需获取stat对象
            if (stat && stat.isDirectory()) {

                let folder = dirname;

                // 生成的文件名称中不能包含小数点
                if (folder !== '' && folder.indexOf('/') === -1 && folder.indexOf('.') === -1
                    && folder.indexOf('index') === -1 && folder !== 'template') {
                    console.log(dirname);
                    let link_name = map.get('https://94275.cn/demo/' + folder + '/');
                    console.log('link_name:', link_name);
                    if (!link_name) {
                        link_name = folder;
                    }
                    home_items.push({
                        "path": './' + folder + '/',
                        "name": link_name,
                        "style": getLiStyle(i)
                    })
                }


            }
            i++;

        });

    }

    fs.readFile("./src/index/index.tpl", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var output = Mustache.render(data, {sliders: home_items});
        fs.writeFile('./src/index/index.html', output, function (err, written, buffer) {
        });
    });

}

/*
 * 获取 li 样式
 */
function getLiStyle(position) {
    if (position === -1) {
        position = Math.round(Math.random() * 20);
    }
    var style_arr = [
        'border-top: 6px solid #455a64;background: #90a4ae;',
        'border-top: 6px solid #333333;background: #9e9e9e;',
        'border-top: 6px solid #8d6e63;background: #bcaaa4;',
        'border-top: 6px solid #ff7043;background: #ffab91;',
        'border-top: 6px solid #ff9800;background: #ffb74d;',
        'border-top: 6px solid #f9a825;background: #fdd835;',
        'border-top: 6px solid #c0ca33;background: #d4e157;',
        'border-top: 6px solid #0a7e07;background: #72d572;',
        'border-top: 6px solid #689f38;background: #aed581;',
        'border-top: 6px solid #673ab1;background: #9775cd;',
        'border-top: 6px solid #006064;background: #00acc1;',
        'border-top: 6px solid #01579b;background: #039be5;',
        'border-top: 6px solid #004d40;background: #00897b;',
        'border-top: 6px solid #e51c23;background: #f69988;',
        'border-top: 6px solid #e91e63;background: #f48fb1;'
    ];
    return style_arr[position % style_arr.length];
}