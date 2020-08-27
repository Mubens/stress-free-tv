<template>
  <div class="danmu-pool" ref="container"></div>
</template>

<script>
export default {
  props: {
    danmu: { type: Array, default: () => [] },
    isPlaying: { type: Boolean }
  },
  data () {
    return {
      // 每行最大弹幕数
      MAX_COUNT_INLINE: 8,
      // 轨道个数
      TRACK_COUNT: 12,
      // 弹幕数组
      barrages: [],
      // DOM 池
      rollDomPool: [],
      topDomPool: [],
      // 定时器
      timer: null,
      // 取弹幕的时间间隔 ms
      interval: 300,
      // 弹幕移动时间 s
      duration: 6,
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
  watch: {
    isPlaying (flag) {
      // console.log(flag)
      if (flag) {
        this.danmuPlay()
      } else {
        this.danmuPause()
      }
    }
  },
  methods: {
    /* 初始化 */
    init () {
      // 初始化 rollDomPool
      for (let row = 0; row < this.TRACK_COUNT; row++) {
        const doms = []
        for (let col = 0; col < this.MAX_COUNT_INLINE; col++) {
          // 初始化 dom，重复利用这些 dom
          const span = document.createElement('span')
          // 固定每个通道内 dom 元素的 top
          span.className = 'roll-danmu'
          span.style.top = `${row * 1.3}em`

          // animation 完成后的初始化动作
          span.addEventListener('animationend', () => {
            span.style.animationName = ''
            span.style.transform = `translateX(-100%)`
            span.style.border = 'none'

            // 清空自定义样式
            this.cssLsit.forEach(key => {
              span.style[key] = null
            })

            // 设置当前 dom 状态为空闲
            if (this.rollDomPool[row][col]) {
              this.rollDomPool[row][col].isFree = true
            }
          })

          doms.push({
            el: span,
            row,
            col,
            isFree: true,
            isAppended: false
          })
        }
        // 放入第 row 个通道
        this.rollDomPool.push(doms)
      }

      // freeRollTrack 标记每个通道是否处于空闲状态
      for (let row = 0; row < this.TRACK_COUNT; row++) {
        this.freeRollTrack[row] = true
        this.freeTopTrack[row] = true
      }
    },
    /* 获取可以发射滚动弹幕的通道 */
    getRollTrack () {
      for (let i = 0; i < this.TRACK_COUNT; i++) {
        if (this.freeRollTrack[i]) {
          return i
        }
      }
      return -1
    },
    /* 获取可以发送滚动弹幕的容器 */
    findFreeRollDom (track) {
      return this.rollDomPool[track].find(item => item.isFree)
    },
    /* 获取可以发射顶部弹幕的通道 */
    getTopTrack () {
      for (let i = 0; i < this.TRACK_COUNT; i++) {
        if (this.freeTopTrack[i]) {
          return i
        }
      }
      return -1
    },
    /* 发送滚动弹幕 */
    shootRollDanmu (domItem, danmu, track) {
      // console.log(domItem, danmu, track)
      // 设置当前通道状态为非空闲
      this.freeRollTrack[track] = false
      // 设置当前 dom 为非空闲
      domItem.isFree = false

      const span = domItem.el
      // 如果该 dom 还没有添加到视图容器中，把它添加到容器
      if (!domItem.isAppended && this.container) {
        domItem.isAppended = true
        this.container.appendChild(span)
      }

      // 添加弹幕内容，可以获取弹幕元素的宽高
      span.innerText = danmu.text
      // animation-duration 时间，把容器宽度分为 150 份
      domItem.duration = this.container.clientWidth / 150
      domItem.speed = (this.container.clientWidth + span.clientWidth) / domItem.duration

      // 每个 dompool 通道的第 MAX_COUNT_INLINE 个用来存放最后一条弹幕的信息，用于和新弹幕的比较
      const lastDom = this.rollDomPool[track][this.MAX_COUNT_INLINE]
      // 如果上一个 dom 为非空闲（在动画中），要看看新弹幕会不会追上旧弹幕：
      //    新弹幕的右侧会不会追上上一条弹幕的右侧
      //    追及时间 = 路程差 - 速度差 > 0
      if (lastDom && !lastDom.isFree) {
        // 上一条弹幕的剩余路程 = 弹幕的右侧 - 容器的左侧
        const restDistance = lastDom.el.getBoundingClientRect().right - this.container.getBoundingClientRect().left
        const restTime = restDistance / lastDom.speed

        const catchDistance = domItem.speed * restTime
        // const newTime = (span.clientWidth + this.container.clientWidth) / domItem.speed
        // console.log(catchDistance, this.container.clientWidth)
        const willCatch = catchDistance - this.container.clientWidth
        if (willCatch > 0) {
          // 延迟播放
          span.style.animationDelay = `${willCatch / domItem.speed}s`
        }
      }
      // 存放这条弹幕的信息
      this.rollDomPool[track][this.MAX_COUNT_INLINE] = domItem

      // 添加自定义样式
      if (danmu.style) {
        const keys = Object.keys(danmu.style)
        keys.forEach(key => {
          // 检查样式合法性
          if (this.cssLsit.includes(key)) {
            span.style[key] = danmu.style[key]
          }
        })
      }

      // 刚刚发的弹幕
      if (danmu.isCurr) {
        span.style.border = '1px solid #FF6B6B'
      }

      // 添加动画效果
      span.style.animationName = 'danmu-roll'
      // 起始从屏幕右侧切入
      span.style.transform = `translateX(${this.container.clientWidth}px)`
      // 
      span.style.animationDuration = `${domItem.duration}s`

      // 弹幕右侧完全进入容器后，才能开始放下一条
      // t(s) = 弹幕的宽度 / 弹幕的移速
      setTimeout(() => {
        this.freeRollTrack[track] = true
      }, (span.clientWidth / domItem.speed) * 1000)
    },
    /* 发送顶部弹幕 */
    shootTopDanmu (danmu, track) {
      // 设置当前通道状态为非空闲
      this.freeTopTrack[track] = false

      // 弹幕显示持续时间
      const duration = 2

      // 动态复用 dom
      let span
      // 如果 topDomPool 中没有该通道，动态创建并 append 到 container 容器
      //    如果有，直接拿
      if (!this.topDomPool[track]) {
        span = document.createElement('div')
        span.className = 'top-danmu'
        span.style.top = `${track * 1.3}em`
        span.style.animationName = 'danmu-away'
        span.style.animationDuration = `${duration}s`

        this.container.appendChild(span)
      } else {
        span = this.topDomPool[track]
      }

      // 动画结束后初始化
      span.addEventListener('animationend', () => {
        span.style.visibility = 'hidden'

        // 清空自定义样式
        this.cssLsit.forEach(key => {
          span.style[key] = null
        })

        // 设置通道为空闲
        this.freeTopTrack[track] = true
      })

      span.style.visibility = 'visible'
      span.innerText = danmu.text

      // 刚刚发的弹幕
      if (danmu.isCurr) {
        span.style.border = '1px solid #FF6B6B'
      }

      // 添加自定义样式
      if (danmu.style) {
        const keys = Object.keys(danmu.style)
        keys.forEach(key => {
          // 检查样式合法性
          if (this.cssLsit.includes(key)) {
            span.style[key] = danmu.style[key]
          }
        })
      }
    },
    /* 播放弹幕动画 */
    danmuPlay () {
      // 开始播放
      for (let row = 0; row < this.TRACK_COUNT; row++) {
        for (let col = 0; col < this.MAX_COUNT_INLINE; col++) {
          if (!this.rollDomPool[row][col].isFree) {
            this.rollDomPool[row][col].el.style.animationPlayState = ''
          }
        }
      }
      // 每隔一段时间取弹幕
      this.timer = setInterval(() => {
        // 有弹幕就取
        if (this.danmu.length > 0) {
          // 取出第一条弹幕
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
            const topTrack = this.getTopTrack()
            if (topTrack > -1) {
              this.shootTopDanmu(danmu, topTrack)
            } else {
              this.danmu.push(danmu)
            }
          } else if (danmu.type === 'bottom') {
            // todo
          }
        }
      }, this.interval)
    },
    /* 停止播放弹幕 */
    danmuPause () {
      clearInterval(this.timer)
      for (let row = 0; row < this.TRACK_COUNT; row++) {
        for (let col = 0; col < this.MAX_COUNT_INLINE; col++) {
          if (!this.rollDomPool[row][col].isFree) {
            this.rollDomPool[row][col].el.style.animationPlayState = 'paused'
          }
        }
      }
    }
  },
  mounted () {
    this.container = this.$refs.container
    this.init()
  },
  beforeDestroy () {
    this.danmuPause()
  }
}
</script>

<style lang="less">
.danmu-pool {
  // display: flex;
  // justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  // background-color: skyblue;

  .roll-danmu {
    position: absolute;
    padding: 0 6px;
    color: #ffffff;
    font-size: 23px;
    line-height: 1.3em;
    animation-timing-function: linear;
  }

  .top-danmu {
    position: absolute;
    left: 50%;
    color: #ffffff;
    font-size: 23px;
    padding: 0 4px 0 2px;
    animation-timing-function: linear;
    transform: translateX(-50%);
  }

  @keyframes danmu-roll {
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes danmu-away {
    100% {
      visibility: hidden;
    }
  }
}
</style>