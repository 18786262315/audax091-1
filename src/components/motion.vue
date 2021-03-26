<template>
  <div
    @touchstart="phonetouchstart"
    @touchmove="phonetouchmove"
    @touchend="phonetouchend"
    @mousedown="move"
    @mouseover="setzoom"
    class="map-outline-border"
  >
    <!-- <iframe  src="../../map.svg" width="300" height="500"> 
    </iframe>-->
    <div
      :id="'zoomelement'+index"
      class="map-interior"
      :style="` background: white;width:${mapwidth}px;height:${mapheight}px;left:${left}px; top:${top}px;${newstyle};transform:scale(${zoomsize})`"
    >
      <slot style="width:100%;height:100%"></slot>
    </div>
    <div v-show="btn" class="zoom_btn_div">
      <!-- 缩放功能按钮组 -->
      <div class="btn_cursor" @click="resetzoom()" style="margin-bottom: 10px;">
        <svg
          t="1598082441973"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8599"
          width="20"
          height="20"
        >
          <path
            d="M65.991363 679.954822c-12.104086 0-21.912081-9.807995-21.912081-21.91208s9.807995-21.912081 21.912081-21.912081h183.177057c38.183147 0 72.85129 15.590743 97.994906 40.734359 25.143616 25.11527 40.734359 59.811759 40.73436 97.994907v183.177057c0 12.104086-9.807995 21.912081-21.912081 21.91208s-21.912081-9.807995-21.91208-21.91208v-183.177057c0-26.079061-10.686746-49.805337-27.893257-67.011848s-40.932787-27.893257-67.011848-27.893257H65.991363z m613.935112 278.082162c0 12.104086-9.807995 21.912081-21.91208 21.91208s-21.912081-9.807995-21.912081-21.91208v-183.177057c0-38.183147 15.590743-72.85129 40.73436-97.994907 25.11527-25.143616 59.811759-40.734359 97.994906-40.734359h183.205404c12.104086 0 21.912081 9.807995 21.91208 21.912081s-9.807995 21.912081-21.91208 21.91208h-183.205404c-26.079061 0-49.805337 10.686746-67.011848 27.893257s-27.893257 40.932787-27.893257 67.011848v183.177057z m278.110509-613.963459c12.104086 0 21.912081 9.807995 21.91208 21.91208s-9.807995 21.912081-21.91208 21.912081h-183.205404c-38.183147 0-72.85129-15.590743-97.994906-40.73436s-40.734359-59.840106-40.73436-97.994906V65.963016c0-12.104086 9.807995-21.912081 21.912081-21.91208s21.912081 9.807995 21.91208 21.91208v183.205404c0 26.050714 10.686746 49.77699 27.893257 66.983501 17.206511 17.234858 40.932787 27.921603 67.011848 27.921604h183.205404zM344.073525 65.963016c0-12.104086 9.807995-21.912081 21.91208-21.91208s21.912081 9.807995 21.912081 21.91208v183.205404c0 38.1548-15.590743 72.85129-40.73436 97.994906s-59.811759 40.734359-97.994906 40.73436H65.991363c-12.104086 0-21.912081-9.807995-21.912081-21.912081s9.807995-21.912081 21.912081-21.91208h183.177057c26.079061 0 49.805337-10.686746 67.011848-27.893257 17.206511-17.234858 27.893257-40.932787 27.893257-67.011848V65.963016z"
            fill="#2c2c2c"
            p-id="8600"
          />
        </svg>
      </div>
      <div style="margin-bottom: 4px;" class="btn_cursor" @click="addzoom()">+</div>
      <div class="btn_cursor" @click="subtractzoom()">-</div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      p_x: 0, // 记录起点
      p_y: 0, // 记录起点
      start: [], // 缩放起点记录
      nowzoom:null, //元素放大的倍数
      mapwidth: "100%", //内容宽
      mapheight: "100%", //内容高
      top: 0, //地图移动偏量高
      left: 0, //地图移动偏量宽
      map_ele: null,
    };
  },

  props: ["index", "btn", "w", "h", "x", "y", "zoomsize", "newstyle"],
  mounted() {
    this.get_map_element();
    this.mapwidth = this.w+"px";
    this.mapheight = this.h+"px";
    this.nowzoom = this.zoomsize
    let map = document.getElementsByClassName("map-outline-border")[0];
    let new_w = map.offsetWidth; //获取元素宽度
    let new_h = map.offsetHeight; //获取元素高度
    this.top = this.y;
    this.left = (new_w - this.mapwidth) / 2;
    // console.log(this.left,this.zoomsize);
  },
  methods: {
    resetzoom() {
      this.top = 0;
      this.left = 0;
      this.zoomsize = 1;
      this.set_map_zoom();
    },
    subtractzoom() {
      this.zoomsize -= 0.2;
      this.set_map_zoom();
    },
    addzoom() {
      this.zoomsize += 0.2;
      this.set_map_zoom();
    },
    get_map_element() {
      let op = document.getElementById(`zoomelement${this.index}`);
      this.map_ele = op;
      return op;
    },
    set_map_zoom() {
      // this.top = 0
      // this.left = 0
      // this.zoomsize > 0.3 ? (this.zoomsize -= 0.1) : 0.3;
      // this.zoomsize < 4 ? (this.zoomsize += 0.1) : 2;
      // console.log(this.zoomsize)
      this.map_ele.style.transform = "scale(" + this.zoomsize + ")";
      
    },
    setzoom(e) {
      
      document.onmousewheel = (e) => {
        // 鼠标滚轮事件
        // 获取当前元素放大后的事件参数
        // console.log("鼠标缩放操作===>>>", e.wheelDelta);
        if (e.wheelDelta < 0) {
          console.log("-");
          this.zoomsize -= 0.1;
          this.$emit("setzoomsize",this.zoomsize)

          this.set_map_zoom();
        } else {
          // console.log("+");
          this.zoomsize += 0.1;
          this.$emit("setzoomsize",this.zoomsize)
          this.set_map_zoom();
        }
            // this.elementT_L(op);
        console.log("sss",this.zoomsize)
        let op = this.get_map_element();
        // let ele_w = op.offsetWidth; //获取元素宽度
        // let ele_h = op.offsetHeight; //获取元素宽度
        // var map_ele = op.getBoundingClientRect();
        // let newtop = map_ele.top;
        // let newleft = map_ele.left;
        // this.top = newtop;
        // this.left = newleft;

        // console.log("=====>>>", map_ele, newtop, newleft, e.clientX, e.clientY);
      };
    },
    move(e) {
      let firstTime, lastTime;
      firstTime = new Date().getTime();
      // @mousedown="move"
      // let op = e.target; //获取目标元素
      let op = this.get_map_element();
      // let ele_w = op.offsetWidth; //获取元素宽度
      // let ele_h = op.offsetHeight; //获取元素宽度
      // var map_ele = op.getBoundingClientRect();
      let newtop = op.offsetTop;
      let newleft = op.offsetLeft;
      // let new_w = op.offsetWidth; //获取元素宽度
      // let new_h = op.offsetHeight; //获取元素高度
      // let newtop = map_ele.top;
      // let newleft = map_ele.left;
      // this.mapwidth = map_ele.width; //获取元素宽度
      // this.mapheight = map_ele.height; //获取元素高度
      // console.log("=====>>>", map_ele, newtop, newleft, e.clientX, e.clientY);
      //算出鼠标相对元素的位置,
      let x = e.clientX - newleft;
      let y = e.clientY - newtop;

      // console.log("元素位置===", newleft, newtop);
      // console.log("鼠标位置===", e.clientX, e.clientY);
      // console.log("元素实际位置2===", op.offsetLeft, op.offsetTop);
      // console.log("鼠标相对元素位置===", x, y);
      document.onmousemove = (e) => {
        lastTime = new Date().getTime();
        if (lastTime - firstTime > 100) {
          e.stopPropagation();
          let left = e.clientX - x;
          let top = e.clientY - y;
          //绑定元素位置到positionX和positionY上面
          // console.log("元素跟随鼠标移动的位置===", left, top);
          this.top = top; // > 0 ? 0 : top; 限制拖动范围
          this.left = left; // > 0 ? 0 : left; 限制拖动范围
        }
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    getDistance(p1, p2) {
      var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },
    phonetouchmove(e) {
      let op = document.getElementById(`zoomelement${this.index}`);
      let eleW = op.offsetWidth; //获取元素宽度
      let eleH = op.offsetHeight;

      if (e.touches.length == 1) {
        // console.log("滑动---",e.targetTouches[0],op.offsetLeft);
        //算出鼠标相对元素的位置
        let left = e.targetTouches[0].clientX - this.p_x;
        let top = e.targetTouches[0].clientY - this.p_y;
        // this.Drag(op, top, left); //拖动元素
        this.top = top;
        this.left = left;
        this.start = e.touches; //得到第一组两个点
      }
      if (e.touches.length == 2) {
        var now = e.touches;
        var scale =
          this.getDistance(now[0], now[1]) /
          this.getDistance(this.start[0], this.start[1]);
        // console.log("获得缩放比例---", scale);
        console.log("比例取整---", scale);
        this.zoomsize = scale.toFixed(2);
        this.set_map_zoom();
      }
    },
    phonetouchstart(e) {
      let op = document.getElementById(`zoomelement${this.index}`);
      console.log("手指按下开始执行---", e.touches);
      let htmls = document.querySelector("html");
      htmls.style = "overflow:hidden;height:100%;";
      if (e.touches.length == 2) {
        //判断是否有两个点在屏幕上
        // console.log("双指---");
        this.start = e.touches; //得到第一组两个点
      }
      if (e.touches.length == 1) {
        // console.log("单指---");
        this.p_x = e.targetTouches[0].clientX - op.offsetLeft;
        this.p_y = e.targetTouches[0].clientY - op.offsetTop;
        console.log(this.x, this.y);
      }
    },
    phonetouchend(e) {
      console.log("结束操作---");
      let htmls = document.querySelector("html");
      htmls.style = "overflow: visible;";
    },
  },
};
</script>
<style >
html,
body {
  overflow: hidden;
}
.map-outline-border {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: white !important;
}
.map-interior {
  position: absolute;
  display: flex;
  -webkit-user-drag: none;
  user-select: none;
  cursor: pointer;
      width: 100%;
    height: 100%;

  /* background: tomato; */
  /* left: 0px;
  top: 0px; */
}
.zoom_btn_div {
  width: auto;
  bottom: 5%;
  right: 15px;
  position: absolute;
  display: grid;
}
.zoom_btn_div div {
  color: #000;
  line-height: 10px;
  /* margin: 2px; */
  width: 25px;
  height: 25px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
}

.btn_cursor {
  box-shadow: 0px 0px 2px rgb(204, 203, 203);
  /* width: 60px; */
  /* height:35px; */
  line-height: 30px;
  /* background: #000; */
  /* color: white; */
  border-radius: 25px;
}

.btn_cursor:hover {
  cursor: pointer;
  -webkit-touch-callout: none;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
</style>