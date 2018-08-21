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
    this.$nextTick(()=>{
      this.refreshScroll();
      this.initScroll();
    })
  },
  methods:{
    initScroll(){
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
    _toScrollElement(){
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch:{
    data(){
      this.refreshScroll();
    }
  }
}
</script>
