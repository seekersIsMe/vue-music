<!--使用注意-->
<!--1.scroll的高度要小于其子元素-->
<template>
<div ref="scroll">
  <slot></slot>
</div>
</template>
<style >

</style>
<script>
  import BScroll from 'better-scroll'
export default {
  props:{
    probeType:{
      type:Number,
      default:1
    },
    click:{
      type:Boolean,
      default:true
    },
    data:{
      type:Array,
      detault:null
    },
    listenScroll:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    //其实这里做延时也不一定保证dom完全渲染
    setTimeout(()=>{
      this.$nextTick(()=>{
        this.refreshScroll();
        this.initScroll();
      })
    },20)
  },
  methods:{
    initScroll(){
      //这里需要做下判断，有可能this.$refs.scroll还没有渲染出来
      if(!this.$refs.scroll){
        return
      }
      this.scroll=new BScroll(this.$refs.scroll,{
        probeType:this.probeType,
        click:this.click
      })
      if(this.listenScroll){
        let _this=this;
        this.scroll.on('scroll',(pos)=>{
          _this.$emit('scroll',pos)
        })
      }
    },
    refreshScroll(){
      if(this.scroll){
        this.scroll.refresh();
      }
    },
    //将better-scroll的scrollTo和scrollToElement两个方法添加到该组件上，方便在外层组件中调用
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  },
  watch:{
    data(){
      this.refreshScroll();
    }
  }
}
</script>
