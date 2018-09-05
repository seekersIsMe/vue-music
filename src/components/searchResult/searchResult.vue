<template>
<!--
search_result__icon_song
search_result__icon_singer
//只做歌手的歌曲列表和歌手列表
-->
<div class="searchResultList">
  <ul>
    <li v-for="item in searchResultList" @click="selectSearch(item)">
      <i :class="getIconClass(item)"></i>
      <span>
      {{item.item.name}}
      </span>
    </li>
  </ul>
</div>
</template>
<style lang="less">
.searchResultList{
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;

  li{
    width: 100%;
    line-height: 16px;
    margin-bottom: 20px;
    display: flex;
    i{
      flex:0 0 16px;
      display: inline-block;
      width: 16px;
      height: 16px;
    }
    span{
      display: inline-block;
      height: 16px;
      flex:1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-left: 15px;
    }
  }
}
</style>
<script>
export default {
  props:{
    searchResultList:{
      type:Array,
      default:[]
    }
  },
  computed:{

  },
  methods:{
    selectSearch(item){
        this.$emit('selectSearch',item)
    },
    getIconClass(item){
      return item.type==='song'?'icon-music':'icon-mine'
    }
  },


}
</script>
