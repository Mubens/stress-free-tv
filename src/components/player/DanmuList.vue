<template>
  <div class="danmu-wrapper">
    <div class="v-barrage" @click="isShow = !isShow">
      <div class="danmu-btn">弹幕列表</div>
      <span>{{ isShow ? '收起' : '展开' }}</span>
    </div>
    <!--弹幕列表-->
    <div class="v-barrage-list" :style="isShow ? '' : 'height:0'">
      <div class="title">
        <span>时间</span>
        <span>弹幕内容({{ danmu.length }})</span>
        <span>发送时间</span>
      </div>
      <ul class="list">
        <li v-for="(item, i) in danmu" :key="i">
          <span>{{ item.time }}</span>
          <span :title="item.content">{{ item.content }}</span>
          <span>{{ item.subtime }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      danmu: [
        {
          id: 1,
          time: '01:00',
          content: '这个视频很不错哦',
          subtime: '05-10 13:01'
        },
        {
          id: 2,
          time: '01:00',
          content: '这个视频很不错哦这个视频很不错哦',
          subtime: '05-10 13:01'
        }
      ]
    }
  },
  mounted() {
    // for (let i = 3; i < 100; i++) {
    //   this.danmu.push({
    //     id: i,
    //     time: '01:00',
    //     content: '这个视频很不错哦',
    //     subtime: '05-10 13:01'
    //   })
    // }
  }
}
</script>

<style scoped>
/*弹幕列表按钮*/
.danmu-wrapper {
  margin-bottom: 20px;
  border-radius: 2px;
  overflow: hidden;
}
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
}
.v-barrage span {
  font-size: 12px;
  cursor: pointer;
  color: #585858;
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
