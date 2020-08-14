<template>
  <div class="guide">
    <SideItem :list="prod" :current="current" :changeCur="changeCur" />
    <SideItem :list="user" :current="current" :changeCur="changeCur" />
  </div>
</template>

<script>
import SideItem from './SideItem'

import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      current: this.$store.state.routeName,
      prod: [
        { name: 'Home', url: '#/', title: '首页', icon: 'icon-index' },
        { name: 'Movie', url: '#/movie', title: '电影', icon: 'icon-movie' },
        { name: 'Game', url: '#/game', title: '游戏', icon: 'icon-game' },
        { name: 'Anime', url: '#/anime', title: '动漫', icon: 'icon-fan-ju' }
      ],
      user: [
        { name: 'History', url: '#/history', title: '播放历史', icon: 'icon-his-play' },
        { name: 'Later', url: '#/later', title: '稍后播放', icon: 'icon-next-play' },
        { name: 'Subs', url: '#/subs', title: '订阅', icon: 'icon-zhui-fan' },
        { name: 'Collect', url: '#/collect', title: '收藏', icon: 'icon-shou-cang' }
      ]
    }
  },

  methods: {
    ...mapMutations(['routeChange']),
    changeCur (name) {
      this.current = name
      this.$store.commit('routeChange', name)
    }
  },
  components: {
    SideItem
  }
}
</script>

<style lang="less" >
@import url("../../font/style.css");
.guide {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
