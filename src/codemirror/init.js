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

import CodeMirror from 'codemirror/lib/codemirror.js'

var myTextarea = document.getElementById('editor');

var CodeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
    mode:"text/javascript",
    lineNumbers:true,
    theme:"darcula",
    lineWrapping: true,
    foldGutter: true,
    matchBrackets: true,
    autoCloseBrackets: true
});

// var myCodeMirror = CodeMirror(document.body, {
//     value: "function myScript(){return 100;}\n",
//     mode:  "javascript"
// });