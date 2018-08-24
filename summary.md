---
title: "学习小结（2018-07-20）"
date: 2018-07-20
draft: false
---
# 总结

## Webpack学习小结

### 1）entry

* 定义打包入口文件

* 有三种类型：`字符串`、`数组`、`对象`

### 2) output必须是一个对象

### 3）module中定义不同的loader来对不同的文件进行解析打包

* 可以使用include以及exclude参数在定义。

* test参数配置时注意使用正则表达式的使用。

* CSS：```style-loader``` ,```css-loader```，

* JS、JSX:  ```babel-loader```,

* URL引入：```url-loader```,```file-loader```
,  ```file-loader```主要用来处理图片，其实也可以在js和html及其他文件上，但很少那么使用；```url-loader```是```file-loader```的加强版，可以使用limit参数。  
```url-loader```工作分两种情况：1.文件大小小于limit参数，```url-loader```将会把文件转为DataURL；2.文件大小大于limit，```url-loader```会调用```file-loader```进行处理，参数也会直接传给```file-loader```。

```js
       {
            test:/\.jpg$/,
            use:{
                loader:'url-loader',
                 options:{
                     limit:8000
                 }
            }
        }
```
### 4) ```extract-text-webpack-plugin```  
* 该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象,但在目前其最新版本为3.0.2，在webpack4中不能很好的使用。

* 可以用 `mini-css-extract-plugin`代替，也可以在安装时候使用 4.0 beta 版，```npm install --save-dev extract-text-webpack-plugin@next```。

* extract-text-webpack-plugin  
 ```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}
```
extract-text-webpack-plugin 
该插件有三个参数意义分别如下:  
use：指需要什么样的loader去编译文件，这里由于源文件是.css所以选择css-loader。  
fallback：编译后用什么loader来提取css文件。  
publicfile:用来覆盖项目路径,生成该css文件的文件路径。
* mini-css-extract-plugin  
```js
var cssPlugin=require('mini-css-extract-plugin');
module.exports = {
  module: {
    rules: [
      {
        test:/\.css$/,
            use:[cssPlugin.loader,'css-loader']
      }
    ]
  },
  plugins: [
     new cssPlugin({
            filename:'style.css',
        })
  ]
}
```
### 5) ```html-webpack-plugin```
* ```html-webpack-plugin```简化了HTML文件的创建，只需提供一个模板template，该插件便可自动根据相关配置生成想要的HTML文件。
* 安装  
   ```npm install html-webpack-plugin --save-dev```
* 使用  
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './app/index.js',
    output: {
        ...
    },
    module: {
        ...
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "This is the result",//生成的HTML模板的title，如果模板中有设置title的名字，则会忽略这里的设置,也可以在模板中使用<%= htmlWebpackPlugin.options.title%>调用该名字
            filename: "./index.html",//生成的文件的名字
            template: "./app/index.html",//模板文件路径
            inject: "body",//引入模块的注入位置；取值有true/false/body/head
            favicon: "",//指定页面的图标
            minify: {
                caseSensitive: false,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            },//是html-webpack-plugin中集成的 html-minifier ，生成模板文件压缩配置，有很多配置项
            hash: true,//是否生成hash添加在引入文件地址的末尾
            cache: true,//是否需要缓存
            showErrors: true,//是否将错误信息写在页面里，默认true，出现错误信息则会包裹在一个pre标签内添加到页面上
            chunks: "",//引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入
            chunksSortMode: "auto",//引入模块的排序方式
            excludeChunks: "",//排除的模块
            xhtml: false //生成的模板文档中标签是否自动关闭，针对xhtml的语法，会要求标签都关闭，默认false
        })
    ]
};
```

---
---

## 2.Babel学习小结

### 1) ```gulp babel```

* 用于在gulp中使用babel的一个依赖包

### 2）在用babel进行编译时，需要安装相应的插件，比如```babel-preset-react```，```babel-preset-es2015```等才能将原来的ES6代码进行转换，否则只会原样输出。  
.babelrc文件里即：
```js
 {
       "presets": [
           "es2015",
           "react"
       ]
    }
```

### 3) Plugin/Preset 排序

#### .babelrc里的plugin 或 preset有一定的执行顺序

* Plugin 会运行在 Preset 之前。
* Plugin 会从第一个开始顺序执行。
* Preset 从最后一个逆序执行。  
例如：
```js
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```
将先执行 transform-decorators-legacy 再执行 transform-class-properties. 
 
再比如：
```js
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
```

按以下顺序运行: stage-2， react， 最后 es2015 。

---
---
## 3. Webpack、Babel考试小结

### webapck.config.js配置相关注意事项  

* 在使用插件  ```html-webpack-plugin```时，可以配置一个  ```favicon:'图标路径'``` 来指定网页标签的图标。  

* ```devtool:source-map```配置后可以利用浏览器调试工具通过 Source Map 映射代码，可以在源代码上断点调试，一般在development开发模式下使用。

* 开发环境（devolopment）和生产环境（production）的区别，两者的构建目标有很大差异。  
```json
      在开发环境中，需要具有强大的、具有实时重新加载（live reloading）或者热模块替换(hot module replacement)能力的 source map 和 localhost server。  
  
      在生产环境中，目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。

      由于要遵循逻辑分离，所以通常建议为每个环境编写彼此独立的 webpack 配置，可将webpack.config.js分开独立分成三个文件“webpack.common.js”、“webpack.dev.js” 以及 “webpack.pro.js”， 将生产环境和开发环境做略微区分，我们还是会遵循不重复原则(Don’t repeat yourself - DRY)，保留一个“通用”配置，即为 “webpack.common.js”，要将这些配置文件合并在一起，可以使用 webpack-merge 插件。
```
* ```webpack-merge```插件：可以把分开配置的config合并，分开生产环境和调试环境。其一般使用示例如下（可查阅官方API文档）：  

```js
      const merge = require('webpack-merge');
      const commonConfig= {...};//要合并的文件

      var config;
      config = merge(commonConfig, {
          //一些配置参数选项，如下做参考
           mode:'production',
           plugins:[new uglifyPlugin({}),new cleanPlugin('dist')],
           devtool:''
      });
```

* ```clean-webpack-plugin```插件：该插件可在打包时自动清除输出文件夹中未用到的文件。比如我们将打包生成的文件全部放在dist目录下，第一次打包后生成了一些文件，在第二次打包后，依然在该目录下生成一些文件，但第一次生成的文件已经用不到，此时应该删除掉，使用该插件便可以自动第一次打包生成的文件。一般用法如下： 

```js
      var CleanWebpackPlugin=require('clean-webpack-plugin');
      module.exports={
      plugins: [
        new CleanWebpackPlugin(['打包目录']),
          ]
      }
```

* webpack的compile流程，入口函数run(),即webpack().run()一般使用的时候在run()中加哟个回调函数，即为```webpack().run(callback)```。  

---
---

## 4. ES6预习

### ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

### ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 Jscript 和 ActionScript）。日常场合，这两个词是可以互换的。

### 在ES6中，有以下比较常见的新特性

* `let` 和 `const`  
```json
      在es6之前，一般声明变量是使用var，var会存在变量提升（无论声明在何处，都会被视为声明在最顶部）。

      let表示变量，const表示常量，const一旦声明便无法更改。

      let和const都是块级作用域，即 { } 大括号内的代码块即为let 和 const的作用域。
```

* `模板字符串`：创建字符串的一种新方法
```json
基本的字符串格式化。将表达式嵌入字符串中进行拼接。用${}来界定。
```
```js
    //ES5 
    var name = 'lux'
    console.log('hello' + name)
    //es6
    const name = 'lux'
    console.log(`hello ${name}`) //hello lux
```  
```json
在ES5时通过反斜杠(\)来做多行字符串或者字符串一行行拼接。ES6反引号(` `)直接搞定。
```  
```js
// ES5
    var msg = "Hi \
    man!
    "
    // ES6
    const template = `<div>
        <span>hello world</span>
    </div>`
```

* `箭头函数`：ES6 允许使用“箭头”（=>）定义函数,箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。  
箭头函数不可以当作构造函数，即不能有new操作符。  
ES6中的继承当前上下文的 this 关键字。

```js
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```
* `解构赋值`:ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。  

```js
let [a, b, c] = [1, 2, 3];
//等同于
let a = 1;
let b = 2;
let c = 3;

let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```

* `展开运算符`:在ES6中用`...`来表示展开运算符，它可以将数组方法或者对象进行展开。

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 10, 20, 30];
// 这样，arr2 就变成了[1, 2, 3, 10, 20, 30];

const obj1 = {
  a: 1,
  b: 2,
  c: 3
}

const obj2 = {
  ...obj1,
  d: 4,
  e: 5,
  f: 6
}

// 结果类似于 const obj2 = Object.assign({}, obj1, {d: 4})
```

* `import` 和 `export`:import导入模块、export导出模块。

```js
//全部导入
import people from './example'

//有一种特殊情况，即允许将整个模块当作单一对象进行导入
//该模块的所有导出都会作为对象的属性存在
import * as example from "./example.js"
console.log(example.name)
console.log(example.age)
console.log(example.getName())

//导入部分
import {name, age} from './example'

// 导出默认, 有且只有一个默认
export default App

// 部分导出
export class App extend Component {};

注意点：
1.当用export default people导出时，就用 import people 导入（不带大括号）

2.一个文件里，有且只能有一个export default。但可以有多个export。

3.当用export name 时，就用import { name }导入（记得带上大括号）

4.当一个文件里，既有一个export default people, 又有多个export name 或者 export age时，导入就用 import people, { name, age } 

5.当一个文件里出现n多个 export 导出很多模块，导入时除了一个一个导入，也可以用import * as example
```

* `Promise` :Promise 是异步编程的一种解决方案,所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

---
---

## 出错总结

### 1. ```extract-text-webpack-plugin``` 最新版本为 3.0.2，这个版本还没有适应 webpack 4 的版本  

#### &emsp;解决办法：使用 4.0 beta 版，```npm install --save-dev extract-text-webpack-plugin@next```，或者使用 ```mini-css-extract-plugin```代替。

### 2. 使用webpack的```new webpack.optimize.UglifyJsPlugin()```时报错:  Error: webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead

#### &emsp;解决办法：

#### &emsp;1）在webpack4.X中，webpack内置的JS压缩插件不能使用了，可以安装uglifyjs-webpack-plugin插件，使用同其他非内置插件；

#### &emsp;2）webpack4.x下，压缩代码可以在package.json中的script中配置（自动压缩）：  

```json

"scripts": {
     "start": "webpack --mode production",
     "build": "webpack --mode development"
  }

```

### 3. npm login时登录失败出错检查，注意使用 `npm config list`查看当前registry是否正确，使用 `npm config set registry https://...`设置正确的registry。

### 4. 不要混淆webpack与webpack-dev-server,使用webpack-dev-server热替换时，不需要先使用命令webpack，即不用先使用webpack命令将文件打包，热替换最初的目的就是为了减去重复写入文件的麻烦,所以把重新编译的文件放在内存中,通过URL访问。
