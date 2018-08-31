<template>
<div class="rank-wrapper" ref="rank">
  <scroll :data="topList" class="rank-list" :probeType="3" :listenScroll="true"  ref="rankListScroll">
    <ul class="rankList" v-if="topList">
      <li v-for="item in topList" @click="goToTopList(item)">
        <div class="img">
          <img v-lazy="item.picUrl" alt="">
        </div>
        <div class="text">
          <p v-for="(text,index) in item.songList">{{index+1}}.{{text.songname}}-{{text.singername}}</p>
        </div>
      </li>
    </ul>
  </scroll>
  <router-view></router-view>
</div>
</template>
<style lang="less" scoped>
  @import "../../common/less/const";
.rank-wrapper{
  position: fixed;
  top:88px;
  bottom: 0;
  left: 0;
  right: 0;
  .rank-list{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .rankList{
      li{
        height: 100px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        .img{
          flex:0 0 100px;
          height: 100px;
          img{
            display: inline-block;
            height: 100px;
            width: 100px;
          }
        }
        .text{
          flex:1;
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding: 10px 20px;
          background-color:@color-highlight-background;
          box-sizing: border-box;
          font-size: 12px;
          color: @color-text-d;
          overflow: hidden;//todo 注意加
          p{
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            line-height: 26px;

          }
        }
      }
    }
  }
}
</style>
<script>
  import scroll from 'base/scroll/scroll'
  import {getTopList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
export default {
    mixins:[playlistMixin],
    data(){
      return {
        topList:[]
      }
    },
    created(){
      this._getTopList();
    },
  methods:{
    handlePlaylist(playlist){
      let bottom=playlist.length>0?'60px':''
      this.$refs.rank.style.bottom=bottom;
      this.$refs.rankListScroll.refresh();
    },
    goToTopList(item){
      this.$router.push({
        path:`/rankings/${item.id}`
      })
      console.log(item)
      this.setTopList(item);
    },
    _getTopList(){
      getTopList().then((result)=>{
        console.log('排行榜',result)
        if(result.code===ERR_OK){
          this.topList=result.data.topList
        }
      })
    },
    ...mapMutations({
      setTopList:'SET_TOP_LIST'
    })
  },
  components:{
    scroll
  }
}
</script>
