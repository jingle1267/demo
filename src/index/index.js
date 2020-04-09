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

import './css/marx.min.css'
import './css/totop.css'
import './css/magic_component.css'
import './css/magic_normalize.css'
import './css/list.css'

import './js/jquery.min.js'
import './js/jquery.qrcode.min.js'
import './js/magic_bg.js'
import './js/init.js'

// async function conponent() {
//     let ul = document.body.getElementsByTagName('ul')[0];
//     const context = require.context('../../src', true, /.*/);
//     let key_list = context.keys();
//
//     for (let i = 0; i < key_list.length; i++) {
//         let item = key_list[i];
//
//         let folder = item.replace('./', '');
//
//         if (folder === '') {
//             continue;
//         }
//         if (folder.indexOf('/') !== -1) {
//             continue;
//         }
//         // 生成的文件名称中不能包含小数点
//         if (folder.indexOf('.') !== -1) {
//             continue;
//         }
//         console.log('folder:', folder);
//         if (folder.indexOf('index') !== -1) {
//             continue;
//         }
//         if (folder === 'template') {
//             continue;
//         }
//         let li = document.createElement('li');
//         li.setAttribute('style', getLiStyle(i));
//         li.innerHTML = "<a href='" + item + "'>" + folder + "</a>";
//         ul.appendChild(li);
//     }
//
//     return ul;
// }

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

// conponent().then(component => {
    // document.body.appendChild(component);
// })

