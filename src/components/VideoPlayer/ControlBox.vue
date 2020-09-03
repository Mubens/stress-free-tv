<template>
  <div class="control-box">
    <!-- 左控制器 -->
    <LeftControl
      :mode="mode"
      :isPlaying="isPlaying"
      :playOrPause="playOrPause"
      :duration="duration"
      :percent="percent"
      :setVTime="setVTime"
    >
      <slot name="play-next" slot="play-next" />
    </LeftControl>
    <!-- <div class="center-box"> -->
    <slot name="danmu" />
    <!-- </div> -->
    <!-- 右控制器 -->
    <RightControl
      :volume="volume"
      :setMute="setMute"
      :mode="mode"
      :setScreenMode="setScreenMode"
      :fullScreen="fullScreen"
      :setVVolume="setVVolume"
    />
  </div>
</template>

<script>
import LeftControl from './LeftControl'
import RightControl from './RightControl'

export default {
  props: {
    mode: Number,
    isPlaying: Boolean,
    playOrPause: Function,
    setScreenMode: Function,
    fullScreen: Function,
    duration: Number,
    percent: Number,
    setVTime: Function,
    setVVolume: Function,
    volume: Number
  },
  data () {
    return {
      lastVolume: 0
    }
  },
  methods: {
    setMute () {
      if (this.volume !== 0) {
        this.lastVolume = this.volume
        this.setVVolume(0)
      } else {
        this.setVVolume(this.lastVolume)
      }
    }
  },
  components: {
    LeftControl, RightControl
  }
}
</script>

<style lang="less">
.control-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: #ffffff;

  .center-box {
    flex: 0.5;
    align-self: center;
  }

  .icon {
    margin: 0 8px;
    font-size: 22px;
    cursor: pointer;
  }

  .control {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>