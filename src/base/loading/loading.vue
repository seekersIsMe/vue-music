<template>
<div class="loading">
  <img src="./loading.gif" alt="">
  <p>{{title}}</p>
</div>
</template>
<style lang="less" scoped>
  @import "../../common/less/const";
.loading{
  text-align: center;
  font-size: 14px;
  color: @color-text-l;
  img{
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
}
</style>
<script>
export default {
  props:{
    title:{
      type:String,
      default:'正在载入中。。。'
    }
  }
}
</script>
