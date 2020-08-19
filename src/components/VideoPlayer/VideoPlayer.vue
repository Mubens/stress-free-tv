<template>
  <div class="video-player wide-screen">
    <div class="video-con">
      <video
        src="http://111.30.158.123/vmtt.tc.qq.com/1098_092e4b2c84764e5381f6cca2719c8e89.f0.mp4?vkey=208E75E6CBAE1EC93CB81DA59CEAF8845660A4039D782435C6BCAEF1029A500207377CC3F71F9544B3AF9F1DE97CBF47D3509DE58BCDA0070599E6F654A833048DC7DA41286D660CA3C9C8C14C2EB08E7F9396AD7EC36494"
        controls
      ></video>
    </div>
    <div class="danmu-box"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.video-player {
  width: 100%;
  height: 100%;

  background-color: pink;
  .video-con {
    width: 100%;
    height: calc(100% - 45px);
  }
  .danmu-box {
    height: 45px;

    background-color: #ffffff;
  }
}
.wide-screen .video-player {
  position: absolute;
  height: 901px;
  // 814px
  // 901px
}
@media screen and(max-width: 1756px) {
  .wide-screen .video-player {
    height: 814px;
  }
}
@media screen and(max-width: 1650px) {
  .wide-screen .video-player {
    height: 667px;
  }
}
</style>