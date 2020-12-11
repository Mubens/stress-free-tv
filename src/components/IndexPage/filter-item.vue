<template>
  <div class="filter-block-item">
    <div class="filter-title">
      <span>{{ list.name || list.title }}</span>
      <a href="/anime/index">全部</a>
    </div>
    <div class="filter-list">
      <a
        :href="`/anime/index#${list.key}=${item.value}`"
        v-for="(item, i) in list.options"
        :key="i"
      >
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Object, default: () => ({}) }
  }
}
</script>

<style>
</style>