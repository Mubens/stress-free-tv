<template>
  <div class="danmu-pool" ref="container"></div>
</template>

<script>
export default {
  props: {
    danmu: { type: Array, default: () => [] }
  },
  data () {
    return {
      // 每行最大弹幕数
      MAX_COUNT_INLINE: 5,
      // 轨道个数
      TRACK_COUNT: 8,
      // 弹幕数组
      barrages: [],
      // DOM 池
      domPool: [],
      timer: null,
      // 取弹幕的时间间隔 ms
      interval: 500,
      // 滚动弹幕通道
      freeRollTrack: [],
      // 顶部弹幕通道
      freeTopTrack: [],
      // 弹幕容器
      container: null,
      // 自定义样式
      cssLsit: ['color', 'font-size']
    }
  },
  methods: {
    init () {
      for (let row = 0; row < this.TRACK_COUNT; row++) {
        const doms = []
        for (let col = 0; col < this.MAX_COUNT_INLINE; col++) {
          // 初始化 dom
          const span = document.createElement('span')
          span.style.animationName = 'danmu-roll'
          span.style.top = `${row * 1.3}em`

          span.addEventListener('animationend', () => {
            // span.style.animationName = ''
            // span.style.transform = `translateX(${this.container.clientWidth}px)`
            span.innerText = ''

            if (this.domPool[row][col]) {
              this.domPool[row][col].isUsed = false
            }
          })

          doms.push({
            row,
            col,
            el: span,
            isUsed: false
          })
        }
        this.domPool.push(doms)
      }

      for (let row = 0; row < this.TRACK_COUNT; row++) {
        this.freeRollTrack[row] = true
        this.freeTopTrack[row] = true
      }
    },
    // 获取可以发射的弹幕
    getRollTrack () {
      for (let i = 0; i < this.TRACK_COUNT; i++) {
        if (this.freeRollTrack[i]) {
          return i
        }
      }
      return -1
    },
    findFreeRollDom (track) {
      return this.domPool[track].find(item => !item.isUsed)
    },
    getTopPlcae () {
      // todo
      return -1
    },
    shootRollDanmu (domItem, danmu, track) {
      // console.log(domItem, danmu, track)
      // 设置当前通道f
      this.freeRollTrack[track] = false
      const span = domItem.el
      if (!domItem.isUsed && this.container) {
        domItem.isUsed = true
        this.container.appendChild(span)
      }


      const domTrack = this.domPool[track][this.MAX_COUNT_INLINE]
      if (domTrack) {
        const lastDom = domTrack.el.getBoundingClientRect()
        console.log(lastDom)
      }

      this.domPool[track][this.MAX_COUNT_INLINE] = domItem

      // 添加自定义样式
      if (danmu.style) {
        const keys = Object.keys(danmu.style)
        keys.forEach(key => {
          // 检查样式合法性
          const isValuable = this.cssLsit.includes(key)
          if (isValuable) {
            span.style[key] = danmu.style[key]
          }
        })
      }

      // 从屏幕右侧进入
      span.style.transform = `translateX(${this.container.clientWidth}px)`
      // 添加弹幕内容
      span.innerText = danmu.text

      // 弹幕完全显示后，才能开始下一条
      setTimeout(() => {
        this.freeRollTrack[track] = true
      }, span.clientWidth * 10)
    },
    shootTopDanmu () { },
    /* 播放弹幕动画 */
    danmuPlay () {
      this.timer = setInterval(() => {
        // 有弹幕就取
        if (this.danmu.length > 0) {
          // 
          const danmu = this.danmu.shift()
          if (danmu.type === 'roll') {
            const rollTrack = this.getRollTrack()
            if (rollTrack > -1) {
              const dom = this.findFreeRollDom(rollTrack)
              this.shootRollDanmu(dom, danmu, rollTrack)
            } else {
              this.danmu.push(danmu)
            }
          } else if (danmu.type === 'top') {
            const topPlace = this.getTopPlcae()
            if (topPlace > -1) {
              this.shootTopDanmu(danmu, topPlace)
            } else {
              this.danmu.push(danmu)
            }
          }
        }
      }, this.interval)
    },
    danmuStop () {
      clearInterval(this.timer)
    }
  },
  mounted () {
    this.container = this.$refs.container
    // console.log(this.container)
    this.init()
    this.danmuPlay()
    // console.log(this.getRollTrack())
    // this.getRollTrack()
    // console.log(this.danmu)
  },
  beforeDestroy () {
    // this.danmuStop()
  }
}
</script>

<style lang="less">
.danmu-pool {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  span {
    position: absolute;
    line-height: 1.3em;
    // color: #ffffff;
    // left: 748px;
    // transform: translateX(748px);
    color: skyblue;
    font-size: 23px;
    // height: 20px;
    // line-height: 32px;
    // background-color: tomato;
    animation-name: danmu-roll;
    animation-timing-function: linear;
    // animation-fill-mode: forwards;
    animation-duration: 6s;
    /* animation-play-state: paused; */
  }

  @keyframes danmu-roll {
    100% {
      transform: translateX(-100%);
    }
  }
}
</style>