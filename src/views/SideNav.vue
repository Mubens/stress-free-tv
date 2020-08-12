<template>
  <div class="guide">
    <SideItem :list="prod" :current="current" :changeCur="changeCur" />
    <SideItem :list="user" :current="current" :changeCur="changeCur" />
  </div>
</template>

<script>
import SideItem from '../components/SideItem'

export default {
  data () {
    return {
      current: '首页',
      prod: [
        { url: '#/', title: '首页', icon: 'icon-index' },
        { url: '#/movie', title: '电影', icon: 'icon-movie' },
        { url: '#/game', title: '游戏', icon: 'icon-game' },
        { url: '#/anime', title: '动漫', icon: 'icon-fan-ju' }
      ],
      user: [
        { url: '#/history', title: '播放历史', icon: 'icon-his-play' },
        { url: '#/playlist', title: '稍后播放', icon: 'icon-next-play' },
        { url: '#/zhuifan', title: '订阅', icon: 'icon-zhui-fan' },
        { url: '#/collect', title: '收藏', icon: 'icon-shou-cang' }
      ]
    }
  },
  methods: {
    changeCur (title) {
      this.current = title
    }
  },
  components: {
    SideItem
  }
}
</script>

<style lang="less" scoped>
@import url("../font/style.css");
.guide {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
