/*
@@@@@@@t               i8@@@@@
@@@@@@f .tCLf1iii1t1i:  t@@@@@
@@@@@8  L@@@@@@@@@@@@@; i@@@@@
@@@@@@..@@@@@@@@@@@@@@; f@@@@@
@@@@@@i.i1t1f0@@8CfffCi.0@@@@@
@@@@@0.,.i;, ;Gt, :ii;t,@@@@@@
@@@@@8fGG0fLG:Ct10CGG0C;8@@@@@
@@@@@@@8@@8ffG@@ff0@@8G@@@@@@@
@@@@@@@@@C;C@@800L:L@@@@@@@@@@
@@@@@@@@8 ;00t,1LG1:8@@@@@@@@@
@@@@@@@@: it.:1t;18f,f@@@@@@@@
@0GCLti, ,:,. ,ifGfi::L0@@@@@@
:        .@L; .;1f00   .,:1f0@
          i8@G1t0@G:;       .;
            ,:i11:  :
*/

// import _ from 'lodash';
// import style from './style.css';
// import "./ChristmasTree/ChristmasTree.pug"
// import sass from './ChristmasTree/style.scss'
// import style from './ChristmasTree/style.scss'
// import Icon from './s.jpg';
// import printMe from './print.js';
// import {cube} from './math.js';
//
// if (process.env.NODE_ENV !== 'production') {
//     console.log('Looks like we are in development mode!');
// }
//


// const filename = './first-level.js';
// const func = context(); // => Success

//
// const files = [
//     ...glob.sync(path.join(__dirname, './src/')) // common入口
// ];
//
// files.forEach(val => {
//     let filePath = val.split('/src/')[1];
//     console.log(filePath)
// });

async function conponent() {
    var ul = document.createElement('ul');

    const context = require.context('../src', true, /.*/);
    context.keys().forEach(item => {
        let folder = item.replace('./', '')

        if (folder === '') {
            return;
        }
        if (folder.indexOf('/') !== -1) {
            return;
        }
        // 生成的文件名称中不能包含小数点
        if (folder.indexOf('.') !== -1) {
            return;
        }
        if (folder.indexOf('index') !== -1) {
            return;
        }
        console.log('=== ', folder)
        let li = document.createElement('li');
        li.innerHTML = "<a href='" + item + "'>" + folder + "</a>";
        ul.appendChild(li);

    })

    return ul;

    // var element = document.createElement('div');
    // var btn = document.createElement('button');
    // var element = document.createElement('pre');
    //
    // // Lodash, now imported by this script
    // // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // // element.classList.add('hello');
    //
    // element.innerHTML = [
    //     'Hello webpack!',
    //     '5 cubed is equal to ' + cube(5),
    //     ' '
    // ].join('\n\n');
    //
    // btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;
    // element.appendChild(btn);
    //
    // // 将图像添加到我们现有的 div。
    // // var myIcon = new Image();
    // // myIcon.src = Icon;
    // // element.appendChild(myIcon);
    //
    // element.classList.add('hello');
    // return element;
    // // return;
}

conponent().then(component => {
    document.body.appendChild(component);
})


// Import styles
// import style from "./ChristmasTree/style.scss"
// Import scripts
// import script from "./scripts/plugin.js"
// console.log('all files loaded');

// import './ChristmasTree/tree.scss'
// import pug from './ChristmasTree/tree.pug'
//
// document.body.innerHTML = pug