<template>
  <div id="anime" class="wrapper">
    <!-- 轮播图 -->
    <Carousel />
    <RecentUpdate class="list-box" :list="recentList" />
    <IndexesItem />
    <ListBox class="list-box" title="连载动画" :list="serialList">
      <!-- <div style="height: 100%;"></div> -->
    </ListBox>
    <ListBox class="list-box" title="完结动画" :list="endList">
      <!-- <div style="height: 100%;"></div> -->
    </ListBox>
  </div>
</template>

<script>
import Carousel from '@/components/Anime/Carousel'
import RecentUpdate from '@/components/Anime/RecentUpdate'
import IndexesItem from '@/components/Anime/IndexesItem'
import ListBox from '@/components/Anime/ListBox'

export default {
  data () {
    return {
      recentList: [],
      serialList: [],
      endList: []
    }
  },
  methods: {
    async getRecentUpdate () {
      try {
        const res = (await this.$http.get('http://localhost:3000/api/index/recent_update')).data
        // console.log(res)
        if (!res.errno) {
          this.recentList = res.data
        }
      } catch (err) {

      }
    },
    async getSerialAnimation () {
      try {
        const res = (await this.$http.get('http://localhost:3000/api/index/serial_animation')).data
        // console.log(res)
        if (!res.errno) {
          this.serialList = res.data
        }
      } catch (err) {

      }
    },
    async getEndAnimation () {
      try {
        const res = (await this.$http.get('http://localhost:3000/api/index/end_animation')).data
        // console.log(res)
        if (!res.errno) {
          this.endList = res.data
        }
      } catch (err) {

      }
    }
  },
  created () {
    this.getRecentUpdate()
    this.getSerialAnimation()
    this.getEndAnimation()
  },
  components: {
    Carousel,
    IndexesItem,
    RecentUpdate,
    ListBox
  }
}
</script>

<style lang="less">
#anime {
  width: 1180px;

  .list-box {
    margin-bottom: 40px;
  }
}

@media screen and(max-width: 1400px) {
  #anime {
    width: 980px;
  }
}
</style>
