<template>
  <div id="app">
    <div class="container" ref="container">
      <div class="side-box" :class="classList">
        <SideNav />
      </div>
      <div class="page-box" :class="classList" @mousedown="toggleNavNarrow" ref="page">
        <Header />
        <router-view />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import SideNav from './components/SideNav/SideNav'
import Footer from './components/Footer'

import { mapMutations } from 'vuex'

export default {
  computed: {
    classList () {
      if (this.$store.state.hideNav) {
        return this.$store.state.narrowNav ? 'hide-side hide' : 'hide-side'
      } else {
        return this.$store.state.narrowNav ? 'narrow' : ''
      }
    }
  },
  methods: {
    ...mapMutations(['toggleNavNarrow', 'toggleNavHide']),
    toggleNavNarrow () {
      if (this.$store.state.hideNav) {
        this.$store.commit('toggleNavNarrow', true)
      }
    }
  },
  components: {
    Header,
    SideNav,
    Footer
  }
}
</script>


<style lang="less">
// initial css
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
}

html {
  font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
  color: #505050;
  -webkit-font-smoothing: antialiased;
}
body {
  background-color: #f9f9f9;
}

a {
  color: #000000;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

video {
  width: 100%;
  height: 100%;
  outline: none;
  vertical-align: middle;
}

button,
input,
textarea {
  outline: none;
  border: none;
}

button,
input[type="button"] {
  cursor: pointer;
}

[tabindex] {
  outline: none;
}
</style>

<style lang="less">
// common css in all .vue

.page-box {
  box-sizing: border-box;
  flex: 1;
  min-width: 1120px;
  margin-left: 220px;
  // margin-top: 16px;
  // padding-top: 16px;
  height: 100%;

  &.narrow {
    margin-left: 80px;
  }
}

.wrapper {
  width: 1512px;
  margin: 0 auto;
}

.h-title {
  font-size: 20px;
  line-height: 2em;
  font-weight: 700;
}

.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}

@media screen and(max-width: 1756px) {
  .wrapper {
    width: 1360px;
  }
}
@media screen and(max-width: 1650px) {
  .wrapper {
    width: 1098px;
  }
}
</style>


<style lang="less">
// css in App.vue
.container {
  display: flex;
  // padding-top: 56px;
  width: 100%;
}

.side-box {
  position: fixed;
  width: 220px;
  // height: calc(100% - 56px);
  height: 100%;
  overflow-y: auto;
  // box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.08);
  z-index: 999;

  &.narrow {
    width: 80px;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: 0 8px;
      height: 60px;
    }
    span {
      padding: 4px 0 0;
      font-size: 12px;
    }
  }

  &::-webkit-scrollbar {
    width: 0;
  }
}

.side-box.hide-side.hide {
  transform: translateX(-100%);
}
.side-box.hide-side {
  transform: translateX(0);
  transition: transform 0.2s;
}
.page-box.hide-side {
  margin-left: 0;
}
</style>
