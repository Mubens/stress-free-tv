<template>
  <div class="box-list">
    <slot></slot>
    <ul>
      <li v-for="(item, i) in lian_zai" :key="i">
        <a :href="item.url" target="_blank">
          <img class="pic" :src="item.img" alt />
          <div class="info">
            <p class="title" :title="item.title">{{ item.title }}</p>
            <p class="msg">
              <span class="play">
                <i class="icon">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                  >
                    <path
                      d="M758.697806 53.356664H265.273294c-118.237212 0-214.098582 95.42787-214.098582 213.152106v495.339138c0 117.709786 95.86137 213.144881 214.098582 213.144881h493.424512c118.251662 0 214.113032-95.435095 214.113032-213.144881v-495.346363c-0.021675-117.709786-95.86137-213.144881-214.113032-213.144881zM643.292796 531.782064l-244.710929 141.284979c-16.754787 9.688732-30.496747 1.755676-30.496747-17.585663V372.882523c0-19.370239 13.705835-27.28162 30.496747-17.614563l244.710929 141.306654c16.776462 9.703182 16.776462 25.518719 0 35.20745z"
                    ></path>
                  </svg>
                </i>
                {{ item.play | numfilter }}
              </span>
              <span class="danmu">
                <i class="icon">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                  >
                    <path
                      d="M853.333333 0 170.666667 0C76.8 0 0 76.8 0 170.666667l0 682.666667c0 93.866667 76.8 170.666667 170.666667 170.666667l682.666667 0c93.866667 0 170.666667-76.8 170.666667-170.666667L1024 170.666667C1024 76.8 947.2 0 853.333333 0zM938.666667 597.333333c0 51.2-34.133333 85.333333-85.333333 85.333333L170.666667 682.666667C119.466667 682.666667 85.333333 648.533333 85.333333 597.333333L85.333333 170.666667c0-51.2 34.133333-85.333333 85.333333-85.333333l682.666667 0c51.2 0 85.333333 34.133333 85.333333 85.333333L938.666667 597.333333z"
                    ></path>
                    <path
                      d="M640 256l-426.666667 0C187.733333 256 170.666667 238.933333 170.666667 213.333333l0 0C170.666667 187.733333 187.733333 170.666667 213.333333 170.666667l426.666667 0C665.6 170.666667 682.666667 187.733333 682.666667 213.333333l0 0C682.666667 238.933333 665.6 256 640 256z"
                    ></path>
                    <path
                      d="M554.666667 597.333333l-341.333333 0C187.733333 597.333333 170.666667 580.266667 170.666667 554.666667l0 0C170.666667 529.066667 187.733333 512 213.333333 512l341.333333 0C580.266667 512 597.333333 529.066667 597.333333 554.666667l0 0C597.333333 580.266667 580.266667 597.333333 554.666667 597.333333z"
                    ></path>
                    <path
                      d="M810.666667 426.666667l-512 0C273.066667 426.666667 256 409.6 256 384l0 0C256 358.4 273.066667 341.333333 298.666667 341.333333l512 0C836.266667 341.333333 853.333333 358.4 853.333333 384l0 0C853.333333 409.6 836.266667 426.666667 810.666667 426.666667z"
                    ></path>
                  </svg>
                </i>
                {{ item.danmu | numfilter }}
              </span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
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
    numfilter(num) {
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
  // font-size: 15px;

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
