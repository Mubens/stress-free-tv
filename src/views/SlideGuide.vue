<template>
  <div class="guide">
    <SlideItem :list="prod" />
    <SlideItem :list="user" />
  </div>
</template>

<script>
import SlideItem from '../components/SlideItem'

export default {
  data() {
    return {
      prod: [
        { url: '/', title: '首页', icon: 'icon-index' },
        { url: '/movie', title: '电影', icon: 'icon-movie' },
        { url: '/game', title: '游戏', icon: 'icon-game' },
        { url: '/fanju', title: '番剧', icon: 'icon-fan-ju' }
      ],
      user: [
        { url: '/history', title: '视频历史', icon: 'icon-his-play' },
        { url: '/playlist', title: '稍后播放', icon: 'icon-next-play' },
        { url: '/zhuifan', title: '追番', icon: 'icon-zhui-fan' },
        { url: '/collect', title: '收藏', icon: 'icon-shou-cang' }
      ]
    }
  },
  components: {
    SlideItem
  }
}
</script>

<style lang="less" scoped>
@import url('../font/style.css');
.guide {
  width: 260px;
  height: 100%;
  background-color: #ffffff;
}
</style>
