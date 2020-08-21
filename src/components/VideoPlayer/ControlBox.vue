<template>
  <div class="control-box">
    <!-- 左控制器 -->
    <div class="control left-control">
      <span class="icon" :class="isPlaying ? 'icon-pause' : 'icon-play'" @click="playOrPause"></span>
      <span class="icon icon-play-next"></span>
      <div class="time-box">
        <input class="time-input" type="text" v-if="isInput" @blur="isInput = false" ref="input" />
        <div class="time-text" v-else @click="setVideoTime">
          <span>{{ '00:00' }}</span>
          <span class="split">/</span>
          <span>{{ '00:00' }}</span>
        </div>
      </div>
    </div>
    <!-- 右控制器 -->
    <div class="control right-control">
      <span class="icon icon-volume"></span>
      <template v-if="mode !== 3">
        <span
          class="icon"
          :class="mode === 1 ? 'icon-wide-off' : 'icon-wide-on'"
          @click="modeChange(1)"
        ></span>
        <span
          class="icon"
          :class="mode === 2 ? 'icon-webfull-off' : 'icon-webfull-on'"
          @click="modeChange(2)"
        ></span>
      </template>
      <span class="icon icon-full-screen" @click="fullScreen"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mode: Number,
    isPlaying: Boolean,
    playOrPause: Function,
    modeChange: Function,
    fullScreen: Function
  },
  data () {
    return {
      isInput: false,
      isFullScreen: false
    }
  },
  methods: {
    setVideoTime () {
      this.isInput = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
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
        height: 100%;
        width: 60px;
        margin: 0 auto;
        text-align: center;
        padding: 4px;
        background-color: #343434;
        color: #edd;
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
  }
}
</style>