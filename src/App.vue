<template>
  <div>
    <div id="app">
      <musicHeader></musicHeader>
      <tab></tab>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
<play></play>
  </div>
</template>

<script>
  import musicHeader from 'component/header/header'
  import tab from 'component/tab/tab'
  import play from 'component/play/play'
export default {
  name: 'App',
  components:{
    musicHeader,
    tab,
    play
  }
}
</script>

<style>

</style>
