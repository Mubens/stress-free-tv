<template>
  <div class="progress-bar" @mousedown="mouseDown" ref="progress">
    <div class="progress">
      <span class="buffer" :style="{ 'width': buffer + '%' }"></span>
      <span class="current" :style="{ 'width': percent + '%' }"></span>
    </div>
    <div
      class="detail-wrapper"
      @mousemove.self="mouseMove2"
      @mouseover="mouseOver"
      @mouseout="
      mouseOut"
    >
      <div class="progress-detail" :class="{ 'visible': visible }">
        <div class="detail-sign" :style="{ 'left': signLeft + 'px' }"></div>
        <div class="detail-info" :style="{ 'left': infoLeft + 'px' }" ref="info">
          <img src alt />
          <span class="dtime">{{ detailTime | timeFormat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buffer: { type: Number, default: 0 },
    percent: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    setVTime: Function
  },
  data () {
    return {
      dragFlag: false, //拖拽状态标志
      dragPercent: 0,
      signLeft: 0,
      infoLeft: 0,
      detailFlag: false,
      detailTime: 0,
      timer: null,
      visible: false
    }
  },
  computed: {
    progress () {
      if (!this.dragFlag) {
        return this.percent
      } else {
        return this.dragPercent
      }
    }
  },
  methods: {
    mouseOver (event) {
      this.detailFlag = true
      this.timer = setTimeout(() => {
        this.visible = true
      }, 100)
    },
    mouseDown (event) {
      if (!this.dragFlag) {
        const e = event || window.event
        this.dragPercent = (e.offsetX / this.$refs.progress.offsetWidth) * 100
        this.setVTime(this.dragPercent)
        this.dragFlag = true
      }
    },
    mouseMove2 () {
      if (this.detailFlag) {
        const e = event || window.event

        const minOffsetX = this.$refs.info.clientWidth / 2
        const maxOffsetX = e.target.clientWidth - this.$refs.info.clientWidth / 2

        if (event.offsetX > maxOffsetX) {
          this.infoLeft = maxOffsetX
        } else if (event.offsetX < minOffsetX) {
          this.infoLeft = minOffsetX
        } else {
          this.infoLeft = event.offsetX
        }
        this.signLeft = event.offsetX
        this.detailTime = this.duration * (e.offsetX / this.$refs.progress.offsetWidth)
      }
    },
    mouseMove (event) {
      if (this.dragFlag) {
        const e = event || window.event
        const progress = this.$refs.progress
        let width = e.clientX - progress.getBoundingClientRect().left

        if (width < 0) {
          width = 0
        }
        if (width > progress.offsetWidth) {
          width = progress.offsetWidth
        }
        this.dragPercent = (width / progress.offsetWidth) * 100
        this.setVTime(this.dragPercent)

        // 解决拖动时选中页面中的文本
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
      }
    },
    mouseUp () {
      if (this.dragFlag) {
        this.setVTime(this.dragPercent, true)
        this.dragFlag = false
      }
    },
    mouseOut (e) {
      clearTimeout(this.timer)
      this.detailFlag = false
      this.visible = false
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
  mounted () {
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
  },
  beforeDestroy () {
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
  }
}
</script>

<style lang="less">
.progress-bar {
  position: relative;
  width: 98%;
  height: 10px;
  box-sizing: border-box;
  margin: 0 1%;
  cursor: pointer;
  // background-color: skyblue;

  &:hover .progress {
    height: 3px;
  }

  .progress {
    position: relative;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    transform: translateY(-50%);
    background-color: #7c7d824d;

    .buffer {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      border-radius: 5px;
      z-index: 3;
      background-color: #7c7c7c;
    }

    .current {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      border-radius: 5px;
      z-index: 3;
      background-color: #ff6b6b;
    }
  }

  .detail-wrapper {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 14px;
    transform: translateY(-50%);

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 99;
    }
  }

  .progress-detail {
    position: absolute;
    height: 100%;
    visibility: hidden;

    &.visible {
      visibility: visible;
    }
  }

  .detail-sign {
    position: absolute;
    // top: 50%;
    height: 100%;
    // transform: translateY(-50%);

    &::before {
      position: absolute;
      top: -2px;
      content: "";
      border-top: 5px solid #ff6b6b;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      transform: translateX(-50%);
    }

    &::after {
      position: absolute;
      bottom: -2px;
      content: "";
      border-left: 4px solid transparent;
      border-bottom: 5px solid #ff6b6b;
      border-right: 4px solid transparent;
      transform: translateX(-50%);
    }
  }

  .detail-info {
    position: absolute;
    width: 160px;
    height: 90px;
    left: 50%;
    bottom: 50%;
    color: #ffffff;
    transform: translate(-50%, -15%);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .dtime {
      position: absolute;
      bottom: 0;
      left: 50%;
      padding: 2px 4px;
      font-size: 12px;
      border-radius: 2px;
      background-color: #1c1a19ee;
      transform: translateX(-50%);
    }
  }
}
</style>
