<template>
  <div id="app">
    <Header />
    <div class="box">
      <div class="side-box">
        <SideNav />
      </div>
      <div class="content">
        <router-view />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './views/Header'
import SideNav from './views/SideNav'
import Footer from './views/Footer'

export default {
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
  width: 100%;
  height: 100%;
}

html {
  font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, sans-serif;
  color: #505050;
  -webkit-font-smoothing: antialiased;
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
  height: calc(100% - 56px);
  background-color: #f9f9f9;
}
.side-box {
  flex: 0 0 240px;
  height: 100%;
}
.content {
  box-sizing: border-box;
  flex: 1;
  min-width: 1120px;
  margin-top: 16px;
}

.wrapper {
  width: 1512px;
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
