<template>
  <div class="section">
    <template v-for="item in list">
      <a
        :href="item.url"
        class="item"
        :class="item.title === current ? 'selected' : ''"
        @click="changeCur(item.title)"
        :key="item.url"
      >
        <i class="icon" :class="item.icon" :key="item.icon"></i>
        <span :key="item.title">{{ item.title }}</span>
      </a>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    current: String,
    changeCur: Function
  }
}
</script>

<style lang="less" scoped>
.section {
  padding: 16px 0;
  border-bottom: 1px solid #e4e4e4;
}

.item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 24px;

  &:hover {
    background-color: #f2f2f2;
  }
  &.selected {
    background-color: #e5e5e5;
    .icon {
      color: #ff6b6b;
    }
  }

  .icon {
    color: #606060;
    font-size: 22px;
  }

  span {
    padding-left: 20px;
  }
}
</style>
