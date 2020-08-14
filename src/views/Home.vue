<template>
  <!-- Home 页 -->
  <div class="wrapper">
    <h3 class="h-title">热门推荐</h3>
    <Slider />
  </div>
</template>

<script>
import Slider from '../components/Home/TopRecommend'

export default {
  data () {
    return {}
  },
  components: {
    Slider
  }
}
</script>

<style lang="less"></style>
