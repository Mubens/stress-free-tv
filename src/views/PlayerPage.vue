<template>
  <!-- <div id="play-page" class="wrapper">
    <div class="left-wrapper">
      <div class="view-box"></div>
      <div class="video-wrapper wide-screen">
        <VideoPlayer />
      </div>
    </div>
    <div class="right-wrapper">
      <div class="up-info"></div>
    </div>
  </div>-->
  <div>
    <Bangumi />
  </div>
</template>

<script>
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
import Bangumi from './Bangumi'

export default {
  data () {
    return {
      playerHeight: 'height: 100%;'
    }
  },
  watch: {
    // playerHeight () {
    //   return 'height: ' + parseInt(this.$refs.wrapper.offsetWidth / 1.76) + 'px'
    // }
  },
  mounted () {
    // this.$refs.player.addEventListener
    // this.playerHeight = 'height: ' + parseInt(this.$refs.wrapper.offsetWidth / 1.65) + 'px'
  },
  components: { VideoPlayer, Bangumi }
}
</script>

<style lang="less">
#play-page {
  position: relative;
  display: flex;

  .left-wrapper {
    flex: 1;

    .view-box {
      height: 80px;

      background-color: springgreen;
    }
  }

  .right-wrapper {
    position: relative;
    flex: 0 0 320px;
    // padding: 0 20px;
    padding-left: 20px;
    .up-info {
      height: 80px;
      background-color: skyblue;
    }
  }

  .video-wrapper {
    // height: 821px;
  }
}
</style>