<template>
  <ul>
    <li v-for="(item,index) in songs" @click="selectSong(item,index)">
      <div class="icon" v-show="isRank" :class="icon(index)" v-html="getTxt(index)">

      </div>
      <div class="wrapper-song">
        <div class="name">
          {{item.name}}
        </div>
        <div class="song-msg">
          <span class="singer">{{item.singer}}</span>
          <span class="album">{{item.album}}</span>
        </div>
      </div>

    </li>
  </ul>
</template>
<style lang="less" scoped>
  @import "../../common/less/const";
  @import "../../common/less/mixin";
li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  font-size: @font-size-medium;
  overflow: hidden;
  box-sizing: border-box;
  .icon{
    line-height: 24px;
    text-align: center;
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    &.icon0{
      .bg_img('../../base/songList/first')
     }
    &.icon1{
    .bg_img('../../base/songList/second')
    }
    &.icon2{
      .bg_img('../../base/songList/third')
    }
  }
  .wrapper-song{
    flex: 1;
    padding: 0 20px;
    overflow: hidden;
    box-sizing: border-box;
    .name{
      color: @color-text;
      margin-bottom: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: calc(100vw - 40px);
      height: 20px;
      box-sizing: border-box;
    }
    .song-msg{
      span{
        color:@color-text-d;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

}
</style>
<script>
export default {
  props:{
    songs:{
      type:Array,
      default:null
    },
    isRank:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    icon(index){
      if(index<3){
        return `icon${index}`
      }
    },
    getTxt(index){
      if(index>2){
        return index
      }
    },
    selectSong(item,index){
      this.$emit('selectSong',item,index)
    }
  },
  mounted(){
//    setTimeout(()=>{
//      console.log('h==a',this.songs)
//    },2000)
  }
}
</script>
