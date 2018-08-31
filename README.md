# vue-mussic

1.fastclick 解决300ms
2.babel-runtime 对es6做转义
3.babel-polyfill  对es6的api做转义


tip.
1.babel-polyfill 比较适合 自己的整个工程，底层也是core-js，能使用所有的新API。
2.babel-runtime 适合库和框架，针对使用到的新API 会提出打包到 build 文件中。
3.runtime 适合不修改对象自身的属性和方法，比如扩展一个方法， Object.assign, 而 polyfill 是整个打补丁，适合 String.propotype.include 这样的

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
> 这是一个音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
