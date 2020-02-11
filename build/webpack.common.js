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

const path = require('path');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const JavaScriptObfuscator = require('webpack-obfuscator');

require('./buildindex');

const htmls = glob.sync('./src/**/*.html');
const entrys = {};
const pluginsArray = [];
// pluginsArray.push(new ExtractTextPlugin("style.css"));
// pluginsArray.push(new ExtractTextPlugin());
htmls.forEach((filePath) => {
    // 分割路径, ['src', 'components', 'index.html'], 放进 path 数组里
    let path = filePath.split('/');
    let chunk = path[2];
    // console.log('filePath', filePath);
    if (filePath.startsWith('./src/') && filePath.endsWith('/index.html') && !filePath.endsWith('./src/template.html')) {
        // console.log('chunk:', chunk);
        // 动态配置入口文件路径
        // console.log('template:', filePath);
        entrys[chunk] = './src/' + chunk + '/index.js';
        let filename = chunk + '/index.html';
        // 目录页面特殊处理
        if (chunk === 'index') {
            filename = 'index.html'
        }
        // 动态配置入口文件插件
        pluginsArray.push(
            new HtmlWebpackPlugin({
                title: chunk,
                template: filePath,
                chunks: [chunk],
                filename: filename,
                inject: 'body',
                hash: true,
            })
        )
    } else {
        console.info('exception chunk:', chunk)
    }
});
// 最后把要使用的插件放进去
pluginsArray.push(new CleanWebpackPlugin());
pluginsArray.push(new JavaScriptObfuscator({
    rotateUnicodeArray: true
}, ['ColorPicker/color.js']));



module.exports = {
    entry: entrys,
    plugins: pluginsArray,
    output: {
        filename: '[name]/[name].bundle.[hash].js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // {
            //     test: /\.svg$/,
            //     use: ['url-loader']
            // },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true,
                        paths: [path.resolve(__dirname, '../node_modules/lesshat/')]
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: true
                    }
                }
            }
        ]
    }
};
