<template>
  <div
    @touchstart="phonetouchstart"
    @touchmove="phonetouchmove"
    @touchend="phonetouchend"
    @mousedown="move"
    class="map-outline-border"
    height="600"
    width="600"
  >
    <!-- <iframe  src="../../map.svg" width="300" height="500"> 
    </iframe>-->
    <div
      class="map-interior"
      :style="`width:${mapwidth}px;height:${mapheight}px;top:${top}px;left:${left}px`"
    >
      <svg
        id="svgtest"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="500px"
        height="500px"
        viewBox="0 0 500 500"
        style="enable-background:new 0 0 500 500;"
        xml:space="preserve"
      >
        <g id="page1">
          <polygon
            style="fill:#85FFFF;stroke:#000000;stroke-miterlimit:10;"
            points="64.404,76.573 381.259,81.067 381.259,313.651 
		                    171.146,313.651 	"
          />
        </g>
        <g id="page2">
          <rect
            id="test"
            x="295.304"
            y="96.236"
            style="fill:#853DFF;stroke:#000000;stroke-miterlimit:10;"
            width="66.292"
            height="38.202"
          />
          <rect
            x="295.304"
            y="172.641"
            style="fill:#853DFF;stroke:#000000;stroke-miterlimit:10;"
            width="66.292"
            height="34.27"
          />
          <rect
            x="298.112"
            y="250"
            style="fill:#853DFF;stroke:#000000;stroke-miterlimit:10;"
            width="63.483"
            height="38.933"
          />
          <rect
            x="169.46"
            y="221.517"
            style="fill:#853DFF;stroke:#000000;stroke-miterlimit:10;"
            width="97.191"
            height="42.134"
          />
          <circle
            id="page3"
            style=" fill:#FF757F;stroke:#000000;stroke-miterlimit:10;"
            cx="198.674"
            cy="146.517"
            r="43.259"
          />
        </g>
      </svg>
    </div>
    <div class="zoom_btn_div">
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
      zoomsize: 1, //元素放大的倍数
      mapwidth: 800, //地图宽
      mapheight: 800, //地图高
      top: 0, //地图移动偏量高
      left: 0, //地图移动偏量宽
      map_ele:null,
    };
  },

  props: ["btn","F_w","F_h","F_t","F_l",],
  mounted() {
    this.get_map_element();
  },
  methods: {
    resetzoom() {
      this.top = 0
      this.left = 0
      this.zoomsize = 1;
      this.set_map_zoom()

    },
    subtractzoom() {
      this.zoomsize -= 0.2;
      this.set_map_zoom()
    },
    addzoom() {
      this.zoomsize += 0.2;
      this.set_map_zoom()
    },
    get_map_element() {
      let op = document.getElementsByClassName("map-interior")[0];
      this.map_ele = op;
      return op;
    },
    set_map_zoom(){
      this.top = 0
      this.left = 0
      this.zoomsize > 0.3 ? (this.zoomsize -= 0.1) : 0.3;
      this.zoomsize < 4 ? (this.zoomsize += 0.1) : 2;
      this.map_ele.style.transform = "scale(" + this.zoomsize + ")";
    },
    move(e) {
      let firstTime,lastTime
      firstTime = new Date().getTime();
      document.onmousedown = (e) => {
        // 点击事件 记录一次x,y的值，防止点击时坐标值偏移
      };
      // @mousedown="move"
      // let op = e.target; //获取目标元素
      let op = this.get_map_element();
      // let ele_w = op.offsetWidth; //获取元素宽度
      // let ele_h = op.offsetHeight; //获取元素宽度
      // var map_ele = op.getBoundingClientRect();
      // this.top = op.offsetTop;
      // this.left = op.offsetLeft;
      // this.mapwidth = op.offsetWidth; //获取元素宽度
      // this.mapheight = op.offsetHeight; //获取元素高度
      let newtop = op.offsetTop;
      let newleft = op.offsetLeft;
      // this.mapwidth = map_ele.width; //获取元素宽度
      // this.mapheight = map_ele.height; //获取元素高度
      console.log(
        "=====>>>",
        // this.top,
        // this.left,
        this.mapheight,
        this.mapwidth
      );
      //算出鼠标相对元素的位置,
      let x, y;
      if (this.zoomsize > 2) {
        x = e.clientX - Math.round(newleft * this.zoomsize) / this.zoomsize;
        y = e.clientY - Math.round(newtop * this.zoomsize) / this.zoomsize;
      } else {
        x = e.clientX - newleft;
        y = e.clientY - newtop;
      }
      document.onmousemove = (e) => {
        lastTime = new Date().getTime();
        if (lastTime - firstTime > 200) {
          console.log("元素位置===", this.left, this.top);
          console.log("鼠标位置===", e.clientX, e.clientY);
          console.log("鼠标相对元素位置===", x, y);
          console.log("元素位置2===", op.offsetLeft, op.offsetTop);

          let left = e.clientX - x;
          let top = e.clientY - y;
          //绑定元素位置到positionX和positionY上面
          console.log("元素跟随鼠标移动的位置===", left, top);
          // left >= 0 ? 0 : left;
          // top >= 0 ? 0 : top;
          this.top = top;
          this.left = left;
        }
      };
      document.onmousewheel = (e) => {
        // 鼠标滚轮事件

        // 获取当前元素放大后的事件参数

        // console.log("鼠标缩放操作===>>>", e.wheelDelta);

        if (e.wheelDelta < 0) {
          // console.log("-");
          this.zoomsize -= 0.1
          this.set_map_zoom()
        } else {
          // console.log("+");
          this.zoomsize += 0.1
          this.set_map_zoom()
        }
        // this.elementT_L(op);
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
      let op = document.getElementsByClassName("map-interior")[0];
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
        this.set_map_zoom()
      }
    },
    phonetouchstart(e) {
      let op = document.getElementsByClassName("map-interior")[0];
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
  }
};
</script>
<style >
html,body{
  overflow: hidden;
}
.map-outline-border {
  overflow: hidden;
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  /* box-shadow: 0px 0px 1px red; */
}
.map-interior {
  position: absolute;
  display: flex;
  left: 0px;
  top: 0px;
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
#myVideo {
  height: 600px;
  width: 100%;
}




</style>