webpack 5 学习
# 目标1： 转化 js 为大部分浏览器都支持的
1. 初始化
```bash
yarn init -y
```
2. 查看 webpack 版本号
```bash
npm info webpack versions
yarn add --dev webpack@5.0.0-beta.29
yarn add --dev webpack-cli@4.0.0-beta.8
```
3. 创建 src/index.js

4. 第一次编译
```bash
./node_modules/.bin/webpack
```
根据提示添加 mode 参数
 development: 开发模式，添加了一堆注释，__require__ 之类的东西
 production: 生产模式，非常简介
 
如何回答「A」和「B」的区别是什么
- A 是什么
- B 是什么
- A 的优缺点
- B 的优缺点
eg. mode 为 development 和 production 的区别是什么
    development 是启用开发模式，production 是启用生产模式。
    development 优点：速度比较快，因为不用分析代码。
                缺点：是代码注释比较多，不容易看清代码结构。
    production 优点：把代码所有注释删了，很简介。
               缺点：慢，要做代码分析。
               
eg. devtool 为 eval 和 false 的区别是什么
    eval 在代码中加入 eval，false 不开启其他功能。
    eval 优点：在使用 chrome devtools 体验更好，因为每个 eval 都会生成一个单独文件
    false 少了 eval，和一段代码注释。
          缺点：在使用 chrome devtools 时候没有单独文件。
            
7. webpack 是怎么处理依赖的。
开发：依赖放在 eval 中，使用 require 包起来。
生产：全部写到文件里，然后互相引用。

8. 什么是 Tree Shaking
webpack 通过代码分析之后，把没有用到的依赖删掉。

9. entry 为什么 src/main.js 不行，./src/main.js 可以。
没有为什么， webpack 就是这样设计的。
因为 ./src/main.js 是相对路径，而 src/main.js 会去 node_modules 中找。

10. splitChunks 的属性是做什么的
splitChunks 是做代码抽离的
minSize: 20000 多少字节的文件才抽离出来
minChunks: 1   被多少 chunk 共享才抽离出来
chunks: 'async'|'initial'|'all'|函数 
chunks 分析要优化哪些 chunk
  - all 优化所有
  - initial 只优化 entry
  - async 只把异步加载的放入 commons

11. 为什么要提取公共依赖。
假设 a.html 引用了 a.js
假设 b.html 引用了 b.js
假设 a.js 和 b.js 都引用了 30kb 的 react.js
如果用户先访问 a.html,然后访问 b.html
那么
用户访问 a.html 的时候下载 a.js 有 30kb+，然后 a.js 被浏览器缓存
用户访问 b.html 的时候下载 b.js 有 30kb+，然后 b.js 被浏览器缓存
用户一共下载 60kb+ 的内容
显然 react.js 被下载了两次，而且没有缓存。

解决方案：
把 react.js 单独放到 common.js
那么
用户访问 a.html 的时候下载 a.js 和 common.js,然后 a.js 和 common.js 被浏览器缓存
用户访问 a.html 的时候下载 b.js,不下载 common.js,然后 b.js 被浏览器缓存
用户一共下载 30kb+ 的内容

所以，我们节省了一次下载 common.js 的带宽，react.js 就在它里面，约 30kb。

缺点是 html 需要单独引用 common.js

任务5：
兼容 IE11
- babel 并安装插件
- webpack 还需要配置 ecmaVersion

**两个问题：JS 缓存如何更新，html 为什么不能缓存**



