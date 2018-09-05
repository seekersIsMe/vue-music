<template>
<div class="hotSearch" >
  <h2 class="title">热门搜索</h2>
  <ul>
    <li v-for="item in hotList" v-html="item" @click="selectHotKey(item)">
    </li>
  </ul>
</div>
</template>
<style lang="less">
  .hotSearch{
    position: absolute;
    top:168px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    h2{
      margin-bottom: 20px;
      font-size: 14px;
      color: hsla(0,0%,100%,.5);
    }
    li{
      display: inline-block;
      padding: 5px 10px;
      margin: 0 20px 10px 0;
      border-radius: 6px;
      background: #333;
      font-size: 14px;
      color: hsla(0,0%,100%,.3)
    }
  }
</style>
<script>
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
export default {
  data(){
    return {
      hotList:[]
    }
  },
  created(){
    this._getHotList()
  },
  methods:{
    selectHotKey(txt){
      this.$emit('selectHotKey',txt)
    },
    _getHotList(){
      getHotKey().then((res)=>{
        if(res.code===ERR_OK){
          res.data.hotkey.forEach((p1,index)=>{
            if(index<10){
              this.hotList.push(p1.k)
            }
          })
        }
      })
    }

  }
}
</script>
