<template>
  <ul>
    <li class="item" :class="{ 'on': index === -1 }" @click="btnClick(item.key[0], -1)">全部</li>
    <li
      class="item"
      :class="{ 'on': index === i }"
      v-for="(option, i) in item.value"
      @click="btnClick(item.key[0], i)"
      :key="i"
    >{{ option }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    item: Object,
    filtrate: Function
  },
  data () {
    return {
      index: -1
    }
  },
  methods: {
    btnClick (key, val) {
      if (this.index === val) return
      this.index = val
      this.$emit('filtrate', key, val)
    }
  },
  created () {
    // console.log(this.$route.query[this.item.key[0]])
    // this.index = this.$route.query[this.item.key[0]]
    const query = this.$route.query[this.item.key[0]]
    this.index = query ? parseInt(query) : -1
    console.log(query)
  }
}
</script>

<style >
</style>