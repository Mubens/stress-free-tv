<template>
  <div id="app">
    <Header />
    <div class="box">
      <div class="side-box">
        <SideNav />
      </div>
      <div class="content">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './views/Header'
import SideNav from './views/SideNav'

export default {
  components: {
    Header,
    SideNav
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
  font-size: 14px;
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
  // margin: 16px 32px;
}
</style>
