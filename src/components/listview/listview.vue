<template>
  <scroll :data="data" :listenScroll="true" :probeType="3" class="listView" ref="listView" @scroll="onListViewMove">
    <div class="listView-wrapper">
      <div v-for="item in data" ref="listGroup">
        <h2 class="title">{{item.title}}</h2>
        <ul class="list-ul">
          <li v-for="item1 in item.dataAry" class="li-item" @click="onlinkTo(item1)">
            <img v-lazy="item1.avatar" alt="">
            <p class="name">{{item1.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="list-shortcut" @touchstart="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
      <ul>
        <li v-for="(item,index) in data" :data-index="index" :class="{'active':currentIndex===index}">
          {{item.title.match('/[a-zA-Z]/') ? item.title : item.title.substr(0, 1)}}
        </li>
      </ul>
    </div>
    <div class="fixTitle" ref="title">
      {{getTitle}}
    </div>
  </scroll>
</template>
<style lang="less" scoped>
  @import "../../common/less/const";

  .listView {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .title {
      font-size: @font-size-small;
      color: @color-text-l;
      line-height: 30px;
      padding-left: 20px;
      background-color: #333;
    }
    .list-ul{
      padding-bottom: 20px;
    }
    .li-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 20px;
      margin-top: 20px;
      img {
        display: inline-block;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        line-height: 50px;
      }
      p {
        display: inline-block;
        color: @color-text-l;
        font-size: @font-size-medium;
        margin-left: 20px;
        /*line-height: 50px;*/
      }
    }
    .list-shortcut {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      background-color: @color-background-d;
      padding: 30px 0px;
      box-sizing: border-box;
      text-align: center;
      border-radius: 10px;
      li {
        line-height: 18px;
        font-size: @font-size-small;
        color: @color-text-l;
      }
      .active {
        color: @color-theme;
      }
    }
    .fixTitle{
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      font-size: @font-size-small;
      color: @color-text-l;
      line-height: 30px;
      padding-left: 20px;
      background-color: #333;
    }
  }
</style>
<script>
  import Scroll from 'base/scroll/scroll';
  import {playlistMixin} from 'common/js/mixin'
  const HEIGHT = 18,TITLEH_HEIGHT=30;
  export default {
    mixins:[playlistMixin],
    created() {
      //这个数据不需要做观测，所以不需要加到data和props中后会加get和set方法，做数据的绑定
      this.touch = {}
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0,
        accumulateHeight: [],
        scrollY:-1,
      }
    },
    mounted() {
      //模版编译/挂载之后，但是不保证组件已经在document中
    },
    computed:{
      getTitle(){
       if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      handlePlaylist(playList){
        let bottom=playList.length>0?'60px':'';
        this.$refs.listView.$el.parentNode.style.bottom=bottom;
        this.$refs.listView.refresh();
      },
      onlinkTo(data){
        this.$emit('linkTO', data)
      },
      onListViewMove(pos) {
        this.scrollY=pos.y;
        if(pos.y>0){
          this.currentIndex=0
          return
        }
        let y = -pos.y;
        console.log(y)
        for (let i = 0, len = this.accumulateHeight.length; i < len; i++) {
          if (y < this.accumulateHeight[i + 1] && y > this.accumulateHeight[i]) {
            this.currentIndex = i;
            return
          }
        }
      },
      onShortCutTouchStart(e) {
        let index = parseInt(e.target.getAttribute('data-index'));
        let begin = e.touches[0];
        console.log(e.touches)
        this.touch.y1 = begin.pageY;
        this.touch.beginIndex = index;
        this.currentIndex = index;
        this.$refs.listView.scrollToElement(this.$refs.listGroup[index]);
      },
      onShortCutTouchMove(e) {
        let move = e.touches[0];
        this.touch.y2 = move.pageY;
        let gapIndex = (this.touch.y2 - this.touch.y1) / HEIGHT | 0,
          goToIndex = gapIndex + this.touch.beginIndex;
        this.currentIndex = goToIndex;
        this.$refs.listView.scrollToElement(this.$refs.listGroup[goToIndex]);
      },
      _computeHeight() {
        let heightList = [], accumulateHeight = [0];
        this.$refs.listGroup.forEach((p1, index) => {
          heightList.push(p1.clientHeight)
        })
        heightList.forEach((p1, index) => {
          if (index == 0) {
            accumulateHeight.push(p1)
          } else {
            accumulateHeight.push((accumulateHeight[index] + p1))
          }
        })
        this.accumulateHeight = accumulateHeight;
      }

    },
    watch: {
      //在data初始化的时候或者变化的时候计算各个groupList的高度累加,但是数据的变化映射到dom的变化时需要一定的时间
      data() {
        setTimeout(()=>{
          this._computeHeight();
        },20)
      },
      scrollY(){
        if(this.scrollY<0){
          //因为第一个this.accumulateHeight为0，所以index加一
          let move=this.accumulateHeight[this.currentIndex+1]+this.scrollY;
          if(move<=TITLEH_HEIGHT){
            this.$refs.title.style.transform=`translateY(-${TITLEH_HEIGHT-move}px)`
          }else{
            this.$refs.title.style.transform=`translateY(0)`
          }
        }
      }
    },
    components: {
      Scroll,
    }
  }
</script>
