<template>
  <div
    class="video-player"
    @keydown.prevent.space="playOrPause"
    @keydown.prevent.right="setVTimeByArrowKey('right')"
    @keydown.prevent.left="setVTimeByArrowKey('left')"
    @keydown.prevent.up="setVVolumeByArrowKey('up')"
    @keydown.prevent.down="setVVolumeByArrowKey('down')"
    @keydown.prevent.esc="setScreenMode(mode)"
    tabindex="1"
  >
    <div
      id="video-player"
      class="video-main-wrapper"
      :class="classList"
      :style="{ width: '100%', height: mode === 2 ? '100vh' : 100 + '%' }"
      @mouseleave="controllerIsShow = false"
      ref="wrapper"
    >
      <!-- 视频标题 -->
      <div class="video-title" :class="{ show: controllerIsShow }">
        <span class="title" @mouseover="controllerIsShow = true">{{
          videoSource.title
        }}</span>
      </div>
      <!-- 视频和弹幕 -->
      <div
        class="video-content"
        @click="playOrPause"
        @mousemove="showController(false)"
        @mouseleave="showController(true)"
        ref="player"
      >
        <video preload="auto" :src="videoSource.video" ref="video" />
        <!-- 弹幕池 -->
        <DanmuPool
          v-if="needDanmuPlay"
          :danmu="danmuPool"
          :isPlaying="isPlaying"
          ref="danmupool"
        />
        <!-- 方向键控制音量显示提示 -->
        <div
          class="volume-tip"
          :class="showVolumeTip ? 'fade-out' : 'transparent'"
        >
          <i
            class="icon"
            :class="volume === 0 ? 'icon-mute' : 'icon-volume'"
          ></i>
          <span>{{
            volume === 0 ? "静音" : `${parseInt(volume * 100)}%`
          }}</span>
        </div>
        <!-- 视频暂停提示 -->
        <div class="pause-tip" v-if="!isPlaying">
          <i class="icon icon-to-play"></i>
        </div>
        <!-- 视频缓冲提示 -->
        <div class="waiting-tip" v-if="isWaiting">
          <svg class="loading is-loading" viewBox="0 0 128 100">
            <path
              class="border"
              d="M40,10 L64,25 93,25 Q108,25 108,45 L108,65 Q108,85 93,85 L35,85 Q20,85 20,65 L20,45 Q20,25 35,25 L64,25 88,10"
            />
            <circle class="dot dot1" cx="46" cy="55" r="6" />
            <circle class="dot dot2" cx="64" cy="55" r="6" />
            <circle class="dot dot3" cx="82" cy="55" r="6" />
          </svg>
          <span>视频缓冲中...</span>
        </div>
      </div>
      <!-- 控制器 -->
      <div
        class="video-controller"
        :class="{ show: controllerIsShow }"
        @mouseover="controllerIsShow = true"
      >
        <!-- 进度条 -->
        <ProgressBar
          :percent="percent"
          :buffer="buffer"
          :duration="duration"
          :setVTime="setVTime"
        />
        <!-- 其他功能 -->
        <ControlBox
          :mode="mode"
          :setScreenMode="setScreenMode"
          :fullScreen="fullScreen"
          :isPlaying="isPlaying"
          :playOrPause="playOrPause"
          :duration="duration"
          :percent="percent"
          :setVTime="setVTime"
          :volume="volume"
          :setVVolume="setVVolume"
        >
          <!-- 播放下一集 -->
          <span
            class="icon icon-play-next"
            v-show="current < total"
            @click="palyNextEp"
            slot="play-next"
          ></span>
          <!-- 中间控制器 -->
          <CenterControl v-show="mode === 2 || mode === 3" slot="danmu">
            <div class="center-btn">
              <input
                type="checkbox"
                class="danmu-switch-btn btn"
                :checked="needDanmuPlay"
                @click="danmuSwitch($event.target.checked)"
              />
            </div>
            <!-- 发送弹幕的 表单 -->
            <DanmuInput
              css="transparent"
              v-model="danmuText"
              v-show="showInnerDanmu"
              :danmuType="danmuType"
              :danmuColor="danmuColor"
              @shootDanmu="shootDanmu"
              @setDanmuType="setDanmuType"
            />
          </CenterControl>
        </ControlBox>
      </div>
    </div>
    <!-- 弹幕 send 盒子 -->
    <div class="danmu-sendbar">
      <div class="danmu-sendbar-left">
        <span>当前共 {{ danmuList.length }} 条弹幕</span>
        <input
          type="checkbox"
          class="danmu-switch-btn"
          :checked="needDanmuPlay"
          @click="danmuSwitch($event.target.checked)"
        />
      </div>
      <div class="danmu-sendbar-right">
        <DanmuInput
          v-model="danmuText"
          :danmuType="danmuType"
          :danmuColor="danmuColor"
          @shootDanmu="shootDanmu"
          @setDanmuType="setDanmuType"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar'
import ControlBox from './ControlBox'
import CenterControl from './CenterControl'
import DanmuInput from './DanmuInput'

import { getLocal } from '../../assets/js/storage'


export default {
  props: {
    mode: { type: Number, default: 0 },
    setScreenMode: Function,
    videoSource: Object,
    current: Number,
    total: Number,
    setEpisode: Function,
    sendDanmuku: Function,
    danmuList: { type: Array, default: () => [] }
  },
  data () {
    return {
      // video 的高度
      playerHeight: 0,
      // 视频是否在播放
      isPlaying: false,
      canPlay: false,
      // 自动播放
      autoPlay: true,
      // 视频是否在等待缓冲
      isWaiting: true,
      // 视频持续时间
      duration: 0,
      // 当前视频时间
      currentTime: 0,
      // 进度值（0-100）%
      percent: 0,
      // 缓冲值（0-100）
      buffer: 0,
      // 进度条拖拽节流阀
      isDrag: false,
      // 视频音量（0-1）
      volume: 1,
      // 要发送的弹幕
      danmuText: '',
      danmuType: 'roll',
      danmuColor: '#FFFFFF',
      showInnerDanmu: true,
      // 是否显示控制器和标题
      controllerIsShow: false,
      // 控制器 hover 定时器
      controlTimer: null,
      // 音量 info 定时器
      volumeInfoTimer: null,
      showVolumeTip: false,
      // 要发送的弹幕数组
      danmuPool: [],
      // 定时弹幕
      danmuTimer: null,
      needDanmuPlay: true
    }
  },
  watch: {
    mode () {
      if (this.mode === 0 || this.mode === 1) {
        this.$nextTick(() => {
          this.playerHeight = this.$refs.wrapper.clientWidth * 0.5625
        })
      }
    },
    isPlaying: {
      handler (val) {
        this.addToDanmuPool()
      }
    },
    $route: {
      handler (to, from = { query: { ep: undefined } }) {
        // if (to.query.ep !== from.query.ep) {
        this.$nextTick(() => {
          this.$refs.video.play()
          this.isPlaying = true
        })
        // }
        this.addToHistory()
      }
    }
  },
  methods: {
    /* 设置弹幕类型 */
    setDanmuType (type, color) {
      this.danmuType = type
      this.danmuColor = color
    },
    /* 弹幕开关 */
    danmuSwitch (flag) {
      // console.log(flag)
      this.needDanmuPlay = flag
      this.danmuPool = []
    },
    /* 发送弹幕 */
    shootDanmu () {
      const danmu = this.danmuText.trim()
      if (danmu && this.needDanmuPlay) {
        // type, style, content, vtime
        this.$emit('sendDanmuku', this.danmuType, { color: this.danmuColor }, this.danmuText, this.currentTime)
        this.danmuText = ''
      }
    },
    /* 设置音量 */
    setVVolume (val) {
      if (val === 0) {
        this.$refs.video.muted = true
      } else {
        this.$refs.video.muted = false
        this.$refs.video.volume = val
      }
      this.volume = val
    },
    /* 键盘上下键微调音量 */
    setVVolumeByArrowKey (arrow) {
      let volume = this.volume * 100
      if (arrow === 'up') {
        volume += 10
      } else {
        volume -= 10
      }
      volume = volume > 100 ? 100 : volume
      volume = volume < 0 ? 0 : volume
      this.setVVolume(volume / 100)

      this.showVolumeTip = true
      clearTimeout(this.volumeInfoTimer)
      this.volumeInfoTimer = setTimeout(() => {
        this.showVolumeTip = false
      }, 1000)
    },
    /* 视频暂停和播放 */
    playOrPause () {
      if (this.isPlaying) {
        this.$refs.video.pause()
      } else {
        this.$refs.video.play()
      }
      this.isPlaying = !this.isPlaying
    },
    /* 动态设置视频时间 */
    setVTime (percent, flag) {
      // flag = false 更新进度条，但不设置视频时间
      // flag = true 更新进度条并立即设置视频时间
      this.percent = percent
      this.isDrag = true
      if (flag) {
        // 当前时间 = 视频持续时间 * 进度百分比
        this.$refs.video.currentTime = this.duration * (percent / 100)
        // 强制播放
        this.$refs.video.play()
        this.isPlaying = true
        this.isDrag = false
      }
      this.$refs.danmupool.init()
    },
    /* 键盘左右方向键微调时间 */
    setVTimeByArrowKey (arrow) {
      if (arrow === 'left') {
        this.$refs.video.currentTime -= 5
      } else {
        this.$refs.video.currentTime += 5
      }
      this.$refs.video.play()
      this.isPlaying = true
      this.$refs.danmupool.init()
    },
    /* 非拖拽中，进度条自动跟随 */
    updateProgressBar () {
      if (!this.isDrag) {
        this.currentTime = this.$refs.video.currentTime
        // 进度值 = 100 * 当前时间（s）/ 视频持续时间（s）
        this.percent = 100 * (this.currentTime / this.duration)
      }
      this.getVBuffer()
    },
    /* 获取视频时长 */
    getVDurdation () {
      this.duration = this.$refs.video.duration
      this.canPlay = true
      this.isWaiting = false
    },
    /* 获取视频缓存 */
    getVBuffer () {
      const video = this.$refs.video
      const buffered = video.buffered

      if (buffered.length) {
        // 渲染缓冲条的样式

        for (let i = 0; i < buffered.length; i++) {
          // 寻找当前时间前最近的缓冲段
          //    从缓冲区的最后找起，缓冲开始时间 < 视频当前时间 的第一个缓冲段就是
          //    获取这一段的 end
          if (buffered.start(buffered.length - 1 - i) < video.currentTime) {
            // console.log(buffered.end(buffered.length - 1 - i))
            this.buffer = (buffered.end(buffered.length - 1 - i) / video.duration) * 100
            break
          }
        }
      }
    },
    waitingBuffer () {
      this.isWaiting = true
    },
    /* 播放下一集 */
    palyNextEp () {
      this.$emit('setEpisode', null, true)
    },
    /* 自动播放 */
    videoEnded () {
      if (this.autoPlay && this.current < this.total) {
        this.palyNextEp()
      }
    },
    /* 全屏事件 */
    fullScreen () {
      const isFull = !!(
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
        const player = this.$refs.wrapper
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
    /* 全屏自定义事件 */
    fullScreenChange () {
      this.setScreenMode(3)
    },
    /* 浏览器 resize 事件 */
    windowResize () {
      if (this.mode === 2) {
        const body = document.documentElement || document.body
        this.showInnerDanmu = body.offsetWidth > 1024
      }
      // 播放器高度
      this.playerHeight = this.$refs.wrapper.clientWidth * 0.5625
    },
    /* 控制器的显示和隐藏 */
    showController (flag) {
      if (!this.canPlay) return
      // flag = true 控制器一直显示
      // flag = false 控制器显示 800ms 后消失
      this.controllerIsShow = true
      clearTimeout(this.controlTimer)
      if (!flag) {
        this.controlTimer = setTimeout(() => {
          this.controllerIsShow = false
        }, 800)
      }
    },
    /* 追加到弹幕池 */
    addToDanmuPool () {
      clearInterval(this.danmuTimer)
      if (this.needDanmuPlay) {
        this.danmuTimer = setInterval(() => {
          if (this.isPlaying) {
            const time = Math.floor(this.currentTime)
            const danmus = this.danmuList.filter((danmu) => Math.floor(danmu.vtime) === time)
            if (danmus.length > 0) {
              this.danmuPool.push(...danmus)
              // console.log(danmus)
            }
          }
        }, 1000)
      }
    },
    /* 添加到历史记录 */
    async addToHistory () {
      if (this.$store.state.token && this.videoSource.id) {
        try {
          const res = (await this.$http.post('http://localhost:3000/api/user/update_history', {
            play_id: this.$route.params.id,
            ep: this.$route.query.ep,
            play_time: Date.now(),
            video_time: this.currentTime
          }))

          console.log(res)
        } catch (err) {

        }
      }
    }
  },
  filters: {
    /* 格式化时间 */
    timeFormat (seconds) {
      let minite = Math.floor(seconds / 60)
      if (minite < 10) {
        minite = '0' + minite
      }
      let second = Math.floor(seconds % 60)
      if (second < 10) {
        second = '0' + second
      }
      return minite + ':' + second
    }
  },
  computed: {
    /* 网页全屏和显示器全屏下样式 */
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
    // 获取并设置 localStorage 中的音量
    const localVol = getLocal('sptv-volume')
    this.setVVolume((this.volume = localVol != null ? localVol : 1))

    const video = this.$refs.video
    // 视频已准备好开始播放
    video.addEventListener('canplay', this.getVDurdation)
    // 监听视频播放位置的改变
    video.addEventListener('timeupdate', this.updateProgressBar)
    // 监听视频加载
    video.addEventListener('waiting', this.waitingBuffer)
    // 视频播放结束
    video.addEventListener('ended', this.videoEnded)

    this.addToDanmuPool()
      // 监听全屏事件
      ;['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach((item) => {
        document.addEventListener(item, this.fullScreenChange)
      })
    // 监听浏览器大小变化
    this.windowResize() // 初始化
    window.addEventListener('resize', this.windowResize)
  },
  beforeDestroy () {
    // 注销所有 dom 监听事件
    const video = this.$refs.video
    video.removeEventListener('canplay', this.getVDurdation)
    video.removeEventListener('timeupdate', this.updateProgressBar)
    video.removeEventListener('waiting', this.waitingBuffer)
    video.removeEventListener('ended', this.videoEnded)
      ;['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach((item) => {
        document.removeEventListener(item, this.fullScreenChange)
      })
    window.removeEventListener('resize', this.windowResize)
  },
  components: {
    ProgressBar,
    ControlBox,
    DanmuInput,
    DanmuPool: () => import('./DanmuPool'),
    CenterControl: () => import('./CenterControl')
  }
}
</script>

<style lang="less">
.video-player {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  // margin: 10px 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .video-main-wrapper {
    position: relative;
    width: 100%;
    flex: 1;
    // height: calc(100% - 45px);
    background-color: #000000;

    // 网页全屏
    &.full-webpage {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999;

      .video-controller {
        bottom: 0;
        height: 60px;
        .icon {
          font-size: 26px;
        }
      }
    }
  }

  // 核心视频区
  .video-content {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;

    video {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  // 视频控制器
  .video-controller {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0)
    );
    transition: opacity ease 0.4s;
    opacity: 0;
  }

  // 视频标题
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
    opacity: 0;
    z-index: 1;

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

  // 显示
  .show {
    opacity: 1;
  }

  // 中间控制器按钮
  .center-btn {
    display: flex;
    align-items: center;

    .btn {
      margin-right: 10px;
    }
  }

  // 方向键控制音量显示提示
  .volume-tip {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90px;
    height: 50px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.85);
    color: #000000;
    transform: translate(-50%, -50%);

    .icon {
      font-size: 32px;
      padding-right: 5px;
    }

    span {
      flex: 1;
      text-align: center;
      font-size: 22px;
    }

    &.transparent {
      opacity: 0;
      transition: opacity 0.5s;
    }

    &.fade-out {
      opacity: 1;
    }
  }

  .pause-tip {
    position: absolute;
    bottom: 40px;
    right: 30px;
    font-size: 64px;
    color: #f7f4f4;
  }

  .waiting-tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;

    .loading {
      width: 32px;
    }
    span {
      padding: 4px 8px;
      font-size: 13px;
    }

    .border {
      stroke-linecap: round;
      stroke-width: 6px;
      stroke: #ff6b6b;
      fill: none;
      stroke-linejoin: round;
      stroke-dasharray: 0 600;
      stroke-dashoffset: 10;
      transition: 1s all linear;
    }

    .is-loading .border {
      animation: border 1.5s linear forwards;
    }

    @keyframes border {
      0% {
        stroke-dasharray: 0 600;
        stroke-dashoffset: 10;
      }
      100% {
        stroke-dasharray: 600 600;
        stroke-dashoffset: 0;
      }
    }

    .dot {
      fill: #ff6b6b;
      opacity: 0;
    }

    .is-loading .dot1 {
      animation: dot1 2s linear 0.5s infinite;
    }
    @keyframes dot1 {
      0% {
        opacity: 0;
      }
      33.33% {
        opacity: 1;
      }
      66.66% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }

    .is-loading .dot2 {
      animation: dot2 2s linear 0.5s infinite;
    }

    @keyframes dot2 {
      0% {
        opacity: 0;
      }
      33.33% {
        opacity: 0;
      }
      66.66% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .is-loading .dot3 {
      animation: dot3 2s linear 0.5s infinite;
    }

    @keyframes dot3 {
      0% {
        opacity: 0;
      }
      33.33% {
        opacity: 0;
      }
      66.66% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
}

// 动态样式
.video-main-wrapper {
  // 全屏
  &.full-webpage,
  &.full-window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    .video-controller {
      height: 60px;
      .icon {
        font-size: 26px;
      }
    }

    .pause-tip {
      bottom: 60px;
    }
  }
}

// 视频下方，发送弹幕的盒子
.danmu-sendbar {
  display: flex;
  align-items: center;
  width: 100%;
  flex: 0 0 45px;
  padding: 0 10px;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px #e6e6e6;
  border-radius: 2px;
  box-sizing: border-box;

  .danmu-sendbar-left {
    box-sizing: border-box;
    width: 300px;
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
  }

  .danmu-sendbar-right {
    flex: 1;
    display: flex;
  }
}

// 弹幕切换开关
.danmu-switch-btn {
  position: relative;
  width: 30px;
  height: 19px;
  margin-left: 10px;
  background: #757575;
  border-radius: 30px;
  vertical-align: -4px;
  cursor: pointer;
  -webkit-appearance: none;

  &:before {
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

  &:checked {
    background: #ff6b6b;
  }

  &:checked:before {
    left: 12px;
    color: #ff6b6b;
    transition: all 0.2s linear;
  }
}
</style>
