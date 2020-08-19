<template>
  <!-- 主容器 -->
  <div
    class="main-wrapper"
    :class="
      size.screenFlag === 0 || size.screenFlag === 1
        ? 'smallAndWide'
        : 'fullScreen'
    "
    :style="{ width: size.containerWidth + 'px' }"
    ref="player"
  >
    <!-- 左侧组件容器 -->
    <div class="left-wrapper">
      <!-- 播放器组件容器 -->
      <div
        class="player-wrapper"
        :class="[size.currentMode]"
        :style="{
          width: size.playerWidth + 'px',
          height: size.playerHeight + 'px'
        }"
      >
        <!--  -->
        <div class="player-content">
          <div
            class="video-player"
            :class="
              size.screenFlag === 2 || size.screenFlag === 3 ? 'fullScreen' : ''
            "
          >
            <!-- 放置播放器组件 -->
            <video-player
              :videoSrc="videoSrc"
              :size="size"
              :wideScreen="wideScreen"
              :pageFullScreen="pageFullScreen"
              :fullScreen="fullScreen"
            ></video-player>
          </div>
        </div>
        <!-- 下方发送弹幕组件容器 -->
        <div class="player-bottom">
          <danmu-send />
        </div>
      </div>

      <!-- 下方内容组件容器 -->
      <div class="content-wrapper">
        <comment-area />
      </div>
    </div>

    <!-- 右侧组件容器 -->
    <div class="right-wrapper" :style="{ top: size.rightContainerTop + 10 + 'px' }">
      <!-- 弹幕组件 -->
      <danmu-list />
      <!-- 选集组件 -->
      <episode-list />
    </div>
  </div>
</template>

<script>
import VideoPlayer from '../components/player/VideoPlayer'
import DanmuSend from '../components/player/DanmuSend'
import CommentArea from '../components/player/CommentArea'
import DanmuList from '../components/player/DanmuList'
import EpisodeList from '../components/player/EpisodeList'
// let axios = require('../../../node_modules/axios/dist/axios.js')

export default {
  data () {
    return {
      size: {
        screenFlag: 0,
        currentMode: 'smallScreen', // 当前模式
        containerWidth: 0, // 主容器宽度
        playerWidth: 0, // 播放器宽度
        playerHeight: 0, // 播放器的高度
        rightContainerTop: 0, // 右侧容器的 top
        smallScreen: 'smallScreen', // 小屏
        wideScreen: 'wideScreen', // 宽屏
        scrollTop: 0
      },
      // videoSrc: require('../../assets/videos/04.mp4')
      videoSrc: 'http://111.30.158.123/vmtt.tc.qq.com/1098_092e4b2c84764e5381f6cca2719c8e89.f0.mp4?vkey=208E75E6CBAE1EC93CB81DA59CEAF8845660A4039D782435C6BCAEF1029A500207377CC3F71F9544B3AF9F1DE97CBF47D3509DE58BCDA0070599E6F654A833048DC7DA41286D660CA3C9C8C14C2EB08E7F9396AD7EC36494'
    }
  },
  methods: {
    // 小屏自适应
    smallScreenChange: function () {
      this.size.containerWidth = Math.ceil(window.innerWidth * 0.7723)
      this.size.playerWidth = Math.ceil(this.size.containerWidth - 350)
      this.size.playerHeight = Math.ceil(this.size.playerWidth * 0.7387)
      if (
        window.innerHeight <=
        this.size.playerHeight + this.$refs.player.offsetTop
      ) {
        this.size.containerWidth = Math.ceil(window.innerHeight * 1.88)
        this.size.playerWidth = Math.ceil(this.size.containerWidth - 350)
        this.size.playerHeight = Math.ceil(this.size.playerWidth * 0.7387)
      }
      this.size.rightContainerTop = 0
    },
    // 宽屏自适应
    wideScreenChange: function () {
      this.size.containerWidth = Math.ceil(window.innerWidth * 0.8723)
      this.size.playerWidth = Math.ceil(this.size.containerWidth)
      this.size.playerHeight = Math.ceil(this.size.playerWidth * 0.6)
      if (
        window.innerHeight <=
        this.size.playerHeight + this.$refs.player.offsetTop
      ) {
        this.size.containerWidth = Math.ceil(window.innerHeight * 1.57)
        this.size.playerWidth = Math.ceil(this.size.containerWidth)
        this.size.playerHeight = Math.ceil(this.size.playerWidth * 0.6)
      }
      if (this.size.playerHeight < 602) {
        this.size.rightContainerTop = 602
      } else if (this.size.playerHeight > 883) {
        this.size.rightContainerTop = 883
      } else {
        this.size.rightContainerTop = this.size.playerHeight
      }
    },
    // 小屏或宽屏
    wideScreen: function () {
      if (this.size.screenFlag === 0 || this.size.screenFlag === 2) {
        this.size.screenFlag = 1
        this.size.currentMode = 'wideScreen'
        this.wideScreenChange()
      } else {
        this.size.screenFlag = 0
        this.size.currentMode = 'smallScreen'
        this.smallScreenChange()
      }
    },
    // 网页全屏
    pageFullScreen: function () {
      if (this.size.screenFlag === 2) {
        this.size.screenFlag = 0
        this.size.currentMode = 'smallScreen'
        this.smallScreenChange()
        document.body.style.overflow = 'scroll'
        document.documentElement.scrollTop = this.size.scrollTop
      } else {
        this.size.screenFlag = 2
        this.size.scrollTop = document.documentElement.scrollTop
        document.body.scrollIntoView(true)
        document.body.style.overflow = 'hidden'
      }
    },
    // 全屏
    fullScreen: function () {
      if (this.size.screenFlag === 3) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else {
          window.parent.showTopBottom()
        }
        document.body.style.overflow = 'scroll'
        document.documentElement.scrollTop = this.size.scrollTop
        this.size.screenFlag = 0
        this.size.currentMode = 'smallScreen'
        // this.wideScreen()
      } else {
        let docElm = document.documentElement
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          document.body.msRequestFullscreen()
        }
        this.size.scrollTop =
          document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
        document.body.scrollIntoView(true)
        document.body.style.overflow = 'hidden'
        this.size.screenFlag = 3
      }
    },
    // 请求视频 src
    getVideo: function () { }
  },
  components: {
    VideoPlayer,
    DanmuSend,
    CommentArea,
    DanmuList,
    EpisodeList
  },
  mounted () {
    // 默认小屏
    this.smallScreenChange()
    // 监听浏览器缩放，小屏或宽屏自适应
    let timer
    window.onresize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (this.size.screenFlag === 0) {
          this.smallScreenChange()
        } else if (this.size.screenFlag === 1) {
          this.wideScreenChange()
        }
      }, 300)
    }

    // 监听 esc 事件
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        if (this.size.screenFlag === 2) {
          this.pageFullScreen()
        } else {
          this.wideScreen()
        }
      }
    })
      // 全屏监听 esc 事件
      ;[
        'fullscreenchange',
        'mozfullscreenchange',
        'webkitfullscreenchange',
        'msfullscreenchange'
      ].forEach((item) => {
        document.addEventListener(item, () => {
          let isFull = document.webkitIsFullScreen
          if (!isFull) {
            document.body.style.overflow = 'scroll'
            document.documentElement.scrollTop = this.size.scrollTop
            this.wideScreen()
          }
        })
      })
  }
}
</script>

<style>
.main-wrapper {
  position: relative;
  top: 0;
  left: 0;
  margin: 0 auto;
  margin-top: 20px;
  box-sizing: border-box;
}

.smallAndWide {
  min-width: 988px;
  max-width: 1488px;
  padding-right: 350px;
}

.fullScreen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 999;
}

.smallScreen {
  min-width: 638px;
  max-width: 1138px;
  min-height: 493px;
  max-height: 774px;
}

.wideScreen {
  min-width: 988px;
  max-width: 1488px;
  min-height: 602px;
  max-height: 883px;
}

.left-wrapper {
  width: 100%;
  margin-bottom: 40px;

  /* height: 800px; */
  /* background-color: skyblue; */
}

.right-wrapper {
  position: absolute;
  right: 0;
  width: 320px;

  /* height: 500px;
  background-color: tomato; */
}

.player-wrapper {
  margin-bottom: 10px;
}

.content-wrapper {
  width: 100%;

  /* height: 500px; */
  /* background-color: violet; */
}

.player-content {
  width: 100%;
  height: calc(100% - 45px);

  /* background-color: yellowgreen; */
}

.player-bottom {
  width: 100%;
  height: 45px;
  /* background-color: springgreen; */
}

.video-player {
  width: 100%;
  height: 100%;
  /* background-color: tomato; */
}
</style>
