<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer class="bottom" />
  </div>
</template>
<script lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>


<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
