<template>
  <div class="filter-wrap">
    <div class="filter-title">筛选</div>
    <div class="filter-list">
      <div class="filter-item" v-for="item in list" :key="item.key">
        <span class="filter">{{ item.name }}</span>
        <FilterList :list="item" v-bind="$attrs" v-on="$listeners" />
      </div>
    </div>
  </div>
</template>

<script>
import FilterList from './FilterList'

export default {
  props: {
    list: { type: Array, default: () => [] },
    setKeyValue: Function
  },
  inheritAttrs: false,
  methods: {},
  components: { FilterList }
}
</script>

<style lang="less">
.filter-wrap {
  width: 260px;
  color: #222222;
  font-size: 12px;
}

.filter-title {
  font-size: 18px;
  height: 44px;
}

.filter-item {
  display: flex;

  span {
    flex: 0 0 28px;
    margin-right: 20px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;

    li {
      box-sizing: border-box;
      min-width: 52px;
      height: 30px;
      padding-right: 15px;
    }

    .filter {
      color: #b3abb2;
    }

    .item {
      cursor: pointer;
    }
    .item.on {
      color: #ff6b6b;
    }
  }
}
</style>
