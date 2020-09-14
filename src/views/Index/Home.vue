<template>
  <!-- Home 页 -->
  <div id="home" class="wrapper">
    <h3 class="h-title">热门推荐</h3>
    <TopRecommend />
  </div>
</template>

<script>
import TopRecommend from '../../components/Home/TopRecommend'

export default {
  data () {
    return {}
  },
  components: {
    TopRecommend
  }
}
</script>

<style lang="less">
#home {
  width: 1512px;
}

@media screen and(max-width: 1655px) {
  #home {
    width: 1280px;
  }
}
</style>
