<template>
  <div class="singer">
    <listView :data="singerList" @linkTO="selectSinger"></listView>
    <div class="loading-wrapper" v-show="!singerList.length">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
.singer{
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  .loading-wrapper{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
<script>
  import {getSingerList, getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config';
  import singer from 'common/js/singer'
  import listView from 'component/listview/listview'
  import loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  const HOTSINGERLIST_LEN = 10, HOTSINGERTITLE = '热门'
  export default {
    data() {
      return {
        singerList: [],
      }
    },
    created() {
      this._getSingerList();
    },
    methods: {
      selectSinger(data){
        console.log(data)
        this.$router.push({
          path:`/singer/${data.id}`
        })
        console.log(data)
        this.setSinger(data);
      },
      _getSingerList() {
        getSingerList().then((result) => {
          if (ERR_OK === result.code) {
            this._normalSingerList(result.data.list);
          }
        })
      },
      _normalSingerList(list) {
       let lastList = {
         hot:{
           title:HOTSINGERTITLE,
           dataAry:[]
         }
       }
        list.forEach(function (p1, index) {
          if (index < HOTSINGERLIST_LEN) {
            lastList.hot.dataAry.push(new singer({
                name: p1.Fsinger_name,
                id: p1.Fsinger_mid
              }
            ))
          }
          const key =p1.Findex;
          if(!lastList[key]){
            lastList[key]={
              title:key,
              dataAry:[]
            }
          }
          lastList[key].dataAry.push(new singer({
            name: p1.Fsinger_name,
            id: p1.Fsinger_mid
          }))
          let ret = []
          let hot = []
          for (let key in lastList) {
            let val = lastList[key]
            if (val.title.match(/[a-zA-Z]/)) {
              ret.push(val)
            } else if (val.title === HOTSINGERTITLE) {
              hot.push(val)
            }
          }
          ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
          })
          this.singerList=hot.concat(ret)
        }.bind(this))
      },
      // 将自定义的setSinger方法和Mutations里面的定义的SET_SINGER方法做映射
      ...mapMutations({
        // 将自定义的setSinger方法和Mutations里面的定义的方法做映射
        setSinger: 'SET_SINGER'
      })

    },
    components:{
      listView,
      loading
    }
  }
</script>
