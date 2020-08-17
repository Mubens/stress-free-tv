<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="side-box" :class="isNarrow ? 'narrow' : ''">
        <SideNav />
      </div>
      <div class="page-box" :class="isNarrow ? 'narrow' : ''">
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

export default {
  computed: {
    isNarrow () {
      return this.$store.state.narrowSide
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
  display: flex;
  flex-direction: column;
}

a {
  color: #000000;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}
</style>

<style lang="less">
// common css in all .vue
@import url("./fonts/style.css");

.page-box {
  flex: 1;
  min-width: 1120px;
  margin-left: 220px;
  margin-top: 16px;
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
  padding-top: 56px;
  width: 100%;

  background-color: #f9f9f9;
}
.side-box {
  position: fixed;
  width: 220px;
  height: calc(100% - 56px);
  z-index: 99;
  overflow-y: auto;

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
</style>