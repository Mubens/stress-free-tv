<template>
  <div class="danmu-pool" ref="container"></div>
</template>

<script>
export default {
  props: {
    danmu: { type: Array, default: () => [] },
    isPlaying: { type: Boolean }
  },
  data() {
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
      bottomDomPool: [],
      // 每个轨道的上一条弹幕
      lastDom: [],
      // 定时器
      timer: null,
      // 取弹幕的时间间隔 ms
      interval: 300,
      // 弹幕通道
      freeRollTrack: [],
      freeTopTrack: [],
      freeBottomTrack: [],
      // 弹幕容器
      container: null,
      // 自定义样式
      cssLsit: ['color', 'font-size']
    }
  },
  watch: {
    isPlaying(flag) {
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
    init() {
      this.$refs.container.innerHTML = ''
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
            this.cssLsit.forEach((key) => {
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
        this.freeBottomTrack[row] = true
      }
    },
    /* 获取可以发送滚动弹幕的 dom */
    findFreeRollDom(track) {
      return this.rollDomPool[track].find((item) => item.isFree)
    },
    /* 获取可以发射弹幕的通道 */
    getTrack(type) {
      let trackType = null
      if (type === 'roll') {
        trackType = this.freeRollTrack
      } else if (type === 'top') {
        trackType = this.freeTopTrack
      } else if (type === 'bottom') {
        trackType = this.freeBottomTrack
      } else {
        return -1
      }

      for (let i = 0; i < this.TRACK_COUNT; i++) {
        if (trackType[i]) {
          return i
        }
      }
      return -1
    },
    /* 发送滚动弹幕 */
    shootRollDanmu(domItem, danmu, track) {
      // console.log(domItem, danmu, track)
      // 设置当前通道状态为非空闲
      this.freeRollTrack[track] = false
      // 设置当前 dom 为非空闲

      // console.log(JSON.stringify(domItem))
      domItem.isFree = false
      // console.log(domItem.isFree)

      const span = domItem.el
      // 如果该 dom 还没有添加到视图容器中，把它添加到容器
      if (!domItem.isAppended && this.container) {
        domItem.isAppended = true
        this.container.appendChild(span)
      }

      // 添加弹幕内容，可以获取弹幕元素的宽高
      span.innerText = danmu.content
      // animation-duration 时间，把容器宽度分为 150 份
      domItem.duration = this.container.clientWidth / 150
      domItem.speed = (this.container.clientWidth + span.clientWidth) / domItem.duration
      // 延迟时间
      let delay = 0

      // 每个 lastDom 通道用来存放最后一条弹幕的信息，用于和新弹幕的比较
      const lastDom = this.lastDom[track]
      // 如果上一个 dom 为非空闲（在动画中），要看看新弹幕会不会追上旧弹幕：
      //    新弹幕的右侧会不会追上上一条弹幕的右侧
      if (lastDom && !lastDom.isFree) {
        // 上一条弹幕的 剩余路程 = 弹幕的右侧 - 容器的左侧
        const restDistance = lastDom.el.getBoundingClientRect().right - this.container.getBoundingClientRect().left
        // 剩余时间 = 剩余路程 / 上一条弹幕的速度
        const restTime = restDistance / lastDom.speed
        // 新弹幕能跑的路程 = 新弹幕的速度 * 剩余时间
        const catchDistance = domItem.speed * restTime
        // 如果这段时间够新弹幕跑完，说明会追上
        const willCatch = catchDistance - this.container.clientWidth
        if (willCatch > 0) {
          // 延迟播放
          delay = willCatch / domItem.speed
          span.style.animationDelay = `${delay}s`
        }
      }
      // 存放这条弹幕的信息
      this.lastDom[track] = domItem

      // 添加自定义样式
      if (danmu.style) {
        const keys = Object.keys(danmu.style)
        keys.forEach((key) => {
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
      span.style.animationDuration = `${domItem.duration}s`

      // 弹幕右侧完全进入容器后，才能开始放下一条
      // t(s) = 弹幕的宽度 / 弹幕的移速
      setTimeout(() => {
        this.freeRollTrack[track] = true
      }, (span.clientWidth / domItem.speed + delay) * 1000)
    },
    /* 发送顶部/底部弹幕 */
    shootFixedDanmu(type, danmu, track) {
      let domPoll = null
      if (type === 'top') {
        domPoll = this.topDomPool
      } else if (type === 'bottom') {
        domPoll = this.bottomDomPool
      } else {
        return
      }

      // 设置当前通道状态为非空闲
      this.freeTopTrack[track] = false

      // 弹幕显示持续时间
      const duration = 1.5

      // 动态复用 dom
      let span
      // 如果 domPool 中没有该通道，动态创建并 append 到 container 容器
      //    如果有，直接拿
      if (!domPoll[track]) {
        span = document.createElement('div')
        span.className = 'fixed-danmu'
        span.style[type] = `${track * 1.3}em`
        span.style.animationName = 'danmu-away'
        span.style.animationDuration = `${duration}s`

        this.container.appendChild(span)
      } else {
        span = domPoll[track]
      }

      // 动画结束后初始化
      span.addEventListener('animationend', () => {
        span.style.visibility = 'hidden'

        // 清空自定义样式
        this.cssLsit.forEach((key) => {
          span.style[key] = null
        })

        // 设置通道为空闲
        this.freeTopTrack[track] = true
      })

      span.style.visibility = 'visible'
      span.innerText = danmu.content

      // 刚刚发的弹幕
      if (danmu.isCurr) {
        span.style.border = '1px solid #FF6B6B'
      }

      // 添加自定义样式
      if (danmu.style) {
        const keys = Object.keys(danmu.style)
        keys.forEach((key) => {
          // 检查样式合法性
          if (this.cssLsit.includes(key)) {
            span.style[key] = danmu.style[key]
          }
        })
      }
    },
    /* 播放弹幕动画 */
    danmuPlay() {
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
          // 判断弹幕类型
          const danmuType = danmu.type
          if (danmuType === 'roll') {
            // 获取空闲通道
            // console.log('danmu', danmu)
            const rollTrack = this.getTrack(danmuType)
            if (rollTrack > -1) {
              const dom = this.findFreeRollDom(rollTrack)
              if (dom != null) {
                this.shootRollDanmu(dom, danmu, rollTrack)
                return
              }
            }
            this.danmu.push(danmu)
          } else if (danmuType === 'top' || danmuType === 'bottom') {
            // 获取空闲通道
            const track = this.getTrack(danmuType)
            if (track > -1) {
              this.shootFixedDanmu(danmuType, danmu, track)
            } else {
              this.danmu.push(danmu)
            }
          }
        }
      }, this.interval)
    },
    /* 停止播放弹幕 */
    danmuPause() {
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
  mounted() {
    this.container = this.$refs.container
    this.init()
    if (this.isPlaying) {
      this.danmuPlay()
    }
  },
  beforeDestroy() {
    this.danmuPause()
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
  overflow: hidden;

  .roll-danmu {
    position: absolute;
    padding: 0 6px;
    color: #ffffff;
    font-size: 23px;
    line-height: 1.3em;
    animation-timing-function: linear;
  }

  .fixed-danmu {
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
