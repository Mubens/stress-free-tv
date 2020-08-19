<template>
  <div class="barrage-wrapper" tabindex="0">
    <div class="barrage-wrapper-left">
      <div class="video-info"></div>
      <input type="checkbox" class="checke" id="danmu_btn" />
    </div>
    <div class="barrage-wrapper-right">
      <input type="text" class="send-text" placeholder="发送弹幕" />
      <input type="button" class="send-btn" value="发送" />
    </div>
  </div>
</template>


<style scoped>
input {
  outline: none;
  border: none;
}
/*发送弹幕*/
.barrage-wrapper {
  display: flex;
  width: 100%;
  height: 45px;
  padding: 0 10px;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px #dadada;
  border-radius: 2px;
  box-sizing: border-box;
}
.barrage-wrapper-left {
  width: 300px;

  /* background-color: pink; */
}

.barrage-wrapper-right {
  flex: 1;
  display: flex;
  align-self: center;
}
/*弹幕*/
.video-info {
  width: 200px;
  height: 100%;
  float: left;
  margin-left: 18px;
  margin-right: 18px;
}
/*弹幕开关*/
.checke {
  position: relative;
  top: 50%;
  -webkit-appearance: none;
  width: 30px;
  height: 20px;
  line-height: 44px;
  background: #757575;
  border-radius: 30px;
  cursor: pointer;
  transform: translateY(-50%);
}
.checke:before {
  position: absolute;
  left: 2px;
  top: 0;
  content: "弹";
  text-align: center;
  width: 20px;
  line-height: 20px;
  border-radius: 50%;
  background: #ffffff;
  color: #757575;
  box-shadow: 0px 0px 4px #868686;
  transition: all 0.2s linear;
  font-size: 7px;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.8);
}

.checke:checked {
  background: #00a1d6;
}
.checke:checked:before {
  left: 12px;
  transition: all 0.2s linear;
  color: #00a1d6;
}

.send-text {
  height: 28px;
  width: 100%;
  float: left;
  padding-left: 30px;
  border: 1px solid #e7e7e7;
  border-radius: 2px 0 0 2px;
  background-color: #f4f4f4;
}

/*发送btn*/
.send-btn {
  width: 80px;
  height: 30px;
  float: left;
  border-radius: 0 2px 2px 0;
  color: white;
  background-color: #00a1d6;
  cursor: pointer;
}
.send-btn:hover {
  background-color: rgb(0, 181, 229);
}
</style>