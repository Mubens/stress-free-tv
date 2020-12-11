<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    model: Object,
    rules: Object
  },
  provide () {
    return {
      form: this
    }
  }
}
</script>

<style>
</style>