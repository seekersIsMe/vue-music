<template>
  <div>
    <div id="app">
      <musicHeader></musicHeader>
      <tab></tab>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import musicHeader from 'component/header/header'
  import tab from 'component/tab/tab'
export default {
  name: 'App',
  components:{
    musicHeader,
    tab
  }
}
</script>

<style>

</style>
