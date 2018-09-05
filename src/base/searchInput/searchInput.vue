<template>
<div class="searchInput">
  <i class="icon-search"></i>
  <input v-model="query"  type="text" :placeholder="placeholder" />
</div>
</template>
<style lang="less">
.searchInput{
  height: 40px;
  box-sizing: border-box;
  background-color: #333;
  position: absolute;
  left: 20px;
  right: 20px;
  margin: 20px 0;
  line-height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  i{
    flex:0 0 24px;
    width: 24px;
    height: 24px;
    font-size: 24px;
    color: #222
  }
  input{
    flex: 1;
    height: 18px;
    margin: 0 5px;
    line-height: 18px;
    background: #333;
    color: #fff;
    font-size: 14px;
    outline:none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;//去掉ios input的上边框
  }
}

</style>
<script>
export default{
  props:{
    placeholder:{
      type:String,
      default:''
    },
  },
  data(){
    return {
      query:""
    }
  },
  methods:{
    //让父组件来调用，来改变query
    setQuery(query) {
      this.query = query
    },
    valueChange(e){
      this.$emit('queryChange',newData)
    }
  },
  watch:{
    query(newData){
      this.$emit('queryChange',newData)
    }
  },
}
</script>
