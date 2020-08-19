<template>
  <div class="header" @mousedown.self="hideNav">
    <div v-if="this.$store.state.hideNav" class="nar-btn" @click="toggleNavNarrow">
      <i class="icon icon-list"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['toggleNavNarrow']),
    toggleNavNarrow () {
      this.$store.commit('toggleNavNarrow')

    },
    hideNav () {
      if (this.$store.state.hideNav) {
        this.$store.commit('toggleNavNarrow', true)
      }
    }
  }
}
</script>

<style lang="less" >
.header {
  width: 100%;
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0 -2px 16px 0px rgba(0, 0, 0, 0.08);
  z-index: 999;

  .nar-btn {
    position: relative;
    top: 10px;
    left: 20px;
    width: 24px;
    height: 24px;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #e5e5e5;
    }
  }
  .icon {
    font-size: 24px;
    color: #000000;
  }
}
</style>
