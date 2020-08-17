<template>
  <div class="section">
    <template v-for="item in list">
      <router-link :to="item.url" class="item" :key="item.url">
        <i class="icon" :class="item.icon" :key="item.icon"></i>
        <span :key="item.title">{{ item.title }}</span>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    current: String,
    // changeCur: Function
  }
}
</script>

<style lang="less" >
.section {
  padding: 8px 0;
  border-bottom: 1px solid #e4e4e4;

  .item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 28px;

    &:hover {
      background-color: #f2f2f2;
    }
    // &.selected {
    //   background-color: #e5e5e5;
    //   .icon {
    //     color: #ff6b6b;
    //   }
    // }
    &.router-link-active {
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
}
</style>

<style lang="less">
// css in App.vue
.container {
  display: flex;
  padding-top: 56px;
  width: 100%;

  background-color: #f9f9f9;
}
.side-box {
  position: fixed;
  width: 220px;
  height: calc(100% - 56px);
  z-index: 99;
  overflow-y: auto;

  &.narrow {
    width: 80px;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: 0 8px;
      height: 60px;
    }
    span {
      padding: 4px 0 0;
      font-size: 12px;
    }
  }

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>