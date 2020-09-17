<template>
  <ul>
    <li
      class="item"
      :class="{ on: index === item.value }"
      v-for="(item, i) in list.options"
      @click="btnClick(list.key, item.value)"
      :key="i"
    >{{ item.title }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Object,
    setQuery: Function
  },
  inheritAttrs: false,
  data () {
    return {
      index: 0
    }
  },
  methods: {
    btnClick (key, val) {
      if (this.index === val) return
      this.index = val
      this.$emit('setQuery', key, val)
    },
    getKeyValue (key, hash, def = undefined) {
      const reg = new RegExp(`[\\?&#]${key}=([^&#]+)`, 'gi')
      const matches = hash.match(reg)

      if (matches.length > 0) {
        const strArr = matches[matches.length - 1].split('=')
        return strArr.length > 1 ? strArr[1] : def
      }
      return def
    }
  },
  created () {
    // 获取 index
    this.index = parseInt(this.getKeyValue(this.item.key, window.location.hash, 0))
  }
}
</script>

<style></style>
