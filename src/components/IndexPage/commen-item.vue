<template>
 <div class="block-area">
   <div class="block-left">
     <h3 class="block-title">{{ title }}</h3>
     <slot />
   </div>
   <div class="block-right" v-if="$slots.right">
     <slot name="right" />
   </div>
 </div>
</template>

<script>
 export default {
   props: {
     title: { type: String, default: '标题' }
   }
 }
</script>

<style lang="less">
.block-area {
  position: relative;
  display: flex;

  .block-left {
    flex: 1;
  }

  .block-right {
    width: 260px;
    margin-left: 15px;
  }

  .block-title {
    font-size: 22px;
    line-height: 2em;
    font-weight: 700;
  }
}
</style>