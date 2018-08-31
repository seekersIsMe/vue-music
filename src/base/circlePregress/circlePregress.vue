<template>
  <div class="circlePregress">
    <div class="bg"></div>
    <div class="left overHidden">
      <div class="leftCircle" ref="left">

      </div>
    </div>
    <div class="right overHidden">
      <div class="rightCircle" ref="right">
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="less">
  @import "../../common/less/const";
  .circlePregress {
    position: relative;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: flex-start;
    .bg{
      position: absolute;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 2px solid @color-theme-d;
    }
    .overHidden {
      overflow: hidden;
      width: 18px;
      height: 36px;
      box-sizing: border-box;
    }
    .leftCircle {
      width: 36px;
      height: 36px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 2px solid @color-theme;
      border-right: 2px solid transparent;
      border-bottom: 2px solid transparent;
      transform: rotate(-45deg);
    }
    .rightCircle {
      width: 36px;
      height: 36px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 2px solid @color-theme;
      border-left: 2px solid transparent;
      border-bottom: 2px solid transparent;
      transform:translate3d(-18px,0,0) rotate(45deg);
    }
  }
</style>
<script>
  import {prefixStyle} from 'common/js/dom'
  const transform=prefixStyle('transform');
export  default {
  props:{
    precent:{
      type:Number,
      default:0
    }
  },
  watch:{
    precent(newPrecent){
      let deg;
      if(newPrecent<0.5){
        deg=360*newPrecent;
        this.$refs.right.style[transform]=`translate3d(-18px,0,0) rotate(${deg+45}deg)`;
        this.$refs.left.style[transform]=` rotate(-45deg)`;
      }else {
        deg=360*newPrecent-180;
        this.$refs.right.style[transform]=`translate3d(-18px,0,0) rotate(${180+45}deg)`;
        this.$refs.left.style[transform]=` rotate(${deg-45}deg)`;
      }
    }
  }
}
</script>
