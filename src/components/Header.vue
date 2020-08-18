<template>
  <div class="header" @click.self="hideSide">
    <div class="nar-btn" @click="toggleSidesWide">
      <i class="icon icon-list"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['toggleSidesWide']),
    toggleSidesWide () {
      this.$store.commit('toggleSidesWide')
    },
    hideSide () {
      if (this.$store.state.hideSide) {
        this.$store.commit('toggleSidesWide', true)
      }
    },

  }
}
</script>

<style lang="less" >
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background-color: #ffffff;
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
