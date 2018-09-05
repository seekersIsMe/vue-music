> **高仿qq音乐播放器**

# 插件
1. better-scroll滚动插件
2. vue-lazyload图片懒加载
3. fastclick移动端点击
4. lyric-parser歌词播放插件
5. jsonp请求插件 jsonp
6. js-base64 base64数据转码 
7. good-storage localstorage本地缓存
8. vconsole 移动端调试工具
9. create-keyframe-animation js实现css3动画
10. 抓包工具
    * 苹果：charles;
    * 安卓 ：AndroidHttpCapture安装包
    * window:Fiddler
    
# tip

* fastclick 解决300ms
* babel-runtime 对es6做转义
* babel-polyfill  对es6的api做转义
  1 babel-polyfill 比较适合 自己的整个工程，底层也是core-js，能使用所有的新API。
  2. babel-runtime 适合库和框架，针对使用到的新API 会提出打包到 build 文件中。
  3. runtime 适合不修改对象自身的属性和方法，比如扩展一个方法， Object.assign, 而 polyfill 是整个打补丁，适合 String.propotype.include 这样的

# better-scroll
* 如果要实时监听scroll事件，需要将protype设置为3
* 新的better-scroll版本的轮播图的配置变成
    ````
    this.slider = new BScroll(this.$refs.slider, {
              scrollX: true,
              scrollY: false,
              momentum: false,
              snap: {
                loop: this.loop,
                threshold: this.threshold,
                speed: this.speed
              },
              bounce: false,
              stopPropagation: true,
              click: this.click
            })
    ````

# 生命周期
* mounted
  * 模版编译/挂载之后，但是不保证组件已经在document中
  * 用watch监控data的变化，映射到dom的变化，需要做20ms的延时操作，像dom的获取
  
# vuex
  * mapActions传参为数组
  * mapGetters传参为数组
  * mapMutations传参为对象


