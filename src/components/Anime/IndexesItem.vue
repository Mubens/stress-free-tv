<template>
 <div class="index-entry-wrapper">
   <div class="filter-block-items">
     <FilterItem :list="hotList" />
     <FilterItem :list="seasonList" />
     <FilterItem :list="timeList" />
     <FilterItem :list="styleList" />
   </div>
 </div>
</template>

<script>
 import FilterItem from './filter-item'

 export default {
   data () {
     return {
       filterList: []
     }
   },
   methods: {
     async getFilterList() {
       try {
         const res = (await this.$http.get('http://localhost:3000/api/play/filter_list')).data
        // console.log(res)
         if (!res.errno) {
           this.filterList = res.data
         }
       } catch (err) {
         
       }
     }
   },
   computed: {
     hotList() {
       return this.filterList.find(item => item.key === 'order')
     },
     seasonList() {
       const data = this.filterList.find(item => item.key === 'season_month')
       data?.options.shift()
       return data
     },
     timeList() {
       const data = this.filterList.find(item => item.key === 'year')
       data?.options.shift()
       return data
     },
     styleList() {
       const data = this.filterList.find(item => item.key === 'style_id')
       data?.options.shift()
       return data
     }
   },
   created() {
     this.getFilterList()
   },
   components: { FilterItem }
 }
</script>

<style lang="less">
.index-entry-wrapper {
  margin-bottom: 40px;
}

.filter-block-items {
  display: flex;
  justify-content: space-between;
}

.filter-block-item {
  flex: 1;
  height: 80px;
  margin-right: 40px;
  overflow: hidden;

  .filter-title {
    font-size: 18px;

    a {
      display: inline-block;
      margin-left: 10px;
    }

    a::after {
      display: inline-block;
      content: "\e913";
      font-family: 'icomoon' !important;
      speak: never;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      font-size: 12px;
      transform: scale(0.8, 0.8); 
    }
  }

  .filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    a {
      display: block;
      margin: 0 20px 5px 0;
    }
  }

  a {
    font-size: 14px;
    color: #404041;
    transition: color .3s;
  }

  a:hover {
    color: #FF6B6B;
  }
}
</style>