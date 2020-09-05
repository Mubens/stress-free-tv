<template>
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
        @click="setScreenMode(1)"
      ></span>
      <!-- 网页全屏 -->
      <span
        class="icon"
        :class="mode === 2 ? 'icon-webfull-off' : 'icon-webfull-on'"
        @click="setScreenMode(2)"
      ></span>
    </template>
    <!-- 全屏 -->
    <span class="icon icon-full-screen" @click="fullScreen"></span>
  </div>
</template>

<script>
import { setLocal } from '../../assets/js/storage'

export default {
  props: {
    mode: Number,
    setScreenMode: Function,
    fullScreen: Function,
    volume: Number,
    setMute: Function,
    setVVolume: Function
  },
  data () {
    return {
      dragFlag: false
    }
  },
  methods: {
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
      this.setVVolume(1 - volume)
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
.right-control {
  // float: right;
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
    z-index: 99;

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
</style>