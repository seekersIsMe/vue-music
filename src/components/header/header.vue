<template>
<div class="m-header">
    <div class="icon"></div>
    <h1>Chicken Music</h1>
  <router-link tag="div" class="mine" to="/user">
    <i class="icon-mine"></i>
  </router-link>
</div>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import "../../common/less/mixin";
  .m-header{
    width: 100%;
    height: 44px;
    text-align: center;
    position: relative;
    color: #ffcd32;
  .icon{
    width: 30px;
    height: 32px;
    margin-top: 6px;
    vertical-align: top;
    display: inline-block;
    .bg_img('../../components/header/logo');
  }
    h1{
      display: inline-block;
      font-size: 18px;
      line-height: 44px;
    }
    .mine{
      position: absolute;
      right: 0;
      top:0;
      line-height: 44px;
      width: 44px;
      i{
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
<script>

</script>
