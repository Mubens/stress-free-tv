<template>
  <div class="episode-list-wrapper">
    <div class="episode-list-title">
      <span class="title">选集</span>
      <i
        class="icon"
        :class="blocklist ? 'icon-grid' : 'icon-item'"
        @click="blocklist = !blocklist"
      ></i>
    </div>
    <div class="episode-list-content">
      <div v-if="blocklist" class="grid-layout">
        <a
          v-for="item in episodes"
          :key="item.ep"
          :class="current === item.ep ? 'current' : ''"
          :href="item.url"
          @click="episodeClick(item.ep)"
        >
          <span>{{ item.ep }}</span>
        </a>
      </div>
      <div v-else class="list-layout">
        <a
          v-for="item in episodes"
          :key="item.ep"
          :class="current === item.ep ? 'current' : ''"
          :href="item.url"
          @click="episodeClick(item.ep)"
        >
          <span>第 {{ item.ep }} 话&nbsp;</span>
          <span>{{ item.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 36,
      blocklist: true,
      episodes: [
        { ep: 1, title: '来访者1', url: 'http://localhost:8080/play/123456' },
        { ep: 2, title: '来访者2', url: 'http://localhost:8080/play/123456' },
        { ep: 3, title: '来访者3', url: 'http://localhost:8080/play/123456' },
        { ep: 4, title: '来访者4', url: 'http://localhost:8080/play/123456' },
        { ep: 5, title: '来访者5', url: 'http://localhost:8080/play/123456' },
        { ep: 6, title: '来访者6', url: 'http://localhost:8080/play/123456' },
        { ep: 7, title: '来访者7', url: 'http://localhost:8080/play/123456' },
        { ep: 8, title: '来访者8', url: 'http://localhost:8080/play/123456' },
        { ep: 9, title: '来访者9', url: 'http://localhost:8080/play/123456' },
        { ep: 10, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 25, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 36, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 37, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 38, title: '来访者10', url: 'http://localhost:8080/play/123456' },
        { ep: 39, title: '来访者10', url: 'http://localhost:8080/play/123456' }
      ]
    }
  },
  methods: {
    episodeClick (n) {
      this.current = n
    }
  }
}
</script>

<style lang="less">
/*选集*/
.episode-list-wrapper {
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #f4f4f4;
  color: #000000d9;

  .episode-list-title {
    box-sizing: border-box;
    display: flex;
    width: 320px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;

    .icon {
      font-size: 20px;
      color: #757575;
      transform: translate(4px, 2px);
      &:hover {
        color: #ff6b6b;
      }
    }
  }

  .episode-list-content {
    padding-left: 15px;
    padding-bottom: 10px;
    height: 375px;
    overflow-x: hidden;
    overflow-y: auto;

    .grid-layout {
      display: flex;
      flex-wrap: wrap;
      margin-left: -5px;

      a {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 36px;
        margin: 5px;
        border: 1px solid #e5e9ef;
        border-radius: 2px;
        background-color: #fff;
        font-size: 13px;
        cursor: pointer;

        &:hover {
          color: #ff6b6b;
          border-color: #ff6b6b;
        }
      }
      .current {
        color: #ffffff !important;
        border-color: #ff6b6b;
        background-color: #ff6b6b;
      }
    }

    .list-layout {
      display: flex;
      flex-direction: column;

      a {
        font-size: 14px;
        width: 280px;
        margin: 3px -3px;
        padding: 5px 0 5px 5px;
        border-radius: 4px;
        cursor: pointer;
      }

      a:hover {
        background-color: #ffffff;
      }

      .current {
        color: #ff6b6b;
        background-color: #ffffff;
      }
    }
  }

  // div {
  //   height: 356px;
  //   overflow-y: auto;
  //   overflow-x: hidden;
  // }
  // .title {
  //   position: relative;
  //   padding-bottom: 10px;
  // }
  // .list {
  //   position: absolute;
  //   top: 2px;
  //   cursor: pointer;
  // }
  // .grid-list {
  //   margin-left: 3px;
  // }
  // .item-list {
  //   margin-left: 4px;
  // }
  // .list:hover path {
  //   fill: #ff6b6b;
  // }

  // .list-wrapper .block {
  //   display: grid;
  //   grid-template-columns: repeat(4, 1fr);
  //   justify-items: center;
  //   .episode {
  //     position: relative;
  //     top: 0;
  //     left: 0;
  //     width: 66px;
  //     height: 36px;
  //     margin-bottom: 5px;
  //     border: 1px solid #e5e9ef;
  //     border-radius: 2px;
  //     background-color: #fff;
  //     cursor: pointer;
  //   }
  //   .episode > span {
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     font-size: 12px;
  //     transform: translate(-50%, -50%);
  //   }
  //   .episode:hover {
  //     color: #ff6b6b;
  //     border-color: #ff6b6b;
  //   }
  //   .current {
  //     color: #ffffff !important;
  //     border-color: #ff6b6b;
  //     background-color: #ff6b6b;
  //   }
  // }
  // .list-wrapper .item {
  //   a {
  //     font-size: 14px;
  //     margin: 5px -5px;
  //     padding: 5px 0 5px 5px;
  //     border-radius: 4px;
  //     color: #222222;
  //     cursor: pointer;
  //   }
  //   a:hover {
  //     background-color: #ffffff;
  //   }
  // }
}
</style>
