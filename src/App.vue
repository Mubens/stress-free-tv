<template>
  <div id="app">
    <Header :narrowChange="narrowChange" />
    <div class="box">
      <div class="side-box" :class="isNarrow ? 'narrow' : ''">
        <SideNav />
      </div>
      <div class="content" :class="isNarrow ? 'narrow' : ''">
        <!-- <keep-alive> -->
        <router-view />
        <!-- </keep-alive> -->
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
  data () {
    return {
      isNarrow: false
    }
  },
  methods: {
    narrowChange () {
      this.isNarrow = !this.isNarrow
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

.box {
  display: flex;
  padding-top: 56px;
  width: 100%;
  height: calc(100% - 56px);
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
}
.content {
  position: relative;
  flex: auto;
  margin-left: 220px;
  &.narrow {
    margin-left: 80px;
  }
  min-width: 1120px;
  margin-top: 16px;
}

.wrapper {
  width: 1512px;
  height: 100%;
  margin: 0 auto;
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

.h-title {
  font-size: 20px;
  line-height: 2em;
  font-weight: 700;
}
</style>
