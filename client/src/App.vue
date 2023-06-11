<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  color: #ffffff;
  background: #0a0a0ade;
}
</style>
