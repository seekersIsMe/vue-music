<template>
  <div class="topList">
    <musicList class="detail-wrapper"
               :imageUrl="topList.picUrl"
               :title="topList.topTitle"
               :songList="listData"
               @randomPlay="randomPlay"
               :isRank="true"
    ></musicList>
    <div class="londing" v-show="!listData.length>0">
      <loading ></loading>
    </div>
  </div>
</template>
<style lang="less" scoped>
.topList{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .londing{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
  }
}
</style>
<script>
  import musicList from 'base/musicList/musicList'
  import {mapGetters,mapActions} from "vuex"
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import  {getSongUrl} from 'api/getSongUrl'
  import  loading from 'base/loading/loading'
export  default {
    data(){
      return {
        listData:[]
      }
    },
    created(){
        this._getTopList()
    },
  methods:{
    randomPlay(){
      this.randomPlay_({
        list:this.listData.slice()
      });
    },
      _getTopList(){
        if(!this.topList.id){
        this.$router.push({
          path:'/rankings'
        })
        }
        getMusicList(this.topList.id).then((result)=>{
          if(ERR_OK===result.code){
            this.listData=this.getMusicData(result.songlist)
          }
        })
      },
    getMusicData(list){
      let ret=[];
      list.forEach(function (p1) {
        getSongUrl(p1.data.songmid).then((result)=>{
          if(result.code===ERR_OK){
            ret.push(createSong(p1.data,result.data.items[0].vkey))
          }
        })
      })
      return ret
    },
    ...mapActions([
      'randomPlay_'
    ])
  },
  computed:{
    ...mapGetters([
      'topList'
    ])
  },
  components:{
    musicList,
    loading
  }
}
</script>
