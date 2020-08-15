<template>
  <div class="wrapper">
    <!-- 轮播图 -->
    <Carousel />
    <div class="part-split">
      <!-- 左侧区 -->
      <div class="left-part">
        <NewUpate>
          <h3 class="h-title">最近更新</h3>
        </NewUpate>
        <ListBox>
          <h3 class="h-title">连载动画</h3>
        </ListBox>
        <ListBox>
          <h3 class="h-title">完结动画</h3>
        </ListBox>
      </div>
      <!-- 右侧区 -->
      <div class="right-part"></div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Anime/Carousel'
import NewUpate from '../components/Anime/NewUpate'
import ListBox from '../components/Anime/ListBox'

export default {
  components: {
    Carousel,
    NewUpate,
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
