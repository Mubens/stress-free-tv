<template>
  <CommenItem :title="title">
    <ul class="box-list">
      <li v-for="(item, i) in list" :key="i">
        <a :href="`/play/${item.play_id}?ep=${item.ep}`" target="_blank">
          <img class="pic" :src="item.img" target="_blank" />
          <div class="info">
            <p class="title" :title="item.title">{{ item.title + ' ' + item.ep }}</p>
            <p class="msg">
              <span class="play">
                <i class="icon icon-play-count"></i>
                {{ item.play_num || 0 | formateNumber }}
              </span>
              <span class="danmu">
                <i class="icon icon-danmu-count"></i>
                {{ item.danmaku_num || 0 | formateNumber }}
              </span>
            </p>
          </div>
        </a>
      </li>
    </ul>
    <slot slot="right" />
  </CommenItem>
</template>

<script>
import CommenItem from './commen-item'

export default {
  props: {
    title: { type: String, default: '标题' },
    list: { type: Array, default: () => [] }
  },
  filters: {
    formateNumber (num) {
      return num > 10000 ? (num / 10000).toFixed(1) + '万' : num + ''
    }
  },
  components: { CommenItem }
}
</script>

<style lang="less">
.box-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  grid-template-rows: repeat(auto-fill, 174px);
  margin: 20px 0;
  height: 368px;
  justify-content: space-between;
  gap: 20px 0;

  li {
    box-sizing: border-box;
    width: 220px;
    border-radius: 4px;
    background-color: #ffffff;
    overflow: hidden;
  }

  a {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .pic {
      width: 100%;
      border-radius: 4px;
      object-fit: cover;
    }

    .info {
      height: 50px;
      line-height: 23px;
    }
  }

  .icon {
    box-sizing: border-box;
    display: block;
    width: 16px;
    height: 20px;
    // margin: 0 5px;
    margin-right: 4px;
  }

  .icon-play-count {
    padding-top: 1px;
    font-size: 16px;
  }

  .icon-danmu-count {
    padding-top: 2px;
    font-size: 14px;
  }

  .title {
    padding: 4px 0;
    box-sizing: border-box;
    color: #404041;
  }

  .msg {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    color: #7b7f83;
    background-color: #ffffff;
    transform: translateY(0px);
    transition: transform 0.2s linear;

    span {
      display: flex;
      flex: 1;
      line-height: 20px;
    }
  }

  li:hover {
    .title {
      overflow: auto;
      white-space: normal;
    }
    .msg {
      transform: translateY(20px);
    }
  }
}
</style>
