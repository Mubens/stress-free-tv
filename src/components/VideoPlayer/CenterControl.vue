<template>
  <div class="center-control">
    <slot></slot>
    <slot name="danmu"></slot>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.center-control {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  .danmu-send {
    width: 50%;
    max-width: 550px;
  }
}
</style>