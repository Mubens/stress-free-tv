<template>
  <div class="video-player" @keydown.prevent.space="playOrPause" tabindex="1">
    <div
      class="player-main-content"
      :class="classList"
      @mouseleave="showControl = false"
      ref="player"
    >
      <div class="video-title" :class="showControl ? 'show' : ''">
        <span
          class="title"
          @mouseover="showControl = true"
        >{{ '在党的领导下，共青团紧跟时代步伐，引领广大青年与祖国共同奋斗。作为共青团一份子，我们要始终坚定地跟着党走，听从团中央的指挥，高举习近平新时代中国特色社会主义思想伟大旗帜，奋发激情、增长才干，树立高尚情操。' }}</span>
      </div>
      <!-- 视频源 -->
      <div
        class="video-content"
        @click="playOrPause"
        @mousemove="controllerShow(false)"
        @mouseleave="controllerShow(true)"
      >
        <video
          src="https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/60_ee514e1fabd7e5f5aa7eddb432ca2aaa.mp4"
          ref="video"
        />
        <DanmuAnimeBox :arr="arr" :isPause="!isPlaying" />
      </div>
      <div
        class="player-controller"
        :class="showControl ? 'show' : ''"
        @mouseover="showControl = true"
      >
        <ProgressBar :percent="percent" :buffer="buffer" :setCurrentTime="setCurrentTime" />
        <ControlBox
          :mode="mode"
          :modeChange="modeChange"
          :fullScreen="fullScreen"
          :isPlaying="isPlaying"
          :playOrPause="playOrPause"
          :duration="duration"
          :percent="percent"
          :setCurrentTime="setCurrentTime"
          :volume="volume"
          :setVolume="setVolume"
        >
          <DanmuBox
            v-if="(mode === 2 || mode === 3) && showInnerDanmu"
            slot="danmu"
            css="transparent"
            v-model="danmu"
            :danmuSubmit="danmuSubmit"
          />
        </ControlBox>
      </div>
    </div>
    <!-- 弹幕盒子 -->
    <div class="danmu-box">
      <div class="danmu-left-box">
        <span class="danmu-msg">{{ 1 }}人正在观看，{{ 0 }}条弹幕</span>
        <input type="checkbox" class="checke" />
      </div>
      <div class="danmu-right-box">
        <DanmuBox v-model="danmu" :danmuSubmit="danmuSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar'
import ControlBox from './ControlBox'
import DanmuBox from './DanmuBox'
import DanmuAnimeBox from './DanmuAnimeBox'
// import DanmuAnimeBox from './Danmuku'

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
      isDrag: false,
      volume: 1,
      danmu: '',
      showInnerDanmu: true,
      showControl: false,
      timer: null,
      arr: [
        { content: '123456', direction: 'default' }
      ]
    }
  },
  mounted () {
    this.initTestData()
  },
  methods: {
    initTestData () {
      let arr = [
        '这是一条有弹幕',
        '今天去打LOL',
        '可以吗？',
        '一起嗨！！！'
      ]
      for (let i = 0; i < 6; i++) {
        for (let index = 0; index < 1000; index++) {
          if (index % 2 == 0) {
            this.arr.push({
              direction: 'top',
              content: arr[parseInt(Math.random() * arr.length)]
            })
          } else {
            this.arr.push({
              direction: 'default',
              content: arr[parseInt(Math.random() * arr.length)]
            })
          }
        }
      }
    },
    danmuSubmit () {
      const danmu = this.danmu.trim()
      if (danmu) {
        // axios()
        this.danmu = ''
      }
    },
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
    },
    toShowInnerDanmu () {
      const body = document.documentElement || document.body
      this.showInnerDanmu = body.offsetWidth > 1024
    },
    controllerShow (flag) {
      this.showControl = true
      clearTimeout(this.timer)
      if (!flag) {
        this.timer = setTimeout(() => {
          this.showControl = false
        }, 800)
      }
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
    const localVol = getLocal('sptv-volume')
    this.setVolume(this.volume = localVol ? localVol : 1)

    this.$refs.video.addEventListener("canplaythrough", this.getDurdation)
    this.$refs.video.addEventListener("timeupdate", this.updateProgress)
      ;['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(item => {
        document.addEventListener(item, this.fullScreenChange)
      })
    window.addEventListener('resize', this.toShowInnerDanmu)
  },
  beforeDestroy () {
    this.$refs.video.removeEventListener("canplaythrough", this.getDurdation)
    this.$refs.video.removeEventListener("timeupdate", this.updateProgress)
      ;['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(item => {
        document.removeEventListener(item, this.fullScreenChange)
      })
    window.removeEventListener('resize', this.toShowInnerDanmu)
  },
  components: {
    ProgressBar,
    ControlBox,
    DanmuBox,
    DanmuAnimeBox
  }
}
</script>

<style lang="less" >
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 10px 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .player-main-content {
    width: 100%;
    height: calc(100% - 45px);
    background-color: #000000;
  }

  .video-content {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
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
    transition: all ease 0.4s;
    opacity: 0;
    z-index: 999;
  }

  .video-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #fff;
    background: linear-gradient(
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0)
    );
    transition: all ease 0.4s;
    z-index: 99;
    opacity: 0;
    z-index: 999;

    .title {
      display: block;
      padding: 0 20px;
      line-height: 50px;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .show {
    opacity: 1;
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

.danmu-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: 0 10px;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px #e6e6e6;
  border-radius: 2px;
  box-sizing: border-box;

  .danmu-left-box {
    box-sizing: border-box;
    width: 300px;
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
  }

  .checke {
    position: relative;
    width: 30px;
    height: 19px;
    margin-left: 10px;
    background: #757575;
    border-radius: 30px;
    vertical-align: -4px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  .checke:before {
    content: "弹";
    position: absolute;
    left: 2px;
    top: 2px;
    width: 15px;
    line-height: 15px;
    border-radius: 50%;
    background: #ffffff;
    text-align: center;
    font-size: 10px;
    color: #757575;
    box-shadow: 0px 0px 4px #ff8484;
    transition: all 0.2s linear;
  }
  .checke:checked {
    background: #ff6b6b;
  }
  .checke:checked:before {
    left: 12px;
    color: #ff6b6b;
    transition: all 0.2s linear;
  }

  .danmu-right-box {
    flex: 1;
    display: flex;
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