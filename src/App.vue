<template lang="pug">
.app
  page-intro
  image-search(
    :items="items"
  )
  page-footer
</template>

<script>
import PageIntro from './components/PageIntro.vue'
import ImageSearch from './components/ImageSearch.vue'
import PageFooter from './components/PageFooter.vue'

export default {
  name: 'App',
  
  props: {
    items: Array,
    langs: Array
  },

  components: {
    PageIntro,
    ImageSearch,
    PageFooter
  }
}
</script>

<style lang='scss'>
html {
  font-size: 18px;
}
.app {
  font-family: "proxima-nova";
  font-size: 1rem;
  text-align: center;
  margin: 0;
  background: #fff;
  color: #333;
  line-height: 1.6;
}
a {
  color: #00a9e0;
  text-decoration: none;
  transition: 0.2s color;
  &:hover {
    color: #0b8dba;
  }
}
</style>
