<template>
  <div class="progress-bar" ref="progress">
    <div class="progress">
      <span class="buffer" :style="{ width: buffer + '%' }"></span>
      <span class="current" :style="{ width: percent + '%' }"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buffer: { type: Number, default: 0 },
    percent: { type: Number, default: 0 },
    setVTime: Function
  },
  data () {
    return {
      dragFlag: false, //拖拽状态标志
      dragPercent: 0
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
    mouseDown (event) {
      if (!this.dragFlag) {
        const e = event || window.event
        this.dragPercent = (e.offsetX / this.$refs.progress.offsetWidth) * 100
        this.setVTime(this.dragPercent)
        this.dragFlag = true
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
    }
  },
  mounted () {
    this.$refs.progress.addEventListener('mousedown', this.mouseDown)
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
  },
  beforeDestroy () {
    this.$refs.progress.removeEventListener('mousedown', this.mouseDown)
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
  }
}
</script>

<style lang="less">
.progress-bar {
  width: 99.2%;
  height: 10px;
  box-sizing: border-box;
  margin: 0 0.4%;
  cursor: pointer;

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
    // transition: all 0.2s;

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
}
</style>
