<template>
  <div class="danmu-list-wrapper">
    <div class="v-barrage" @click="isShow = !isShow">
      <div>弹幕列表</div>
      <span>{{ isShow ? '收起' : '展开' }}</span>
    </div>
    <!--弹幕列表-->
    <div class="v-barrage-list" :style="isShow ? '' : 'height:0'">
      <div class="title">
        <span>时间</span>
        <span>弹幕内容({{ danmuList.length }})</span>
        <span>发送时间</span>
      </div>
      <ul class="content">
        <li v-for="(danmu, i) in danmuList" :key="i">
          <span>{{ danmu.vtime | v_timeFormat }}</span>
          <span :title="danmu.content">{{ danmu.content }}</span>
          <span>{{ danmu.stime | s_timeFormat }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    danmuList: { type: Array, default: () => [] }
  },
  data() {
    return {
      isShow: false
    }
  },
  filters: {
    // 格式化时间
    v_timeFormat(seconds) {
      var minite = Math.floor(seconds / 60)
      if (minite < 10) {
        minite = '0' + minite
      }
      var second = Math.floor(seconds % 60)
      if (second < 10) {
        second = '0' + second
      }
      return minite + ':' + second
    },
    s_timeFormat(time) {
      const date = new Date(time)
      let M = add0(date.getMonth() + 1)
      let D = add0(date.getDate())
      let h = add0(date.getHours())
      let m = add0(date.getMinutes())

      return `${M}-${D} ${h}:${m}`

      function add0(num) {
        return num < 10 ? '0' + num : num
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 弹幕列表按钮 */

.danmu-list-wrapper {
  margin-bottom: 15px;
  border-radius: 2px;
  overflow: hidden;

  .v-barrage {
    box-sizing: border-box;
    display: flex;
    height: 40px;
    width: 320px;
    padding: 0 15px;
    background-color: #f4f4f4;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    span {
      font-size: 12px;
      cursor: pointer;
      color: #585858;
    }
  }
}

.v-barrage-list {
  width: 100%;
  height: 680px;
  transition: all ease 0.5s;
}
.v-barrage-list ul {
  max-height: 650px;
  overflow-y: scroll;
}

.v-barrage-list ul li,
.v-barrage-list .title {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.v-barrage-list ul li span,
.v-barrage-list .title span {
  margin-bottom: 5px;
  font-size: 12px;
}
.v-barrage-list .title {
  margin: 8px 0;
  color: #585858;
}
.content {
  line-height: 16px;
}
.v-barrage-list ul li span:nth-child(1),
.v-barrage-list .title span:nth-child(1) {
  width: 60px;
  color: #585858;
}
.v-barrage-list ul li span:nth-child(2),
.v-barrage-list .title span:nth-child(2) {
  width: 137px;
  padding-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}
.v-barrage-list ul li span:nth-child(3),
.v-barrage-list .title span:nth-child(3) {
  width: 74px;
  color: #585858;
}

/* 定义滚动条样式 */
.v-barrage-list ul::-webkit-scrollbar {
  width: 6px;
}

/*定义滚动条轨道 内阴影+圆角*/
.v-barrage-list ul::-webkit-scrollbar-track {
  border-radius: 10px;
  cursor: pointer;
}

/*定义滑块 内阴影+圆角*/
.v-barrage-list ul::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
.v-barrage-list ul:hover::-webkit-scrollbar-track {
  background-color: #f7f7f7;
}
.v-barrage-list ul:hover::-webkit-scrollbar-thumb {
  background-color: #6d7f7a;
}
</style>
