<template>
  <div class="guide">
    <SideItem :list="prod" />
    <SideItem :list="user" />
  </div>
</template>

<script>
import SideItem from './SideItem'

export default {
  data () {
    return {
      prod: [
        { name: 'Home', url: '/', title: '首页', icon: 'icon-home' },
        { name: 'Movie', url: '/movie', title: '电影', icon: 'icon-movie' },
        { name: 'Game', url: '/game', title: '游戏', icon: 'icon-game' },
        { name: 'Anime', url: '/anime', title: '动漫', icon: 'icon-anime' }
      ],
      user: [
        { name: 'History', url: '/history', title: '播放历史', icon: 'icon-his-play' },
        { name: 'Later', url: '/later', title: '稍后播放', icon: 'icon-later-play' },
        { name: 'Subs', url: '/subs', title: '订阅', icon: 'icon-subs' },
        { name: 'Collect', url: '/collect', title: '收藏', icon: 'icon-collect' }
      ]
    }
  },
  components: {
    SideItem
  }
}
</script>

<style lang="less" >
// @import url("../../fonts/style.css");
.guide {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
