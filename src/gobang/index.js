import './style.scss'
import './main.js'
import pug from './main.pug'

var ele = document.createElement("div");
ele.innerHTML = pug;

document.body.appendChild(ele);