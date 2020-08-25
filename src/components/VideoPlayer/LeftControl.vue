<template>
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
    <!-- <slot name="danmu" /> -->
  </div>
</template>

<script>
export default {
  props: {
    mode: Number,
    isPlaying: Boolean,
    playOrPause: Function,
    duration: Number,
    percent: Number,
    setCurrentTime: Function
  },
  data () {
    return {
      isInput: false,
      time: ''
    }
  },
  computed: {
    currentTime () {
      return this.percent * this.duration / 100
    }
  },
  methods: {
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
  components: {
    DanmuBox: () => import('./DanmuBox')
  }
}
</script>

<style lang="less">
.left-control {
  // float: left;
  padding-left: 10px;

  .time-box {
    display: flex;
    align-items: center;
    height: 22px;
    width: 84px;
    margin: 0 5px;
    text-align: center;
    color: #ffffff;
  }
  .time-input {
    display: inline-block;
    box-sizing: border-box;
    height: 100%;
    width: 80%;
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

.full-webpage {
  .time-box {
    height: 28px;
    width: 96px;
  }
  .time-text {
    line-height: 23px;
    font-size: 14px;
  }
  .time-input {
    font-size: 14px;
  }
}
</style>