<template>
  <div id="app">
    <div class="page-box">
      <Header />
      <keep-alive>
        <router-view />
      </keep-alive>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './views/Header'
import Footer from './views/Footer'

export default {
  components: {
    Header,
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
  font-size: 14px;
  font-family: Microsoft Yahei, Tahoma, Helvetica, Arial, "\5B8B\4F53",
    sans-serif;
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
input[type="button"],
input[type="checkbox"] {
  cursor: pointer;
}

[tabindex] {
  outline: none;
}
</style>

<style lang="less">
// common css in all .vue

.page-box {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  // align-content: space-between;
  box-sizing: border-box;
  flex: 1;
  // min-width: 1120px;
  // margin-left: 220px;
  // margin-top: 16px;
  // padding-top: 16px;
  height: 100%;

  // &.narrow {
  //   margin-left: 80px;
  // }
}

.wrapper {
  // width: 1512px;
  margin: 0 auto;
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

// 土司
.top-toast:hover {
  .toast {
    transform: translate(-50%, -80%);
    visibility: visible;
    transition: transform 0.2s linear;
  }
}
.toast {
  visibility: hidden;
  font-size: 12px;
  top: -28px;
  // top: 0;
  left: 50%;
  white-space: nowrap;
  position: absolute;
  z-index: 999;
  padding: 6px;
  border-radius: 2px;
  background-color: rgba(20, 20, 20, 0.897);
  // background-color: skyblue;
  transform: translate(-50%, -10%);
}

@media screen and (max-width: 980px) {
  .page-box {
    width: 980px;
  }
}
</style>

<style lang="less">
// css in App.vue
// .container {
//   display: flex;
//   // padding-top: 56px;
//   width: 100%;
// }

.side-box {
  position: fixed;
  width: 220px;
  height: 100%;
  overflow-y: auto;
  z-index: 9999;

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
  box-shadow: -5px 0 10px 5px #00000055;
  transform: translateX(0);
  transition: transform 0.2s;
}
.page-box.hide-side {
  margin-left: 0;
}
</style>
