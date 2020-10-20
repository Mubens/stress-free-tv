<template>
  <li class="history-record">
    <div class="left-info">
      <i></i>
      <span>{{ data.time | filterTime }}</span>
    </div>
    <div class="right-info">
      <div class="pic-cover">
        <a :href="`/play/${data.id}?ep=${data.ep}`"><img :src="data.img" /></a>
      </div>
      <div class="text-info">
        <div class="title">
          <a :href="`/play/${data.id}?ep=${data.ep}`">{{ data.title }}</a>
        </div>
        <div class="sub-title">第{{ data.ep }}话 {{ data.ep_title }}</div>
        <div class="info">
          <div class="time-wrap">
            <span class="progress"
              >看到 第{{ data.ep }}话 {{ data.ep_title }}
              {{ data.video_time | filterVideoTime }}</span
            >
            <!-- <span> | 更新至第945话</span> -->
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: () => ({}) }
  },
  filters: {
    filterTime (time) {
      const date = new Date(time)
      const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

      return h + ':' + m
    },
    filterVideoTime (seconds) {
      let minite = Math.floor(seconds / 60);
      if (minite < 10) {
        minite = '0' + minite;
      }
      let second = Math.floor(seconds % 60);
      if (second < 10) {
        second = '0' + second;
      }
      return minite + ':' + second;
    }
  }
}
</script>

<style lang="less">
.history-record {
  position: relative;
  height: 120px;
}

.left-info {
  width: 66px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-right: 1px solid #e5e9ef;

  i {
    position: absolute;
    right: -5px;
    top: 56px;
    border: 5px dashed #e5e9ef;
    border-right-width: 0;
    border-left-style: solid;
    border-top-color: transparent;
    border-bottom-color: transparent;
  }

  span {
    color: #99a2aa;
    position: absolute;
    top: 52px;
    left: 87px;
    width: 80px;
    font-size: 14px;
  }
}

.right-info {
  display: flex;
  margin-left: 186px;
  padding: 10px 0;
  height: 100px;

  .pic-cover {
    width: 176px;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .text-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin-left: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e9ef;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
  }

  .sub-title {
    margin-bottom: 10px;
    color: #6d757a;
  }

  .time-wrap {
    font-size: 12px;
    color: #99a2aa;
  }
}
</style>