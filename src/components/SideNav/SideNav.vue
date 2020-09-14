<template>
  <div class="guide">
    <div class="nar-btn">
      <i class="icon icon-toggle" @click="toggleNavNarrow"></i>
    </div>
    <SideItem :list="prod" />
    <!-- <SideItem :list="user" /> -->
  </div>
</template>

<script>
import SideItem from './SideItem'

import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      prod: [
        { name: 'Home', url: '/', title: '首页', icon: 'icon-home' },
        { name: 'Movie', url: '/movie', title: '电影', icon: 'icon-movie' },
        { name: 'Game', url: '/game', title: '游戏', icon: 'icon-game' },
        { name: 'Anime', url: '/anime', title: '动漫', icon: 'icon-anime' }
      ],
      // user: [
      //   { name: 'History', url: '/history', title: '历史', icon: 'icon-history-play' },
      //   // { name: 'Later', url: '/later', title: '稍后播放', icon: 'icon-later-play' },
      //   { name: 'Subs', url: '/bangumi', title: '订阅', icon: 'icon-subscribe' },
      //   { name: 'Collect', url: '/favlist', title: '收藏', icon: 'icon-collection' }
      // ]
    }
  },
  methods: {
    ...mapMutations(['toggleNavNarrow']),
    toggleNavNarrow () {
      this.$store.commit('toggleNavNarrow')
    },
    hideNav () {
      if (this.$store.state.hideNav) {
        this.$store.commit('toggleNavNarrow', true)
      }
    }
  },
  components: {
    SideItem
  }
}
</script>

<style lang="less" >
.guide {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  .nar-btn {
    position: sticky;
    top: 0;
    width: 100%;
    height: 56px;
  }

  .icon-toggle {
    position: relative;
    top: 18px;
    left: 20px;
    width: 24px;
    height: 24px;
    padding: 8px;
    margin-bottom: 14px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #e5e5e5;
    }
    font-size: 24px;
    color: #000000;
  }
}
</style>
