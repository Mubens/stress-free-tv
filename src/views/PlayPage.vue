<template>
  <div id="play-page" class="video-wrap">
    <div class="left-wrap">
      <div class="view-box">
        <div class="if"></div>
      </div>
      <div class="player-wrap" :class="normalOrWide">
        <VideoPlayer :mode="mode" :modeChange="modeChange" />
      </div>
    </div>
    <div class="right-wrap">1</div>
  </div>
</template>

<script>
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'

export default {
  data () {
    return {
      mode: 0  // 0: normal-size, 1: wide-size, 2: full-webpage, 3: full-window
    }
  },
  methods: {
    modeChange (type) {
      if (this.mode !== type) {
        this.mode = type
      } else {
        this.mode = 0
      }
    }
  },
  watch: {
    mode () {
      const doc = document.documentElement || document.body
      if (this.mode === 2) {
        doc.style.overflow = 'hidden'
      } else {
        doc.style.overflow = 'auto'
      }
    }
  },
  computed: {
    normalOrWide () {
      if (this.mode === 0) {
        return 'normal-size'
      }
      if (this.mode === 1) {
        return 'wide-size big-size'
      }
      return ''
    }
  },
  mounted () {
  },
  components: { VideoPlayer }
}
</script>

<style lang="less">
.video-wrap {
  position: relative;
  top: 0;
  left: 0;
  width: 80%;
  min-width: 1098px;
  max-width: 1512px;
  margin: 0 auto;

  .left-wrap {
    box-sizing: border-box;
    width: 100%;

    & > div {
      box-sizing: border-box;
      padding-right: 350px;
    }
  }

  .right-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
  }

  .player-wrap {
    width: 100%;
  }

  .if {
    width: 100%;
    height: 56px;
    background-color: pink;
  }
}

#play-page {
  .big-size {
    padding-right: 0;
  }
}
</style>