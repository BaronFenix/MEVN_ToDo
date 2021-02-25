<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/phoenix.png" width="300px" height="300px">
    <HelloWorld msg="Welcome to my project"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home{
  /* background-color: #000; */
  background: url('../assets/black.jpg') no-repeat;
  background-size: cover;
  height: 50rem;
}
</style>
