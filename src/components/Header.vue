<template>
  <div class="header">
    <div class="nar-btn" @click="narrowChange">
      <svg viewBox="0 0 24 24">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    narrowChange: Function
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
}
</style>
