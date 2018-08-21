<template>
  <div class="singer">
    <listView :data="singerList"></listView>
  </div>
</template>
<style lang="less" scoped>
.singer{
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
<script>
  import {getSingerList, getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config';
  import singer from 'common/js/singer'
  import listView from 'component/listview/listview'

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
      _getSingerList() {
        getSingerList().then((result) => {
          if (ERR_OK === result.code) {
            this._normalSingerList(result.data.list);
            console.log('歌手数据%o', this.singerList)
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

    },
    components:{
      listView
    }
  }
</script>
