<template>
  <div class="filter-wrap">
    <div class="filter-title">筛选</div>

    <div class="filter-list">
      <div class="filter-item" v-for="item in filter" :key="item.key[0]">
        <span class="filter">{{ item.key[1] }}</span>
        <FilterList :item="item" @filtrate="filtrate" />
      </div>
    </div>
  </div>
</template>

<script>
import FilterList from './FilterList'

export default {
  data () {
    return {
      filter: [
        { key: ['type', '类型'], value: ['正片', '电影', '其他'] },
        { key: ['area', '地区'], value: ['日本', '美国', '其他'] },
        { key: ['is_finish', '状态'], value: ['完结', '连载'] },
        { key: ['copyright', '版权'], value: ['独家', '其他'] },
        { key: ['pay_status', '付费'], value: ['免费', '付费', '大会员'] },
        { key: ['quarter', '季度'], value: ['1月', '4月', '7月', '10月'] },
        { key: ['year', '时间'], value: ['2020', '2019', '2018', '2017', '2016', '2015', '2014-2010', '2009-2005', '2004-2000', '90年代', '80年代', '更早'] },
        { key: ['style', '风格'], value: ['原创', '漫画改', '小说改', '游戏改', '布袋戏', '热血', '穿越', '奇幻', '战斗', '搞笑', '日常', '科幻', '萌系', '治愈', '校园', '少儿', '泡面', '恋爱', '少女', '魔法', '冒险', '历史', '架空', '机战', '神魔', '声控', '运动', '励志', '音乐', '推理', '社团', '智斗', '催泪', '美食', '偶像', '乙女', '职场'] }
      ],
    }
  },
  methods: {
    filtrate (key, val) {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      query[key] = val
      this.$router.push({ path: this.$route.path, query })
    }
  },
  created () {
    // const query = this.filter.map(item => ({ [item.key[0]]: -1 }))
    // console.log(...query)
    // const query = {}
    // this.filter.forEach(item => query[item.key[0]] = -1)
    // this.$router.push({ path: this.$route.path, query })
  },
  components: { FilterList }
}
</script>

<style lang="less">
.filter-wrap {
  width: 260px;
  color: #222222;
  font-size: 12px;
}

.filter-title {
  font-size: 18px;
  height: 44px;
}

.filter-item {
  display: flex;

  span {
    flex: 0 0 28px;
    margin-right: 20px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;

    li {
      box-sizing: border-box;
      min-width: 52px;
      height: 30px;
      padding-right: 15px;
    }

    .filter {
      color: #b3abb2;
    }

    .item {
      cursor: pointer;
    }
    .item.on {
      color: #ff6b6b;
    }
  }
}
</style>