<template>
  <div class="episode-list">
    <div class="title">
      <span>选集</span>
      <span
        class="list block-list"
        v-if="blocklist"
        @click="blocklist = !blocklist"
        :style="blocklist ? 'color:red' : ''"
        ><svg
          t="1589100150183"
          class="icon"
          viewBox="0 0 1000 1000"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8675"
          width="18"
          height="18"
        >
          <path
            d="M124.939 127.135l214.631 0 0 214.626-214.631 0 0-214.626ZM392.664 127.135l214.658 0 0 214.626-214.658 0 0-214.626ZM660.418 127.135l214.643 0 0 214.626-214.643 0 0-214.626ZM124.939 392.67l214.631 0 0 214.629-214.631 0 0-214.629ZM392.664 392.67l214.658 0 0 214.629-214.658 0 0-214.629ZM660.418 392.67l214.643 0 0 214.629-214.643 0 0-214.629ZM124.939 658.213l214.631 0 0 214.652-214.631 0 0-214.652ZM392.664 658.213l214.658 0 0 214.652-214.658 0 0-214.652ZM660.418 658.213l214.643 0 0 214.652-214.643 0 0-214.652Z"
            p-id="8676"
            fill="#757575"
          ></path></svg
      ></span>
      <span class="list item-list" v-else @click="blocklist = !blocklist">
        <svg
          t="1589101354344"
          class="icon"
          viewBox="0 0 1028 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="27633"
          width="16"
          height="16"
        >
          <path
            d="M62 62l223.5375 0 0 223.48125-223.5375 0L62 62 62 62zM393.48125 62l571.44375 0 0 223.48125L393.48125 285.48125 393.48125 62 393.48125 62zM393.48125 395l571.44375 0 0 232.42499999999998L393.48125 627.425 393.48125 395 393.48125 395zM62 395l223.5375 0 0 232.42499999999998-223.5375 0L62 395 62 395zM62 735.48125l223.5375 0L285.5375 962l-223.5375 0L62 735.48125 62 735.48125zM393.48125 735.48125l571.44375 0L964.925 962 393.48125 962 393.48125 735.48125 393.48125 735.48125z"
            p-id="27634"
            fill="#757575"
          ></path>
        </svg>
      </span>
    </div>
    <div class="list-wrapper">
      <ul v-if="blocklist" class="block">
        <li
          class="episode"
          v-for="item in episodes"
          :key="item.id"
          :class="current === item.id ? 'current' : ''"
          @click="episodeClick(item.id)"
        >
          <span>{{ item.id }}</span>
        </li>
      </ul>
      <ul v-else class="item">
        <li
          v-for="item in episodes"
          :key="item.id"
          :class="current === item.id ? 'current' : ''"
          @click="episodeClick(item.id)"
        >
          <span>第{{ item.id }}话 &nbsp;</span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 4,
      blocklist: true,
      episodes: [
        { id: 1, title: '来访者1' },
        { id: 2, title: '来访者2' },
        { id: 3, title: '来访者3' },
        { id: 4, title: '来访者4' },
        { id: 5, title: '来访者5' },
        { id: 6, title: '来访者6' },
        { id: 7, title: '来访者7' },
        { id: 8, title: '来访者8' },
        { id: 9, title: '来访者9' },
        { id: 10, title: '来访者10' }
      ]
    }
  },
  methods: {
    episodeClick(n) {
      this.current = n
    }
  }
}
</script>

<style lang="less">
/*选集*/
.episode-list {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  border-radius: 2px;
  background-color: #f4f4f4;
  ul {
    max-height: 356px;
    overflow: hidden;
  }
  .title {
    position: relative;
    padding-bottom: 10px;
  }
  .list {
    position: absolute;
    top: 2px;
    cursor: pointer;
  }
  .block-list {
    margin-left: 3px;
  }
  .item-list {
    margin-left: 4px;
  }
  .list:hover path {
    fill: #00a1d6;
  }
  .list-wrapper .block {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    .episode {
      position: relative;
      top: 0;
      left: 0;
      width: 66px;
      height: 36px;
      margin-bottom: 5px;
      border: 1px solid #e5e9ef;
      border-radius: 2px;
      background-color: #fff;
      cursor: pointer;
    }
    .episode > span {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 12px;
      transform: translate(-50%, -50%);
    }
    .episode:hover {
      color: #00a1d6;
      border-color: #00a1d6;
    }
    .current {
      color: #ffffff !important;
      border-color: #00a1d6;
      background-color: #00a1d6;
    }
  }
  .list-wrapper .item {
    li {
      font-size: 14px;
      margin: 5px -5px;
      padding: 5px 0 5px 5px;
      border-radius: 4px;
      color: #222222;
      cursor: pointer;
    }
    li:hover {
      background-color: #ffffff;
    }
  }
}
</style>
