<template>
  <div class="video-player">
    <div class="player-main-content" :class="classList" ref="player">
      <!-- 视频源 -->
      <video
        src="https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/60_ee514e1fabd7e5f5aa7eddb432ca2aaa.mp4"
        ref="video"
      ></video>
      <div class="player-controller">
        <ProgressBar :percent="percent" :buffer="buffer" :setCurrentTime="setCurrentTime" />
        <ControlBox
          :mode="mode"
          :modeChange="modeChange"
          :isPlaying="isPlaying"
          :playOrPause="playOrPause"
          :fullScreen="fullScreen"
          :duration="duration"
          :percent="percent"
          :setCurrentTime="setCurrentTime"
          :setVolume="setVolume"
          :volume="volume"
        />
      </div>
    </div>
    <!-- 弹幕盒子 -->
    <div class="danmu-box"></div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar'
import ControlBox from './ControlBox'

import { getLocal } from '../../assets/js/storage'

export default {
  props: {
    mode: { type: Number, default: 0 },
    modeChange: Function
  },
  data () {
    return {
      isPlaying: false, // 是否播放中
      duration: 0,  // 视频总时间
      currentTime: 0, // 当前视频时间
      percent: 0, // 进度值（0-100）
      buffer: 0, // 缓冲值（0-100）
      lastMode: 0,
      isDrag: false,
      volume: 1
    }
  },
  methods: {
    setVolume (val) {
      if (val === 0) {
        this.$refs.video.muted = true
      } else {
        this.$refs.video.muted = false
        this.$refs.video.volume = val
      }
      this.volume = val
    },
    // 暂停/播放
    playOrPause () {
      if (this.isPlaying) {
        this.$refs.video.pause()
      } else {
        this.$refs.video.play()
      }
      this.isPlaying = !this.isPlaying
    },
    // 设置视频时间
    setCurrentTime (percent, flag) {
      this.percent = percent
      this.isDrag = true
      if (flag) {
        this.$refs.video.currentTime = this.duration * (percent / 100)
        this.isDrag = false
        this.$refs.video.play()
        this.isPlaying = true
      }
    },
    // 进度条跟随
    updateProgress () {
      if (!this.isDrag) {
        this.currentTime = this.$refs.video.currentTime
        this.percent = (100 * this.currentTime) / this.duration
      }
    },
    // 获取视频时长
    getDurdation () {
      this.duration = this.$refs.video.duration
    },
    // 视频缓存
    getBuffered () {
      const video = this.$refs.video;

      let buffered = video.buffered
      if (buffered.length) {
        // 渲染缓冲条的样式

        for (var i = 0; i < buffered.length; i++) {
          // 寻找当前时间之后最近的点
          if (buffered.start(buffered.length - 1 - i) < video.currentTime) {
            let bufferedLength = (buffered.end(buffered.length - 1 - i) / video.duration) * 100
            this.buffer = bufferedLength
            break
          }
        }
      }

      setTimeout(this.getBuffered, 100);
    },
    // 全屏事件
    fullScreen () {
      let isFull = !!(
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.webkitFullScreen ||
        document.msFullScreen
      )
      if (isFull) {
        // console.log('退出全屏')
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      } else {
        // console.log('全屏')
        const player = this.$refs.player
        if (player.requestFullscreen) {
          player.requestFullscreen()
        } else if (player.msRequestFullscreen) {
          player.msRequestFullscreen()
        } else if (player.mozRequestFullScreen) {
          player.mozRequestFullScreen()
        } else if (player.webkitRequestFullscreen) {
          player.webkitRequestFullscreen()
        }
      }
    },
    // 全屏自定义事件
    fullScreenChange () {
      this.modeChange(3)
    }
  },
  filters: {
    // 格式化时间
    timeFormat (seconds) {
      let minite = Math.floor(seconds / 60);
      if (minite < 10) {
        minite = '0' + minite;
      }
      let second = Math.floor(seconds % 60);
      if (second < 10) {
        second = '0' + second;
      }
      return minite + ':' + second;
    }
  },
  computed: {
    classList () {
      if (this.mode === 2) {
        return 'full-webpage'
      }
      if (this.mode === 3) {
        return 'full-window'
      }
      return ''
    }
  },
  mounted () {
    this.volume = getLocal('sptv-volume') || 1
    this.$refs.video.addEventListener("canplaythrough", this.getDurdation)
    this.$refs.video.addEventListener("timeupdate", this.updateProgress)
      ;['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(item => {
        document.addEventListener(item, this.fullScreenChange)
      })
  },
  beforeDestroy () {
    this.$refs.video.removeEventListener("canplaythrough", this.getDurdation)
    this.$refs.video.removeEventListener("timeupdate", this.updateProgress)
      ;['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(item => {
        document.removeEventListener(item, this.fullScreenChange)
      })
  },
  components: {
    ProgressBar,
    ControlBox
  }
}
</script>

<style lang="less" >
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .player-main-content {
    width: 100%;
    height: calc(100% - 45px);
    background-color: #000000;
  }
  .danmu-box {
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    background-color: #ffffff;
    box-shadow: 0px 1px 5px #dadada;
    border-radius: 2px;
  }

  .player-controller {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    bottom: 45px;
    width: 100%;
    height: 45px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0)
    );
  }
}

// 网页全屏
.video-player .full-webpage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9876;

  .player-controller {
    bottom: 0;
    height: 60px;
    .icon {
      font-size: 26px;
    }
  }
}

.video-player .full-window .player-controller {
  bottom: 0;
  height: 60px;
  .icon {
    font-size: 26px;
  }
}

@media screen and(max-width: 1756px) {
  .wide-screen .video-player {
    height: 814px;
  }
}
@media screen and(max-width: 1650px) {
  .wide-screen .video-player {
    height: 667px;
  }
}
</style>