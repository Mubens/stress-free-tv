<template>
  <ul>
    <li
      class="item"
      :class="{ on: index == item.value }"
      v-for="(item, i) in list.options"
      @click="btnClick(list.key, item.value)"
      :key="i"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Object,
    setKeyValue: Function,
    query: Object
  },
  inheritAttrs: false,
  computed: {
    index() {
      return this.query[this.list.key]
    }
  },
  methods: {
    btnClick(key, val) {
      if (this.index === val) return
      this.$emit('setKeyValue', { [key]: val, page: 1 })
    }
  }
}
</script>

<style></style>
