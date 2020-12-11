<template>
  <div class="video-info-wrapper">
    <div class="video-info">
      <img v-lazy="playData.img" />
      <div class="video-info-right">
        <div class="media-tool-bar">
          <a href="#">{{ playData.title }}</a>
        </div>
        <div class="video-count">
          {{ playData.pCount | numFormat }}播放 ·
          {{ playData.dCount | numFormat }}弹幕 ·
          {{ playData.cCount | numFormat }}追番
        </div>
        <div class="pub-wrapper">
          <a href="#">{{ playData.type }}</a>
          <div class="pub-info">{{ playData.status ? "完结" : "连载中" }}</div>
        </div>
        <a href="#">{{ playData.description }}</a>
        <div class="video-rating">
          <h4>{{ playData.score }}</h4>
          <p>{{ playData.sCount | numFormat }}人评分</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playData: Object
  },
  filters: {
    numFormat (num) {
      if (num < 10000) {
        return num
      }
      if (num < 100000000) {
        return (num / 10000).toFixed(1) + '万'
      }
      return (num / 100000000).toFixed(1) + '亿'
    }
  }
}
</script>

<style lang="less" scoped>
.video-info-wrapper {
  width: 100%;
  margin: 10px 0;

  .video-info {
    display: flex;
    padding: 20px 0;
    border-top: 1px solid #e5e9ef;
    border-bottom: 1px solid #e5e9ef;

    img {
      flex: 0 0 135px;
      height: 180px;
      margin-right: 15px;
      object-fit: cover;
    }

    .video-info-right > a {
      display: inline-block;
      margin: 6px 0 10px 0;
      font-size: 12px;
      color: #212121;
      line-height: 18px;
    }

    .media-tool-bar {
      height: 20px;
      a {
        font-size: 16px;
        line-height: 20px;
      }
    }

    .video-count {
      margin-top: 5px;
      line-height: 20px;
    }

    .pub-wrapper {
      display: flex;
      line-height: 24px;
      .pub-info {
        margin-left: 10px;
      }
    }

    .video-rating {
      h4 {
        font-size: 28px;
        color: #ffa726;
        &::after {
          content: "分";
          font-size: 12px;
        }
      }
    }
  }
}
</style>