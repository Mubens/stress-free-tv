<template>
  <div class="mixin-list">
    <ul class="list-order">
      <li class="order">
        <span class="on">更新时间</span>
        <i class="up"></i>
        <i class="down active"></i>
      </li>
      <li class="order">
        <span>更新时间</span>
        <i class="up"></i>
        <i class="down"></i>
      </li>
    </ul>
    <div class="item-box">
      <div class="item" v-for="n in 20" :key="n">
        <a href="#">
          <img
            src="http://localhost:3000/images/83ad052250e9a803e4ebaa47bef971cb079e0543.png@320w_428h.webp"
            alt
          />
        </a>
        <a href="#">辉夜大小姐想让我告白？～天才们的恋爱头脑战～</a>
        <p>全12话</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.mixin-list {
  flex: 1;

  .list-order {
    display: flex;
    height: 44px;

    .order {
      position: relative;
      width: 80px;
      height: 20px;
      margin-right: 10px;
      cursor: pointer;
      // background-color: turquoise;

      span {
        color: #222222;
      }

      span.on {
        color: #ff6b6b;
      }

      .up {
        position: absolute;
        top: 3px;
        right: 8px;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #dddddd;
        border-left: 5px solid transparent;
      }
      .up.active {
        border-bottom-color: #ff6b6b;
      }

      .down {
        position: absolute;
        top: 11px;
        right: 8px;
        border-top: 5px solid #dddddd;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
      }
      .down.active {
        border-top-color: #ff6b6b;
      }
    }
  }

  .item-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 20px;

    .item {
      width: 160px;
      height: 300px;

      a:nth-child(1) {
        display: block;
        width: 160px;
        height: 214px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      a:nth-child(2) {
        display: block;
        // margin-top: 5px;
        margin: 5px 0 2px 0;
        line-height: 20px;

        &:hover {
          color: #ff6b6b;
        }
      }

      p {
        font-size: 12px;
        color: #a6abc8;
      }
    }
  }
}
</style>