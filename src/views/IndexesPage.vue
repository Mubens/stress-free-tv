<template>
  <div class="wrapper">
    <mixin-list :list="order" @setQuery="setQuery" />
    <filter-options :filter="filter" @setQuery="setQuery" />
  </div>
</template>

<script>
import MixinList from '../components/SearchPage/MixinList'
import FilterOptions from '../components/SearchPage/FilterOptions'

import { getSession, setSession } from '../assets/js/storage'

export default {
  data () {
    return {
      order: {
        key: 'order',
        default: 0,
        options: [
          { title: '追番人数', value: 0 },
          { title: '更新时间', value: 1 }
        ]
      },
      filter: [
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
        }
      ],
      list: ['type', 'area', 'is_finish', 'season_month', 'year', 'style_id', 'sort', 'page'],
      query: {}
    }
  },
  methods: {
    /* 重置 hash */
    initHash () {
      const hash = window.location.hash

      if (!hash || getSession('sftv-indexs') == null) {
        let newHash = '#'

        this.filter.forEach((item) => {
          newHash += `${item.key}=${item.default}&`
          this.query[item.key] = item.default
        })

        // newHash += 

        window.location.hash = newHash
      } else {
        this.query = getSession('sftv-indexs')
      }
    },
    setQuery (key, val) {
      console.log(key, val)
      this.query[key] = val

      let newHash = ''

      for (const k in this.query) {
        newHash += `${k}=${this.query[k]}&`
      }

      newHash = newHash.slice(0, newHash.length - 1)

      this.getAnimeList(newHash)

      window.location.hash = '#' + newHash
    },
    /*  */
    getAnimeList (query) {
      // axios(`http://localhost:3000/api/anime/list?${query}`).then(res => {
      //   console.log(res.data)
      // })
    }
  },
  created () {
    this.initHash()
    setSession('sftv-indexs', this.query)
  },
  beforeDestroy () {
    setSession('sftv-indexs', this.query)
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
