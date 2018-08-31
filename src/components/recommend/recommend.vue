<template>
  <div class="recommend-wrapper" ref="recommend">
    <scroll class="oneElement" :data="hotList" ref="recommendScroll">
      <div>
        <!--v-if确保数据拿到后，再去执行slider组件的钩子函数（mounted）-->
        <div class="slider-wrapper" v-if="slider.length">
          <slider>
            <div v-for="(item,index) in slider" >
              <a :href="item.linkUrl">
                <!--better-scroll和fastclick（阻止better-scroll的点击）点击冲突的时候，将需要点击的dom加上needsclick-->
                <img :src="item.picUrl" class="needclick" alt="">
              </a>
            </div>
          </slider>
        </div>
        <h2>热门歌单推荐</h2>
        <div class="hotRecommend-wrapper" v-if="hotList.length">
          <div v-for="item in hotList" class="hot-item" @click="goToSongList(item)">
            <div class="icon">
              <img v-lazy="item.imgurl" alt="">
            </div>
            <div class="text">
              <p class="name" v-html="item.creator.name"></p>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="loading-wrapper" v-show="!hotList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view ></router-view>
  </div>
</template>
<style lang="less">
  @import "../../common/less/const";
.recommend-wrapper{
  width: 100%;
  position: fixed;
  top:88px;
  bottom: 0;
  overflow: hidden;
  .oneElement{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    .loading-wrapper{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .slider-wrapper{
    width: 100%;
  }
  h2{
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 14px;
    color: @color-theme;
  }
  .hotRecommend-wrapper{
    .hot-item{
      display: flex;
      justify-content: flex-start;
      padding: 10px 20px;
      box-sizing: border-box;
      height: 80px;
      .icon{
        img{
          display: inline-block;
          width: 60px;
          height: 60px;
        }
      }
      .text{
        padding: 10px 0px;
        margin-left: 10px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .name{
          color: #fff;
        }
        .desc{
          color: @color-text-d;
        }
      }
    }
  }

}
</style>
<script>
  import {getRecommend,getDiscList} from 'api/recommend';
  import {ERR_OK} from 'api/config';
  import slider from 'base/slider/slider';
  import scroll from 'base/scroll/scroll';
  import loading from 'base/loading/loading'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
export default {
  mixins:[playlistMixin],
    data(){
      return{
        slider:[],
        hotList:[]
      }
    },
  methods:{
    ...mapMutations({
      setDisc:'SET_DISC'
    }),
    goToSongList(item){
      this.$router.push({
        path:`/recommend/${item.dissid}`
      })
      this.setDisc(item)
      console.log('歌单',item)
    },
    handlePlaylist(playList){
      let bottom=playList.length>0?'60px':'';
      this.$refs.recommend.style.bottom=bottom;
      this.$refs.recommendScroll.refresh();
    },
    _getRecommend(){
      getRecommend().then((result)=>{
        if(ERR_OK===result.code){
          console.log('轮播数据%o',result.data)
          this.slider=result.data.slider
        }
      })
    },
    _getDiscList(){
      getDiscList().then((result)=>{
        if(ERR_OK===result.code){
          console.log('热门歌单推荐%o',result.data)
          this.hotList=result.data.list;
        }
      })
    }
  },
  created(){
   this._getRecommend();
    this._getDiscList();
  },
  components:{
    slider,
    scroll,
    loading
  }
}
</script>
