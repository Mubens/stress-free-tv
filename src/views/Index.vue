<template>
  <div class="container">
    <div class="side-box" :class="isNarrow ? 'narrow' : ''">
      <SideNav />
    </div>
    <div class="page-box" :class="isNarrow ? 'narrow' : ''">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import SideNav from '../components/SideNav/SideNav'
import Footer from '../components/Footer'

import { mapState } from 'vuex'

export default {
  computed: {
    isNarrow () {
      return this.$store.state.narrowSide
    }
  },
  components: {

    SideNav,
    Footer
  }
}
</script>

<style scoped>
.home a.router-link-exact-active {
  color: #42b983;
}
</style>