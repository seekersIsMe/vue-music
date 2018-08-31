<template>
<div class="disc-wrapper">
  <musicList :title="getTitle" :imageUrl="getImageUrl" :songList="songList" @randomPlay="randomPlay"></musicList>
</div>
</template>
<style lang="less" scoped>
  .disc-wrapper{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
</style>
<script>
  import musicList from 'base/musicList/musicList'
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import  {getSongUrl} from 'api/getSongUrl'
  import {createSong} from 'common/js/song'
export default{
  props:{},
  data(){
    return {
      songList:[
      ]
    }
  },
  created(){
    if(!this.disc.dissid)   {
      this.$router.push('/recommend')
      return
    }
    getSongList(this.disc.dissid).then((result)=>{
      if(result.code===ERR_OK){
        this.songList=this.getMusicData(result.cdlist[0].songlist)
      }
    })
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
        getSongUrl(p1.songmid).then((result)=>{
          if(result.code===ERR_OK){
            ret.push(createSong(p1,result.data.items[0].vkey))
          }
        })
      })
      return ret
    },
    ...mapActions([
      'randomPlay_',
    ])
  },
  computed:{
    getTitle(){
      return this.disc.dissname
    },
    getImageUrl(){
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  components:{
    musicList
  }
}
</script>
