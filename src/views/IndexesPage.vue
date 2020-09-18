<template>
  <div class="wrapper">
    <mixin-list :list="order" :data="data" :query="query" @setKeyValue="setKeyValue" />
    <filter-options :list="filter" :query="query" @setKeyValue="setKeyValue" />
  </div>
</template>

<script>
import MixinList from '../components/IndexesPage/MixinList'
import FilterOptions from '../components/IndexesPage/FilterOptions'

export default {
  data() {
    return {
      list: [
        {
          key: 'type',
          name: '类型',
          default: -1,
          options: [
            { title: '全部', value: -1 },
            { title: '正片', value: 1 },
            { title: '电影', value: 2 },
            { title: '其他', value: 3 }
          ]
        },
        {
          key: 'area',
          name: '地区',
          default: -1,
          options: [
            { title: '全部', value: -1 },
            { title: '日本', value: 1 },
            { title: '美国', value: 2 },
            { title: '其他', value: 3 }
          ]
        },
        {
          key: 'is_finish',
          name: '状态',
          default: -1,
          options: [
            { title: '全部', value: -1 },
            { title: '完结', value: 1 },
            { title: '连载', value: 0 }
          ]
        },
        {
          key: 'season_month',
          name: '季度',
          default: -1,
          options: [
            { title: '全部', value: -1 },
            { title: '1月', value: 1 },
            { title: '4月', value: 4 },
            { title: '7月', value: 7 },
            { title: '10月', value: 10 }
          ]
        },
        {
          key: 'year',
          name: '时间',
          default: -1,
          options: [
            { title: '全部', value: -1 },
            { title: '2020', value: '[2020,2021)' },
            { title: '2019', value: '[2019,2020)' },
            { title: '2018', value: '[2018,2019)' },
            { title: '2017', value: '[2017,2018)' },
            { title: '2016', value: '[2016,2017)' },
            { title: '2015', value: '[2015,2016)' },
            { title: '2014-2010', value: '[2010,2015)' },
            { title: '2009-2005', value: '[2005,2010)' },
            { title: '2004-2000', value: '[2000,2005)' },
            { title: '90年代', value: '[1990,2000)' },
            { title: '80年代', value: '[1980,1990)' },
            { title: '更早', value: '[,1980)' }
          ]
        },
        {
          key: 'style_id',
          name: '风格',
          default: -1,
          options: [
            { title: '全部', value: -1 },
            { title: '原创', value: 1 },
            { title: '漫画改', value: 2 },
            { title: '小说改', value: 3 },
            { title: '游戏改', value: 4 },
            { title: '热血', value: 5 },
            { title: '穿越', value: 6 },
            { title: '奇幻', value: 7 },
            { title: '战斗', value: 8 },
            { title: '搞笑', value: 9 },
            { title: '日常', value: 10 },
            { title: '科幻', value: 11 },
            { title: '萌系', value: 12 },
            { title: '治愈', value: 13 },
            { title: '校园', value: 14 },
            { title: '恋爱', value: 15 },
            { title: '少女', value: 16 },
            { title: '魔法', value: 17 },
            { title: '冒险', value: 18 },
            { title: '历史', value: 19 },
            { title: '机战', value: 20 },
            { title: '神魔', value: 21 },
            { title: '运动', value: 22 },
            { title: '励志', value: 23 },
            { title: '音乐', value: 24 },
            { title: '推理', value: 25 },
            { title: '美食', value: 26 },
            { title: '偶像', value: 27 },
            { title: '职场', value: 28 }
          ]
        },
        {
          key: 'order',
          default: 0,
          options: [
            { title: '追番人数', value: 0 },
            { title: '更新时间', value: 1 }
          ]
        },
        {
          key: 'page',
          default: 1
        },
        {
          key: 'sort',
          default: 0
        }
      ],
      data: {
        page: 1,
        total: 50,
        limit: 20,
        list: [
          {
            url: '#',
            img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
            title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
            newEp: 10,
            eps: 10,
            sub_count: 111000
          },
          {
            url: '#',
            img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
            title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
            newEp: 1,
            eps: 10,
            sub_count: 111000
          },
          {
            url: '#',
            img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
            title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
            newEp: 1,
            eps: 10,
            sub_count: 111000
          },
          {
            url: '#',
            img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
            title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
            newEp: 1,
            eps: 10,
            sub_count: 111000
          },
          {
            url: '#',
            img: 'http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp',
            title: '辉夜大小姐想让我告白？～天才们的恋爱头脑战～',
            newEp: 1,
            eps: 10,
            sub_count: 111000
          }
        ]
      },
      query: {}
    }
  },
  computed: {
    filter() {
      return this.list.filter((item) => item.name)
    },
    order() {
      return this.list.find((item) => item.key === 'order')
    }
  },
  methods: {
    /* 重置 hash */
    initHash() {
      const hash = window.location.hash

      let kv = '#'
      this.list.forEach((item) => {
        let value = this.getKeyValue(item.key, hash)
        value = value == null ? item.default : value
        kv += `${item.key}=${value}&`
        this.query[item.key] = value
      })
      kv = kv.slice(0, kv.length - 1)

      window.location.hash = kv
      this.getAnimeList(kv)
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
    getAnimeList(query) {
      // console.log(`http://localhost:3000/api/anime/list?${query}`)
      // axios(`http://localhost:3000/api/anime/list?${query}`).then(res => {
      //   console.log(res.data)
      // })
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
