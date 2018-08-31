<template>
  <div class="progress-contain" ref="progressContain" @click="selectPercent">
    <div class="progress" ref="progress"></div>
    <div class="progress-percent" ref="progressPercent"></div>
    <div class="progress-btn" ref="progressBtn"
         @touchstart.prevent="touchstartBtn"
         @touchmove.prevent="touchmoveBtn"
         @touchend="touchendBtn"
    ></div>
  </div>
</template>
<style lang="less">
  .progress-contain {
    width: 80%;
    flex: 0 80%;
    margin: 0 8px;
    position: relative;
    height: 40px;
    .progress {
      position: absolute;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      z-index: 1;
      top:50%;
      transform: translate3d(0,-50%,0);
    }
    .progress-btn {
      position: absolute;
      width: 16px;
      height: 16px;
      box-sizing: border-box;
      border: 3px solid #fff;
      background-color: #ffcd32;
      border-radius: 50%;
      z-index: 10;
      top:50%;
      transform: translate3d(0,-8px,0);
    }
    .progress-percent {
      background-color: #ffcd32;
      height: 4px;
      z-index: 5;
      width: 0px;
      position: absolute;
      left: 0;
      top:50%;
      transform: translate3d(0,-50%,0);
    }
  }
</style>
<script>
  import {prefixStyle} from 'common/js/dom'
  const transform=prefixStyle('transform');
export default {
props:{
  progressPercent:{
   type:Number,
   default:0
  }
},
  created(){
  this.touch={};
  },
  methods:{
    selectPercent(e){
      let pageX=e.pageX;
      let rect=this.$refs.progressContain.getBoundingClientRect();
      let barWidth=pageX-rect.left;
      this.moveDis(barWidth);
      this.touch.percent=barWidth/this.$refs.progress.clientWidth;
      this._triggerPercent();
    },
    touchstartBtn(e){
      this.touch.init=true;
      this.touch.startX=e.touches[0].pageX;
      this.touch.progressWidth=this.$refs.progress.clientWidth;
      this.touch.progressPercentWidth=this.$refs.progressPercent.clientWidth;
    },
    touchmoveBtn(e){
      if(!this.touch.init){
        return;
      }
      let pageX=e.touches[0].pageX;
      let cha=pageX-this.touch.startX;
      let barWidth=cha+this.touch.progressPercentWidth;
      if(barWidth>0){
        if(barWidth>this.touch.progressWidth){
          barWidth=this.touch.progressWidth;
        }
      }else{
        barWidth=0
      }
      this.touch.percent=barWidth/this.touch.progressWidth;
      this.moveDis(barWidth);
    },
    touchendBtn(e){
      this._triggerPercent();
      this.touch.init=false;
    },
    move(){
        let progressWidth=this.$refs.progress.clientWidth;
        let barWidth=progressWidth*this.progressPercent;
        this.moveDis(barWidth);
    },
    moveDis(barWidth){
      this.$refs.progressPercent.style.width=`${barWidth}px`;
      this.$refs.progressBtn.style[transform]=`translate3d(${barWidth-8}px,-50%,0)`;
    },
    _triggerPercent(){
        this.$emit('move',this.touch.percent)
    }
  },
watch:{
  progressPercent(newPercent){
    if(this.touch.init){
      return;
    }
    this.move()
  }
}
}
</script>
