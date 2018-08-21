<template>
<div class="slider" ref="slider">
    <div class="body-slider" ref="bodySlider">
      <slot></slot>
    </div>
  <div class="dots" v-if="dots.length">
    <div v-for="(item ,index) in dots" class="dots-item" :class="{'dots-active':currentPageIndex===index}"></div>
  </div>
</div>
</template>
<style lang="less" scoped type="text/less">
  @import "../../common/less/const";
    .slider{
      position: relative;
      .body-slider{
        overflow: hidden;
        .slider-item{
          float: left;
          a{
            display: block;
            width: 100%;
            img{
              /*这里的图片不能设置成block，不让better-scroll会报错，不知道这是个什么吊插件*/
              display: inline-block;
              width: 100%;
            }
          }
        }
      }
      .dots{
        position: absolute;
        left: 0;
        bottom:10px;
        width: 100%;
        display: flex;
        justify-content: center;
        .dots-item{
          width: 8px;
          height: 8px;
          border-radius:50%;
          background: rgba(255,255,255,0.5);
          margin-left: 10px;
        }
        .dots-active{
          width: 20px;
          border-radius: 5px;
          background: @color-text-ll
        }
      }

    }
</style>
<script>
  import BScroll from 'better-scroll';
  import {addClass} from 'common/js/dom'
  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDot: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      this.update()
      window.addEventListener('resize', () => {
        if (!this.slider || !this.slider.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slider.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slider) {
        return
      }
      this.slider.enable()
      //获取pageIndex
      let pageIndex = this.slider.getCurrentPage().pageX
      //goToPage 轮播到第几页
      this.slider.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slider.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slider.disable()
      clearTimeout(this.timer)
    },
    methods: {
      update() {
        if (this.slider) {
          this.slider.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSlideWidth(true)
        this.slider.refresh()
      },
      prev() {
        this.slider.prev()
      },
      next() {
        this.slider.next()
      },
      init() {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSlideWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlide()
        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideWidth(isResize) {
        this.children = this.$refs.bodySlider.children
        let width = 0
        let slideWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = slideWidth + 'px'
          width += slideWidth
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        this.$refs.bodySlider.style.width = width + 'px'
      },
      _initSlide() {
        console.log(this.threshold)
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
        this.slider.on('scrollEnd', this._onScrollEnd)
        this.slider.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        })
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
    },
    watch: {
      loop() {
        this.update()
      },
      autoPlay() {
        this.update()
      },
      speed() {
        this.update()
      },
      threshold() {
        this.update()
      }
    }
  }
</script>
