<template>
  <div class="box-list">
    <!-- <div class="left-part"> -->
    <slot></slot>
    <ul>
      <li v-for="(item, i) in lian_zai" :key="i">
        <a :href="item.url" target="_blank">
          <img class="pic" :src="item.img" target="_blank" />
          <div class="info">
            <p class="title" :title="item.title">{{ item.title }}</p>
            <p class="msg">
              <span class="play">
                <i class="icon icon-play-count"></i>
                {{ item.play | numfilter }}
              </span>
              <span class="danmu">
                <i class="icon icon-danmu"></i>
                {{ item.danmu | numfilter }}
              </span>
            </p>
          </div>
        </a>
      </li>
    </ul>
    <!-- </div> -->
    <!-- <div class="right-part"></div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      lian_zai: [
        {
          title: '【4月】辉夜大小姐想让我告白？～天才们的恋爱头脑战～ 01【独家正版】',
          img: require('../../images/hq720.webp'),
          url: '#',
          play: 3366000,
          danmu: 40000
        },
        {
          title: '【4月】辉夜大小姐想让我告白？～天才们的恋爱头脑战～ 01【独家正版】',
          img: require('../../images/hq720.webp'),
          url: '#',
          play: 3366000,
          danmu: 40000
        },
        {
          title: '【4月】辉夜大小姐想让我告白？～天才们的恋爱头脑战～ 01【独家正版】',
          img: require('../../images/hq720.webp'),
          url: '#',
          play: 3366000,
          danmu: 40000
        },
        {
          title: '【4月】辉夜大小姐想让我告白？～天才们的恋爱头脑战～ 01【独家正版】',
          img: require('../../images/hq720.webp'),
          url: '#',
          play: 3366000,
          danmu: 40000
        },
        {
          title: '【4月】辉夜大小姐想让我告白？～天才们的恋爱头脑战～ 01【独家正版】',
          img: require('../../images/hq720.webp'),
          url: '#',
          play: 3366000,
          danmu: 40000
        },
        {
          title: '【4月】辉夜大小姐想让我告白？～天才们的恋爱头脑战～ 01【独家正版】',
          img: require('../../images/hq720.webp'),
          url: '#',
          play: 3366000,
          danmu: 40000
        },
        {
          title: '【4月】辉夜大小姐想让我告白？～天才们的恋爱头脑战～ 01【独家正版】',
          img: require('../../images/hq720.webp'),
          url: '#',
          play: 3366000,
          danmu: 40000
        },
        {
          title: '【4月】辉夜大小姐想让我告白？',
          img: require('../../images/hq720.webp'),
          url: '#',
          play: 3000,
          danmu: 40000
        }
      ]
    }
  },
  filters: {
    numfilter (num) {
      if (num > 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
      return num + ''
    }
  }
}
</script>

<style lang="less">
.box-list {
  width: 100%;
  margin-top: 30px;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -10px;
    li {
      box-sizing: border-box;
      width: 22%;
      margin: 10px;
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
    }

    .icon {
      box-sizing: border-box;
      display: block;
      width: 16px;
      height: 100%;
      margin: 0 5px;
    }
    .icon-play-count {
      padding-top: 1px;
      font-size: 18px;
    }
    .icon-danmu {
      padding-top: 2px;
      font-size: 16px;
    }
    .title {
      padding: 4px 0;
      box-sizing: border-box;
    }
    .msg {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      width: 100%;
      background-color: #f9f9f9;
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
}

// @media screen and(max-width: 1756px) {
//   .box-list {
//     width: 1360px;
//   }
// }
// @media screen and(max-width: 1650px) {
//   .box-list {
//     width: 1098px;
//   }
// }
// .box-list {
//   // display: flex;
//   // flex-direction: column;
//   // padding: 10px 0;

//   h3 {
//     font-size: 24px;
//     line-height: 24px;
//     font-weight: 400;
//     color: #222;
//   }

//   ul {
//     // margin: 10px 0;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     li {
//       width: 280px;
//       // height: 216px;
//       margin: 10px 0;
//       overflow: hidden;
//       img {
//         width: 100%;
//         height: 100%;
//         border-radius: 4px;
//         object-fit: cover;
//       }
//       a {
//         display: block;
//         position: relative;
//         top: 0;
//         left: 0;
//       }
//       p {
//         font-size: 14px;
//       }
//       .icon {
//         width: 20px;
//         height: 20px;
//       }
//       p.title {
//         transition: all 0.2s;
//       }
//       p.title:hover {
//         color: #23ade5;
//       }
//       p.num {
//         position: absolute;
//         left: 0;
//         bottom: 0;
//         width: 100%;
//         background-color: #ffffff;
//         color: #98a2aa;
//         // font-size: 12px;
//         transition: all 0.3s;
//         span {
//           display: inline-block;
//           width: 50%;
//         }
//       }
//     }
//     li:hover p.num {
//       bottom: -20px;
//     }
//   }
// }
</style>
