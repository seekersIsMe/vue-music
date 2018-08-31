<template>
  <div class="music-wrapper">
    <div class="title">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <p class="name">{{title}}</p>
    </div>
      <div class="bg-img" ref="bgImg">
        <p class="random-play" v-show="songList.length" ref="playBtn" @click="randomPlay">
          <i class="icon-play"></i>
          <span>随机播放</span>
        </p>
      </div>
    <div class="songList-wrapper" ref="songList">
      <scroll :data="songList" class="music-list" :probeType="3" :listenScroll="true" @scroll="bgMove" ref="songListScroll">
        <songsList :songs="songList" @selectSong="selectSong" :isRank="isRank"></songsList>
      </scroll>
      <!--<div class="londing">-->
        <!--<loading v-show="!songList.length>0"></loading>-->
      <!--</div>-->
    </div>
    <div class="bgMove" ref="bgMove">

    </div>
  </div>
</template>
<style lang="less">
  @import "../../common/less/const";
  @import "../../common/less/mixin";
  /*注意设置背景色*/
  .music-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    .title {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 200;
      overflow: hidden;
      .back {
        margin-left: 20px;
        display: inline-block;
        line-height: 40px;
        vertical-align: middle;
        color:@color-theme ;
      }
      .name {
        display: inline-block;
        line-height: 40px;
        vertical-align: middle;
        color: @color-text;
        font-size: @font-size-large;
        text-align: center;
        width: 80%;
      }
    }
      .bg-img {
        width: 100%;
        height: 0;
        padding-top: 70%;
        box-sizing: border-box;
        position: relative;
        background-size: cover;
        .random-play {
          position: absolute;
          width: 135px;
          line-height: 32px;
          bottom:20px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 16px;
          border: 1px solid @color-theme;
          color: @color-theme;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            margin-left: 10px;
          }
        }
      }

    .songList-wrapper{
      position: absolute;
      top:70vw;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      background-color: @color-background;
      .music-list{
        width: 100%;
        height: 100%;
        ul{
          background-color: @color-background;
        }
      }
    }
    .bgMove{
      position: absolute;
      top:70vw;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 40;
      background-color: @color-background;;
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import {mapActions} from 'vuex'
  import scroll from 'base/scroll/scroll'
  import songsList from 'base/songList/songList'
  import {prefixStyle} from 'common/js/dom'
  import {playlistMixin} from 'common/js/mixin'
  import loading from 'base/loading/loading'
  const transform=prefixStyle('transform')
  export default {
    mixins:[playlistMixin],
    props: {
      songList: {
        type: Array,
        default: null
      },
      title:{
        type:String,
        default:''
      },
      imageUrl:{
        type:String,
        default:''
      },
      isRank:{
        type:Boolean,
        default:false
      }
    },
    computed: {
//      getAvatar() {
//        return this.singer.avatar
//      },
//      getName() {
//        return this.singer.name
//      },
      ...mapGetters([
        'singer',
        'playlist'
      ])
    },
    mounted(){
      this.bgImgHeight=this.$refs.bgImg.clientHeight
      this.setBgImg();
    },
    methods: {
      handlePlaylist(playList){
        let bottom=playList.length>0?'60px':'';
        this.$refs.songList.style.bottom=bottom;
        this.$refs.songListScroll.refresh();
      },
      randomPlay(){
        this.$emit('randomPlay')
      },
      bgMove(pos){
        let move=Math.abs(pos.y);
        let scale=1
        if(pos.y<0){
            if(move<this.bgImgHeight-40){
              this.$refs.bgMove.style[transform]=`translate3d(0,${pos.y}px,0)`
              this.$refs.bgImg.style.paddingTop = '70%';
              this.$refs.bgImg.style.height = 0+`px`
              this.$refs.bgImg.style.zIndex=0;
              this.$refs.playBtn.style.display='flex'
            }else{
              this.$refs.bgImg.style.paddingTop = 0;
              this.$refs.bgImg.style.height = 40+`px`
              this.$refs.bgImg.style.zIndex=150;
              this.$refs.playBtn.style.display='none'
            }
          scale=1;
          this.$refs.bgImg.style[transform] = `scale(${scale})`
          }else{
          scale=(this.bgImgHeight+move)/this.bgImgHeight;
            this.$refs.bgImg.style.paddingTop = '70%';
            this.$refs.bgImg.style.height = 0+`px`
            this.$refs.bgImg.style.zIndex=0;
            this.$refs.playBtn.style.display='flex'
            this.$refs.bgImg.style[transform] = `scale(${scale})`
            this.$refs.bgMove.style[transform]=`translate3d(0,${pos.y}px,0)`
          }
      },
      back() {
        this.$router.back()
      },
      setBgImg(){
        this.$refs.bgImg.style.backgroundImage=`url(${this.imageUrl})`
      },
      selectSong(item,index){
        //派发action
        this.selectPlay({
          list:this.songList.slice(),
          index:index
        })
//        this.setPlaying(true)
//        this.setFull(true)
//        //Do not mutate vuex store state outside mutation handlers.报错
//        this.setPlayList(this.songList.slice())
////        this.$store.commit('SET_PLAYLIST',this.songList)
//        this.setCurrentIndex(index)
      },
      ...mapMutations({
        setPlaying:'SET_PLAYING_STATE',
        setFull:'SET_FULL_SCREEN',
        setPlayList:'SET_PLAYLIST',
        setCurrentIndex:'SET_CURRENT_INDEX'
      }),
      ...mapActions([
        'selectPlay'
      ])
    },
    components: {
      scroll,
      songsList,
      loading
    }
  }
</script>
