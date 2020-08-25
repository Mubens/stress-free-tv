<template>
  <div class="danmu-pool" @click="isPause = !isPause" ref="container"></div>
</template>

<script>
export default {
  props: {},
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
      rollTrack: [],
      // 顶部弹幕
      TopTrack: [],
      // 弹幕容器
      container: {},
      // 自定义样式
      cssLsit: ['color', 'font-size']
    }
  }
}
/* <script>export default {
  props: {
    danmuData: { type: Array, default: () => [] },
    currentTime: { type: Number, default: 0 }
  },
  data () {
    return {
      isPause: true,
      danmuList: [
        { content: '弹幕君1', time: 0 },
        { content: '弹幕君222', time: 0 },
        { content: '弹幕君33', time: 0 },
        { content: '弹幕君4', time: 0 },
        { content: '弹幕君5555555', time: 1 },
        { content: '弹幕君666666666', time: 1 },
        { content: '弹幕君7', time: 2 },
        { content: '弹幕君88888', time: 6 },
        { content: '弹幕君99999999999999999', time: 7 }
      ],
      list: [],
      danmuPool: [
        // [{ id: 1, content: '尼玛打打算', duration: 6, play: true }],
        // [{ id: 4, content: '尼玛打打算塞萨多', duration: 6, play: true }],
        [],
        [],
        []
      ],
      container: { width: 0 },
      timer: null,
      startTime: 0,
      increaseId: 0,
      lastDanmus: []
    }
  },
  methods: {
    sortDanmu () {
      const arr = []
      this.deepCopy(arr, this.danmuList)
      arr.sort((a, b) => {
        return a.time - b.time
      })
      this.list = arr
      return arr
    },
    deepCopy (newObj, oldObj) {
      for (const k in oldObj) {
        const item = oldObj[k]
        if (item instanceof Array) {
          newObj[k] = []
          this.deepCopy(newObj[k], item)
        } else if (item instanceof Object) {
          newObj[k] = {}
          this.deepCopy(newObj[k], item)
        } else {
          newObj[k] = item
        }
      }
      return
    },
    judge (newEle, lastEle) {
      const newDanmu = newEle.getBoundingClientRect()
      const newDanmuT = (this.container.width) / ((this.container.width + newDanmu.width) / 6)
      const lastDanmu = lastEle.getBoundingClientRect()
      const lastDanmuT = (this.container.width) / ((this.container.width + lastDanmu.width) / 6)

      let flag = false
      if (lastDanmuT < newDanmuT) {
        flag = true
      }

      return { flag, lastT: lastDanmuT, newT: newDanmuT }
    },
    pushBySecond (time) {
      const arr = this.list.filter(item => item.time === time)
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].id = this.increaseId++
          arr[i].duration = 6
          arr[i].anime = false

          if (!this.danmuPool[i]) {
            this.danmuPool[i] = []
          }
          this.danmuPool[i].push(arr[i])

          this.$nextTick(() => {
            // 动画结束
            this.$refs[arr[i].id][0].addEventListener('animationend', () => {
              this.danmuPool[i].shift()
            })

            // const newDanmu = this.$refs[arr[i].id][0].getBoundingClientRect()
            // const newDanmuT = (this.container.width) / ((this.container.width + newDanmu.width) / 6)

            const lastDanmus = this.danmuPool.map(item => item[item.length - 2])

            for (let j = 0; j < lastDanmus.length; j++) {
              if (lastDanmus[j]) {
                // const lastDanmu = this.$refs[lastDanmus[j].id][0].getBoundingClientRect()
                // const lastDanmuT = (this.container.width) / ((this.container.width + lastDanmu.width) / 6)

                // if (lastDanmuT < newDanmuT) {
                //   return true
                // } else {
                //   return false
                // }
                const { flag, newT, lastT } = this.judge(this.$refs[arr[i].id][0], this.$refs[lastDanmus[j].id][0])
                if (flag) {
                  arr[i].anime = true
                  break
                } else {
                  // arr[i].delay = lastT - newT
                  // console.log(-newT + lastT)
                }
              } else {
                arr[i].anime = true
              }
            }
          })

        }

        this.$nextTick(() => {
          for (let i = 0; i < this.lastDanmus.length; i++) {
            // this.$refs[arr[i].id][0].addEventListener('animationstart', () => {
            //   if (this.lastDanmus.length) {
            //     const newDanmuR = this.$refs[arr[i].id][0].getBoundingClientRect()
            //     const newDanmuT = (this.container.width) / ((this.container.width + newDanmuR.width) / 6)

            //     for (let j = 0; j < this.lastDanmus.length; j++) {
            //       const lastDanmu = this.$refs[this.lastDanmus[j].id]
            //       if (!lastDanmu) {
            //         return
            //       }
            //       const lastDanmuR = lastDanmu[0].getBoundingClientRect()
            //       const lastDanmuT = (this.container.width) / ((this.container.width + lastDanmuR.width) / 6)

            //       // if (lastDanmuT < newDanmuT) {
            //       //   console.log('ok')
            //       //   return
            //       // } else {
            //       //   console.log('next')
            //       // }
            //       console.log(lastDanmuT,
            //         newDanmuT)
            //     }
            //   }
            // })

            // 动画结束
            this.$refs[this.lastDanmus[i].id][0].addEventListener('animationend', () => {
              this.danmuPool[i].shift()
            })
          }
        })
      }
    },
    loop () {
      this.timer = setInterval(() => {
        if (this.isPause) {
          clearInterval(this.timer)
        } else {
          this.startTime++
          this.pushBySecond(this.startTime)
        }
      }, 1000)
    }
  },
  watch: {
    isPause () {
      this.loop()
    }
  },
  mounted () {
    this.container = this.$refs.container.getBoundingClientRect()
    this.startTime = Math.floor(this.currentTime)

    this.sortDanmu()

    this.pushBySecond(this.startTime)
    this.loop()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
} */
</script>

<style lang="less">
.danmu-pool {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  span {
    // display: inline-block;
    position: absolute;
    // height: 20px;
    // line-height: 32px;
    // background-color: tomato;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    /* animation-play-state: paused; */
  }

  @keyframes danmu-anime {
    100% {
      transform: translateX(-100%);
    }
  }
}
</style>