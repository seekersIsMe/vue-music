<template>
  <transition name="slider">
    <musicList class="detail-wrapper" :imageUrl="singer.avatar" :title="singer.name" :songList="songList" @randomPlay="randomPlay"></musicList>
  </transition>
</template>
<style lang="less" scoped>
  @import "../../common/less/const";

  .slider-enter-active, &.slider-leave-active { //过渡的过程
    transition: all 0.5s linear;
  }

  .slider-enter, &.slider-leave-to { //显示开始和隐藏结束的状态
    transform: translate3d(100%, 0, 0);
  }

  .slider-enter-to, &.slider-leave { //显示结束的状态和隐藏开始的状态
    transform: translate3d(0, 0, 0)
  }

  .detail-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
    overflow: hidden;
    background-color: @color-background;
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import {mapActions} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import musicList from 'base/musicList/musicList'
  import {createSong} from 'common/js/song'
  import  {getSongUrl} from 'api/getSongUrl'
  import  {shuffle} from 'common/js/util'
  export default {
    data() {
      return {
        songList:[]
      }
    },
    created() {
      if(!this.singer.id){
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((result) => {
        if (result.code === ERR_OK) {
          console.log('歌手详细信息', result.data)
          this.songList=this.getMusicData(result.data.list);
          console.log('歌曲列表',this.songList)
        }
      })
    },
    computed: {
      ...mapGetters([
        'singer',
        ]
      )
    },
    methods:{
      randomPlay(){
        this.randomPlay_({
          list:this.songList.slice()
        });
      },
      getMusicData(list){
        let ret=[];
        list.forEach(function (p1) {
          getSongUrl(p1.musicData.songmid).then((result)=>{
            if(result.code===ERR_OK){
              ret.push(createSong(p1.musicData,result.data.items[0].vkey))
            }
          })
        })
        return ret
      },
      ...mapMutations({
        setPlaying: 'SET_PLAYING_STATE',
        setFull: 'SET_FULL_SCREEN',
        setPlayList: 'SET_PLAYLIST',
        setMode: 'SET_PLAY_MODE',
        setFavorite: 'SET_FAVORITE_LIST',
        setCurrentIndex:'SET_CURRENT_INDEX'
      }),
      ...mapActions([
        'randomPlay_'
      ])
    },
    components:{
      musicList
    }
  }
</script>
