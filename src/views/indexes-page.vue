<template>
  <div class="wrapper">
    <mixin-list :list="order" :sort="sort" :data="data" :query="query" @setKeyValue="setKeyValue" />
    <filter-options :list="filter" :query="query" @setKeyValue="setKeyValue" />
  </div>
</template>

<script>
import MixinList from '../components/IndexesPage/MixinList'
import FilterOptions from '../components/IndexesPage/FilterOptions'

export default {
  data() {
    return {
      list: [],
      data: {},
      query: {}
    }
  },
  computed: {
    filter() {
      return this.list.filter((item) => item.name)
    },
    order() {
      return this.list.find((item) => item.key === 'order')
    },
    sort() {
      return this.list.find(item => item.key === 'sort')
    }
  },
  methods: {
    /* 重置 hash */
    async initHash() {
      try {
        const res = await this.$http.get('http://localhost:3000/api/play/filter_list')
        this.list = res.data.errno ? [] : res.data.data

        // console.log(res.data.data)

        let kv = ''
        const query = {}
        this.list.forEach((item) => {
          let value = this.getKeyValue(item.key, window.location.hash)
          value = value == null ? item.default : value
          kv += `${item.key}=${value}&`
          query[item.key] = value
        })

        this.query = query
        kv = kv.slice(0, kv.length - 1)

        window.location.hash = kv
        this.getAnimeList(kv)
      } catch (err) {
        
      }
      
    },
    getKeyValue(key, hash, def = undefined) {
      const reg = new RegExp(`[\\?&#]${key}=([^&#]+)`, 'gi')
      const matches = hash.match(reg)

      if (matches?.length > 0) {
        const strArr = matches[matches.length - 1].split('=')
        return strArr.length > 1 ? strArr[1] : def
      }
      return def
    },
    setKeyValue(option) {
      for (const key in option) {
        this.query[key] = option[key]
      }

      let kv = ''
      for (const k in this.query) {
        kv += `${k}=${this.query[k]}&`
      }
      kv = kv.slice(0, kv.length - 1)

      window.location.hash = '#' + kv

      this.getAnimeList(kv)
    },
    /*  */
    async getAnimeList(query) {
      try {
        const res = (await this.$http.get(`http://localhost:3000/api/play/index?${query}`)).data
        if (!res.errno) {
          this.data = res.data
        }
      } catch (err) {
        
      }
    }
  },
  created() {
    this.initHash()
  },
  components: {
    'mixin-list': MixinList,
    'filter-options': FilterOptions
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  width: 1160px;
  margin-top: 15px;
}

@media screen and (max-width: 1400px) {
  .wrapper {
    width: 980px;
  }
}
</style>
