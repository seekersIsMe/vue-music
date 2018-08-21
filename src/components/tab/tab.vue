<template>
<div class="tab-wrapper">
  <router-link  class="tab-link" tag="div" to="/recommend"> <span>推荐</span></router-link>
  <router-link  class="tab-link" tag="div" to="/singer"> <span>歌手</span></router-link>
  <router-link  class="tab-link" tag="div" to="/rankings"> <span>排行</span></router-link>
  <router-link  class="tab-link" tag="div" to="/search"> <span>搜索</span></router-link>
</div>
</template>
<style lang="less" scoped>
  @import "../../common/less/const";
  .tab-wrapper{
    display: flex;
    justify-content: space-between;
    text-align: center;
    font-size: @font-size-medium ;
    .tab-link{
      flex: 1;
      line-height: 44px;
      &.router-link-active{
        span{
          display: inline-block;
          vertical-align: middle;
          line-height: 23px;
          color: @color-theme;
          border-bottom: 2px solid @color-theme;
        }
      }
    }
  }
</style>
<script>

</script>
