<template>
<div class="loading">
  <div>
    <img src="./loading.gif" alt="">
    <p>{{title}}</p>
  </div>
</div>
</template>
<style lang="less" scoped>
  @import "../../common/less/const";
.loading{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
