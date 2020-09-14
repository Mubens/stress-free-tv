<template>
  <div id="anime" class="wrapper">
    <!-- 轮播图 -->
    <Carousel />
    <NewUpate>
      <h3 class="h-title" slot="title">最近更新</h3>
    </NewUpate>
    <ListBox>
      <h3 class="h-title" slot="title">连载动画</h3>
    </ListBox>
    <ListBox>
      <h3 class="h-title" slot="title">完结动画</h3>
    </ListBox>
  </div>
</template>

<script>
import Carousel from '../../components/Anime/Carousel'
import NewUpate from '../../components/Anime/NewUpate'
import ListBox from '../../components/Anime/ListBox'

export default {
  components: {
    Carousel,
    NewUpate,
    ListBox
  }
}
</script>

<style lang="less">
#anime {
  box-sizing: border-box;
  // padding: 0 120px;
  width: 1240px;
}
.part-split {
  display: flex;

  .left-part {
    flex: 1;
  }
  .right-part {
    box-sizing: border-box;
    flex: 0 0 340px;
    padding-left: 40px;
  }
}

@media screen and(max-width: 1400px) {
  #anime {
    // padding: 200px;
    width: 980px;
  }
}
</style>
