<template>
  <div class="home">
    <img alt="Vue logo" class="half-width" src="@/assets/intel.png">
    <HelloWorld msg="Welcome to Your Intel based App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    logoUrl() {
      return '../assets/logo.png';
    }
  },
}
</script>

<style scoped>
.half-width {
  width: 50vh;
}
</style>
