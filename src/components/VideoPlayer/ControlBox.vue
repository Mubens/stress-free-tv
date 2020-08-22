<template>
  <div class="control-box">
    <!-- 左控制器 -->
    <div class="control left-control">
      <span class="icon" :class="isPlaying ? 'icon-pause' : 'icon-play'" @click="playOrPause"></span>
      <span class="icon icon-play-next"></span>
      <div class="time-box">
        <input
          class="time-input"
          type="text"
          v-if="isInput"
          :value="time | timeFormat"
          @blur="setTime"
          ref="input"
        />
        <div class="time-text" v-else @click="inputFocus">
          <span>{{ currentTime | timeFormat }}</span>
          <span class="split">/</span>
          <span>{{ duration | timeFormat }}</span>
        </div>
      </div>
    </div>
    <!-- 右控制器 -->
    <div class="control right-control">
      <!-- 音量 -->
      <span
        class="icon volume-btn"
        :class="volume === 0 ? 'icon-mute' : 'icon-volume'"
        @click.self="setMute"
      >
        <div class="volume-box">
          <div class="volume-num">{{ parseInt(volume * 100) }}</div>
          <div class="volume-bar" ref="volBar">
            <div class="volume-bg">
              <div class="volume" :style="{ height: volume * 100 + '%' }"></div>
              <!-- 需要减去小球的top偏移 -->
              <!-- (100 - volume) - [(100 - volume) / 100] * 20 -->
              <div class="volume-ball" :style="{ top: 4 * (100 - volume * 100) / 5 + '%' }"></div>
            </div>
          </div>
        </div>
      </span>
      <template v-if="mode !== 3">
        <!-- 宽屏 -->
        <span
          class="icon"
          :class="mode === 1 ? 'icon-wide-off' : 'icon-wide-on'"
          @click="modeChange(1)"
        ></span>
        <!-- 网页全屏 -->
        <span
          class="icon"
          :class="mode === 2 ? 'icon-webfull-off' : 'icon-webfull-on'"
          @click="modeChange(2)"
        ></span>
      </template>
      <!-- 全屏 -->
      <span class="icon icon-full-screen" @click="fullScreen"></span>
    </div>
  </div>
</template>

<script>
import { setLocal } from '../../assets/js/storage'

export default {
  props: {
    mode: Number,
    isPlaying: Boolean,
    playOrPause: Function,
    modeChange: Function,
    fullScreen: Function,
    duration: Number,
    percent: Number,
    setCurrentTime: Function,
    setVolume: Function,
    volume: Number
  },
  data () {
    return {
      isInput: false,
      time: '',
      dragFlag: false,
      lastVolume: 0
    }
  },
  computed: {
    currentTime () {
      return this.percent * this.duration / 100
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
  methods: {
    setMute () {
      if (this.volume !== 0) {
        this.lastVolume = this.volume
        this.setVolume(0)
      } else {
        this.setVolume(this.lastVolume)
      }
    },
    inputFocus () {
      this.isInput = true
      this.$nextTick(() => {
        this.time = this.currentTime
        this.$refs.input.focus()
      })
    },
    setTime (e) {
      this.isInput = false
      const times = e.target.value.split(':')
      let time = 0

      for (let i = 1; i <= 3; i++) {
        if (times[times.length - i]) {
          time += +times[times.length - i] * 60 ** (i - 1)
        }
      }
      if (time < 0) {
        time = 0
      }
      if (time > this.duration) {
        time = this.duration
      }

      if (Math.ceil(this.time) < Math.round(time) || Math.floor(this.time) > Math.round(time)) {
        this.setCurrentTime((time / this.duration) * 100, true)
      }
    },
    mouseDown (event) {
      const e = event || window.event
      let volume = (e.pageY - this.offset(this.$refs.volBar).top) / this.$refs.volBar.offsetHeight
      if (volume <= 0) {
        volume = 0
      }
      if (volume >= 1) {
        volume = 1
      }
      // this.volume = (1 - volume) * 100
      this.setVolume(1 - volume)
      this.dragFlag = true
    },
    mouseMove (event) {
      if (this.dragFlag) {
        this.mouseDown(event)

        // 解决拖动时选中页面中的文本
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
      }
    },
    mouseUp () {
      if (this.dragFlag) {
        this.dragFlag = false
        setLocal('sptv-volume', this.volume)
      }
    },
    offset (curEle) {
      let totalLeft = null,
        totalTop = null,
        par = curEle.offsetParent
      // 首先把自己本身的进行累加
      totalLeft += curEle.offsetLeft
      totalTop += curEle.offsetTop

      // 只要没有找到body，我们就把父级参照物的边框和偏移量累加
      while (par) {
        if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
          // 不是标准的 ie8 浏览器，才进行边框累加
          // 累加父级参照物边框
          totalLeft += par.clientLeft
          totalTop += par.clientTop
        }
        // 累加父级参照物本身的偏移
        totalLeft += par.offsetLeft
        totalTop += par.offsetTop
        par = par.offsetParent
      }
      return { left: totalLeft, top: totalTop }
    }
  },
  mounted () {
    this.$refs.volBar.addEventListener('mousedown', this.mouseDown)
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
  },
  beforeDestroy () {
    this.$refs.volBar.removeEventListener('mousedown', this.mouseDown)
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
  }
}
</script>

<style lang="less">
.control-box {
  width: 100%;
  height: 100%;
  color: #ffffff;

  .icon {
    margin: 0 4px;
    font-size: 22px;
    cursor: pointer;
  }

  .control {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .left-control {
    float: left;
    padding-left: 10px;

    .time-box {
      display: flex;
      align-items: center;
      height: 22px;
      width: 84px;
      margin: 0 5px;
      text-align: center;
      color: #ffffff;

      .time-input {
        display: inline-block;
        box-sizing: border-box;
        height: 22px;
        width: 60px;
        margin: 0 auto;
        padding-top: 2px;
        border-radius: 2px;
        line-height: 22px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.9);
      }

      .time-text {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 4px;
        font-size: 13px;
        cursor: pointer;
      }
      .split {
        padding: 0 4px;
      }
    }
  }
  .right-control {
    float: right;
    padding-right: 10px;

    .volume-btn {
      position: relative;

      &:hover .volume-box {
        visibility: visible;
      }
    }

    .volume-box {
      visibility: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: -123px;
      left: -4px;
      width: 30px;
      height: 97px;
      background: rgba(34, 34, 34, 0.8);
      border-radius: 2px;
      transition: all ease 0.3s;
      cursor: default;

      .volume-num {
        width: 100%;
        height: 26px;
        text-align: center;
        line-height: 24px;
        font-size: 13px;
        color: #ffffff;
      }

      .volume-bar {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 60px;
        border-radius: 2px;
        cursor: pointer;
      }

      .volume-bg {
        position: relative;
        width: 2px;
        height: 60px;
        margin-bottom: 6px;
        background-color: #ffffff;
      }

      .volume {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #ff6b6b;
      }

      .volume-ball {
        position: relative;
        left: 50%;
        width: 12px;
        height: 12px;
        background-color: #ff6b6b;
        border-radius: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>