<template>
  <div class="wrapper">
    <MixinList />
    <FilterOptions />
  </div>
</template>

<script>
import MixinList from '../components/SearchPage/MixinList'
import FilterOptions from '../components/SearchPage/FilterOptions'

export default {
  components: {
    MixinList,
    FilterOptions
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  width: 1160px;
  margin-top: 15px;
}

@media screen and (max-width: 1400px) {
  .wrapper {
    width: 980px;
  }
}
</style>