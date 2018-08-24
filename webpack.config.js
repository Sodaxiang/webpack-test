var path=require('path');

var HtmlWebpackPlugin=require('html-webpack-plugin');
var MinCssExtractPlugin=require('mini-css-extract-plugin');


module.exports={
    mode:'development',
    entry:'./src/index.js',
    devtool:'source-map',
    output:{
        filename:'index.[hash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[MinCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.jpg$/,
                use:'url-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'test-20597',
            template:'./src/index.tplt.html',
            favicon:'./favicon.ico'
        }),
        new MinCssExtractPlugin({
            filename:'index.[hash:8].css'
        })
    ]
}