<!--搜索页面-->
<template>
<div class="search-wrapper">
  <searchInput :placeholder="placeholder" @queryChange="queryChange" ref="input"></searchInput>
  <hotSearch @selectHotKey="selectHotKey"></hotSearch>

  <div class="searchResult-wrapper" v-show="searchResultList.length>0" ref="searchResult">
    <scroll :data="searchResultList" ref="scroll" class="scroll">
      <searchResult :searchResultList="searchResultList" @selectSearch="selectSearch">  </searchResult>
    </scroll>
  </div>
  <router-view></router-view>
</div>
</template>
<style lang="less">
.searchResult-wrapper{
  position: absolute;
  top:168px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #222;
  padding-top: 20px;
  .scroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
<script>
import searchInput from 'base/searchInput/searchInput';
import hotSearch from 'component/hotSearch/hotSearch'
import searchResult from 'component/searchResult/searchResult'
import {ERR_OK} from 'api/config'
import {getSearchList} from 'api/search'
import  {getSongUrl} from 'api/getSongUrl'
import {throttle} from 'common/js/util'
import scroll from 'base/scroll/scroll'
import {createSong} from 'common/js/song'
import {mapMutations,mapActions} from  'vuex'
import singer from 'common/js/singer'
import {playlistMixin} from 'common/js/mixin'
const perpage = 20;
export default {
  mixins:[playlistMixin],
  data(){
    return {
      placeholder:'搜索歌曲、歌手',
      searchResultList:[],
      query:'',
      zhida:true,
      page:1,
    }
  },
  created(){
    //每当query发生变化，都会向this.getSearchResult传入新值
    this.$watch('query', throttle(
      this.getSearchResult
    , 200))
  },
  methods:{
    handlePlaylist(playlist){
      let bottom=playlist.length>0?'60px':'0px'
        this.$refs.searchResult.style.bottom=bottom
        this.$refs.scroll.refresh();
    },
    selectSearch(item){
      console.log(item)
      if(item.type==='singer'){
        //点击歌手，跳转到歌手详情页面
        this.$router.push({
          path:`/search/${item.item.id}`
        })
        this.setSinger(item.item)
      }else {
        //点击歌曲，直接播放，修改state
        this.clickSearchSong(item.item)
      }
    },
    selectHotKey(item){
      this.$refs.input.setQuery(item)
    },
    queryChange(newQuery){
      this.query=newQuery
//      throttle((newQuery)=>{
//        this.getSearchResult()
//      },200)
    },
    getSearchResult(key){
      getSearchList(key,this.page,this.zhida,perpage).then((res)=>{
        console.log('搜索结果原始数据',res.data)
          this.searchResultList=this._normalSearchResult(res.data);
        console.log('搜索结果数据',this.searchResultList)
      })
    },
    _normalSearchResult(data){
      if(!data){
        return []
      }
      let ary=[];
      //返回的歌手数据可能没有singermid
      if(data.zhida&&data.zhida.type&&data.zhida.singermid){
        ary.push({
          item:new singer({
            id:data.zhida.singermid,
            name:data.zhida.singername
          }),
          type:'singer'
        })
      }

      data.song.list.forEach((p1)=>{
        getSongUrl(p1.songmid).then((result)=>{
          //返回的数据，有可能vkey为空
          if(result.code===ERR_OK&&result.data.items[0].vkey){
            ary.push({
              item:createSong(p1,result.data.items[0].vkey),
              type:'song'
            })
          }
        })

      })
      return ary;
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'clickSearchSong'
    ])
  },
  watch:{
    searchResultList(){
    this.$refs.scroll.refresh();
    }

  },
  components:{
    searchInput,
    hotSearch,
    searchResult,
    scroll
  }
}
</script>
