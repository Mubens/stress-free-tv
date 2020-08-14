<template>
  <div class="wrapper">
    <Carousel />
    <div class="part-split">
      <div class="left-part">
        <ListBox>
          <h3 class="h-title">连载动画</h3>
        </ListBox>
        <ListBox>
          <h3 class="h-title">完结动画</h3>
        </ListBox>
      </div>
      <div class="right-part">123456</div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Anime/Carousel'
import ListBox from '../components/Anime/ListBox'

export default {
  components: {
    Carousel,
    ListBox
  }
}
</script>

<style lang="less">
.part-split {
  display: flex;

  .left-part {
    flex: 1;
  }
  .right-part {
    box-sizing: border-box;
    flex: 0 0 300px;
    height: 200px;
    padding-left: 40px;
    padding-top: 40px;
  }
}
</style>
