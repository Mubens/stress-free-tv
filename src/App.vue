<template>
  <div id="app">
    <Header />
    <div class="box">
      <SlideGuide />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './views/Header'
import SlideGuide from './views/SlideGuide'

export default {
  components: {
    Header,
    SlideGuide
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

.box {
  display: flex;
  height: calc(100% - 56px);
  background-color: #f9f9f9;
}
.content {
  flex: 1;
}
</style>
