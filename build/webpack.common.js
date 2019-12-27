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
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        ChristmasTree: './src/ChristmasTree/index.js',
        windmill: './src/windmill/index.js',
        fontloading: './src/fontloading/index.js',
        tagcloud: './src/tagcloud/index.js',
        index: './src/index/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'ChristmasTree',
            template: './src/ChristmasTree/index.html',
            filename: 'ChristmasTree/index.html',
            inject: true,
            hash: true,
            chunks: ['ChristmasTree']
        }),
        new HtmlWebpackPlugin({
            title: 'windmill',
            template: './src/windmill/index.html',
            filename: 'windmill/index.html',
            inject: true,
            hash: true,
            chunks: ['windmill']
        }),
        new HtmlWebpackPlugin({
            title: 'fontloading',
            template: './src/fontloading/index.html',
            filename: 'fontloading/index.html',
            inject: true,
            hash: true,
            chunks: ['fontloading']
        }),
        new HtmlWebpackPlugin({
            title: 'tagcloud',
            template: './src/tagcloud/index.html',
            filename: 'tagcloud/index.html',
            inject: true,
            hash: true,
            chunks: ['tagcloud']
        }),
        new HtmlWebpackPlugin({
            title: 'index',
            template: './src/index/index.html',
            filename: 'index.html',
            inject: true,
            hash: true,
            chunks: ['index']
        })

    ],
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
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: ['url-loader']
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
            }
        ]
    }
};