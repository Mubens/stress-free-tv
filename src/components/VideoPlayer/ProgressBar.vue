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
    setCurrentTime: Function
  },
  data () {
    return {
      dragFlag: false, //拖拽状态标志,
      // buffer: 0,
      // current: 0
    };
  },
  methods: {
  },
  mounted () {
    let width = 0
    let startX = 0
    let flag = false

    const progress = this.$refs.progress

    progress.addEventListener('mousedown', (e) => {
      e = e || window.e
      startX = e.clientX
      this.percent = (e.offsetX / progress.offsetWidth) * 100
      flag = true

      document.addEventListener('mousemove', (e) => {
        if (flag) {
          e = e || window.e
          width = e.clientX - document.querySelector('#play-page').offsetLeft

          if (width < 0) {
            width = 0
          }
          if (width > progress.offsetWidth) {
            width = progress.offsetWidth
          }

          this.percent = (width / progress.offsetWidth) * 100

          window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        }
      })
    })

    document.addEventListener('mouseup', () => {
      flag = false
    })
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
    height: 4px;
  }

  .progress {
    position: relative;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    transform: translateY(-50%);
    background-color: #7c7d824d;
    transition: all 0.2s;

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
      background-color: #23ade5;
    }
  }
}
</style>