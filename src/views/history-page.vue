<template>
  <div class="history-box">
    <div class="list-info">
      <div class="head">
        <i class="icon icon-history-play"></i>
        <span>历史记录</span>
      </div>
      <!-- <div class="head-btn">123</div> -->
    </div>
    <div class="label-contain">
      <!-- 114px -->
      <div
        class="time-label todaylabel"
        :class="{ active: active.todaylabel }"
        :style="todayStyle"
        v-show="todayList.length"
      >
        今天
      </div>
      <!-- 1674 -->
      <div
        class="time-label lastdaylabel"
        :class="{ active: active.lastdaylabel }"
        :style="lastdayStyle"
        v-show="lastdayList.length"
      >
        昨天
      </div>
      <div
        class="time-label lastweeklabel"
        :class="{ active: active.lastweeklabel }"
        :style="lastweekStyle"
        v-show="lastweekList.length"
      >
        近1周
      </div>
      <div
        class="time-label lastmonthlabel"
        :style="lastmonthStyle"
        v-show="lastmonthList.length"
      >
        1周前
      </div>
      <div
        class="time-label lastthreemonthlabel"
        :style="lastthreemonthStyle"
        v-show="lastthreemonthList.length"
      >
        1个月前
      </div>
    </div>
    <ul class="history-list">
      <HistoryRecord
        :class="{ today: i === 0 }"
        v-for="(item, i) in todayList"
        :data="item"
        :key="item.id"
      />
      <HistoryRecord
        :class="{ lastday: i === 0 }"
        v-for="(item, i) in lastdayList"
        :data="item"
        :key="item.id"
      />
      <HistoryRecord
        :class="{ lastweek: i === 0 }"
        v-for="(item, i) in lastweekList"
        :data="item"
        :key="item.id"
      />
      <HistoryRecord
        :class="{ 'out-week': i === 0 }"
        v-for="(item, i) in lastmonthList"
        :data="item"
        :key="item.id"
      />
      <HistoryRecord
        :class="{ 'out-month': i === 0 }"
        v-for="(item, i) in lastthreemonthList"
        :data="item"
        :key="item.id"
      />
    </ul>
  </div>
</template>

<script>
import HistoryRecord from '../components/history-page/history-record'

export default {
  data () {
    return {
      page: 1,
      dataList: [],
      todayList: [],
      lastdayList: [],
      lastweekList: [],
      lastmonthList: [],
      lastthreemonthList: [],
      rules: {
        today: +new Date(new Date().setHours(0, 0, 0, 0)),
        lastday: +new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000),
        oneWeek: +new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000),
        oneMonth: +new Date(new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000)
      },
      active: {
        todaylabel: true,
        lastdaylabel: false,
        lastweeklabel: false,
        lastmonthlabel: false,
        lastthreemonthlabel: false
      },
      scrollTop: document.documentElement.scrollTop,
      direction: 0,
      todayStyle: '',
      lastdayStyle: '',
      lastweekStyle: '',
      lastmonthStyle: '',
      lastthreemonthStyle: ''
    }
  },
  watch: {
    dataList () {
      const { today, lastday, oneWeek, oneMonth } = this.rules
      this.dataList.forEach(() => {
        const item = this.dataList.shift()
        if (item.time > today) {
          this.todayList.push(item)
        } else if (item.time > lastday) {
          this.lastdayList.push(item)
        } else if (item.time > oneWeek) {
          this.lastweekList.push(item)
        } else if (item.time > oneMonth) {
          this.lastmonthList.push(item)
        } else {
          this.lastthreemonthList.push(item)
        }
      })
    }
  },
  methods: {
    /* document 滚动事件 */
    onScroll () {
      this.direction = document.documentElement.scrollTop - this.scrollTop
      this.scrollTop = document.documentElement.scrollTop

      this.todayStyle = this.getActiveLabel('.time-label.todaylabel', '.history-record.today', 'todaylabel')
      this.lastdayStyle = this.getActiveLabel('.time-label.lastdaylabel', '.history-record.lastday', 'lastdaylabel')
      this.lastweekStyle = this.getActiveLabel('.time-label.lastweeklabel', '.history-record.lastweek', 'lastweeklabel')
      this.lastmonthStyle = this.getActiveLabel('.time-label.lastmonthlabel', '.history-record.lastmonth', 'lastmonthlabel')
      this.lastthreemonthStyle = this.getActiveLabel('.time-label.lastthreemonthlabel', '.history-record.lastthreemonth', 'lastthreemonthlabel')
    },
    touchTop (label) {
      const rect = label.getBoundingClientRect()
      return rect.top <= 10
    },
    touchBottom (label) {
      const rect = label.getBoundingClientRect()
      return rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) - 30
    },
    outTop (label, record) {
      return label?.getBoundingClientRect().top > record?.getBoundingClientRect().top
    },
    outBottom (label, record) {
      return label?.getBoundingClientRect().top < record?.getBoundingClientRect().top
    },
    /* 获取 style */
    getActiveLabel (label_el, record_el, active_label) {
      const label = document.querySelector(label_el)
      const record = document.querySelector(record_el)

      let style = ''
      if (this.direction > 0 && this.touchTop(label) || this.direction < 0 && this.outTop(label, record)) {
        style = `position: fixed; top: 10px; bottom: initial;`
        this.active[active_label] = true
      } else if (this.direction < 0 && this.touchBottom(label) || this.direction > 0 && this.outBottom(label, record)) {
        style = `position: fixed; top: initial; bottom: 10px;`
        this.active[active_label] = false
      } else {
        const top = record ? record.offsetTop : (window.innerHeight || document.documentElement.clientHeight)
        style = `position: absolute; top: ${top}px; bottom: initial;`
        this.active[active_label] = true
      }

      return style
    },
    async getDataList () {
      try {
        const res = (await this.$http.get(`http://localhost:3000/api/user/history?page=${this.page}`)).data
        if (res.errno) {
          console.log(res.message)
        } else {
          this.dataList = res.data
          this.page++
          this.$nextTick(() => {
            this.onScroll()
          })
        }
      } catch (err) {

      }
    }
  },
  mounted () {
    this.getDataList()
    document.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.onScroll)
  },
  components: { HistoryRecord }
}
</script>

<style lang="less" >
.history-box {
  width: 1180px;
  flex: 1;
  // min-height: 1000px;
  margin: 30px auto 0;
}

.list-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .head {
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  .icon {
    font-size: 28px;
    color: #ff6b6b;
  }
}

.label-contain {
  margin-top: 15px;

  .time-label {
    position: fixed;
    height: 34px;
    margin: 0 20px 20px 8px;
    padding: 0 8px;
    border: 1px solid #ff6b6b;
    border-radius: 4px;
    font-size: 14px;
    line-height: 36px;
    color: #ff6b6b;
    text-align: center;
    cursor: pointer;
    z-index: 998;
  }

  .lastweeklabel,
  .lastmonthlabel {
    margin-left: 0;
  }

  .lastthreemonthlabel {
    margin-left: -14px;
  }

  .time-label:before {
    content: "";
    position: absolute;
    top: 13px;
    right: -6px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #fff;
    z-index: 2;
  }

  .time-label:after {
    content: "";
    position: absolute;
    top: 13px;
    right: -8px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #ff6b6b;
    z-index: 1;
  }

  .active {
    background-color: #ff6b6b;
    color: #fff;
  }

  .active::before {
    border-left: 8px solid #ff6b6b;
  }
}
</style>