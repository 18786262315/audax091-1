<template>
  <div class="pro_page_content">
    <div class="pro_page_header_div">
      <div class="logo">
        <img style="max-width: 100%;max-height: 100%;" src="@/assets/logo2.png" />
      </div>
      <!-- <img style="max-width: 100%;max-height: 100%;" src="@/assets/logo1.png" /> -->
      <div class="btn_list">
        <div class="btn_header" v-for="(i,index) in unit_type_list" :key="index">
          <template>
            <div class="round_btn_div btn_cursor" @click="btn_n = index">{{i.name}}</div>
          </template>

          <template>
            <ul v-show="btn_n == index">
              <li v-for="(n,index2) in i.to_type" :key="index2">
                <div
                  class="round_btn_div btn_cursor"
                  @click="setanimation(n.typecls,n.imgnames);"
                >{{n.name}}</div>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>

    <div v-if="loadingindex" class="loading_div">
      <div style="color:white">Loading...{{Math.round(loadingindex)}}%</div>
    </div>

    <div class="bottom_btn_div">
      <!-- 旋转按钮 -->
      <div class="round_btn_div btn_cursor" @click="startrotating()">
        <svg
          t="1598104788972"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="24205"
          width="20"
          height="20"
          style="padding: 5px;"
        >
          <path
            d="M929 849a30 30 0 0 1-30-30v-83.137a447.514 447.514 0 0 1-70.921 92.209C722.935 933.225 578.442 975.008 442 953.482a444.917 444.917 0 0 1-241.139-120.591 30 30 0 1 1 37.258-47.01l0.231-0.231A385.175 385.175 0 0 0 442 892.625v-0.006c120.855 22.123 250.206-13.519 343.656-106.975a386.646 386.646 0 0 0 70.6-96.653h-87.247a30 30 0 0 1 0-60H929a30 30 0 0 1 30 30V819a30 30 0 0 1-30 30zM512 392a120 120 0 1 1-120 120 120 120 0 0 1 120-120z m293.005-147.025a29.87 29.87 0 0 1-19.117-6.882l-0.232 0.231A386.5 386.5 0 0 0 689.478 168h-0.011c-145.646-75.182-329.021-51.747-451.117 70.35a386.615 386.615 0 0 0-70.6 96.65H255a30 30 0 0 1 0 60H95a30 30 0 0 1-30-30V205a30 30 0 0 1 60 0v83.129a447.534 447.534 0 0 1 70.923-92.206C317.981 73.866 493.048 37.2 647 85.836v-0.045a444.883 444.883 0 0 1 176.143 105.291 30 30 0 0 1-18.138 53.893z"
            fill="#000"
            p-id="24206"
          />
        </svg>
        <span>ROTATE</span>
      </div>
      <div class="round_btn_div btn_cursor" @click="stoprotating()">
        <svg
          t="1598104863542"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="25007"
          width="20"
          height="20"
          style="padding: 5px;"
        >
          <path
            d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m3.008-92.992a416 416 0 1 0 0-832 416 416 0 0 0 0 832zM320 320h384v384H320V320z"
            p-id="25008"
            fill="#000"
          />
        </svg>
        <span>STOP</span>
      </div>
    </div>

    <div class="pro_page_models_div">
      <div align="justify" class="img3dmodels">
        <ul style="padding-inline-start: 0px; pointer-events: none;">
          <li
            style="width:100%; pointer-events: none; list-style-type: none;"
            v-show="index == n"
            v-for="(i,index) in imglist"
            :key="index"
          >
            <img style="width: 100%;  pointer-events: none;" :src="i" />
          </li>
        </ul>

        <!-- <img id="floormodels" :src="imgeurl" /> -->
        <div id="animation_div" v-if="animation_list !=[]">
          <div
            v-for="(i,index3) in animation_list"
            :key="index3"
            class="animation"
            :style="`width: ${i.w}; height: ${i.h}; left: ${i.x}; top: ${i.y}; border-color: ${i.color};`"
            @click="goPage('/unitinfo',i.type)"
          >
            <div v-if="toPoint(i.h) > 10 " class="animation_for_size_div">
              <div v-for="a in 2" :key="a">
                <span>{{i.type}}</span>
              </div>
            </div>
            <div v-else class="animation_for_size_div">{{i.type}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { log } from "util";
export default {
  data() {
    return {
      imgs: [],
      positionY_1: 0,
      btn_n: null,
      loading: 0,
      loadingindex: 0,
      unit_type_list: this.Datas.unit_type_list,
      imglist: [],
      imgeurl: require("@/assets/model/091-Fyve Derby_00000.png"),
      markindex: 0,
      n: 0,
      fangm: 1,
      rotatingtype: false,
      interval: null,
      animation_list: [],
      length:"800px"
    };
  },

  methods: {
    winsize(){
         let model = document.getElementsByClassName("img3dmodels")[0];
          var width= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          var height= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
          if(width>height){
            this.length=height
          }else{
            this.length=width
          }
          model.style.width = `${this.length}px`
          model.style.height = `${this.length}px`        
          console.log(width,height,`${this.length}px`)
    },
    toPoint(percent) {
      var str = percent.replace("%", "");
      str = str.toString();
      return str;
    },

    cutscene(start, end) {
      // 转场动画
      // start, end 开始结束位置
      this.n = start;
      let type = end > start ? true : false;

      this.interval = setInterval(() => {
        if (type) {
          this.n += 1;
        } else {
          this.n -= 1;
        }
        this.n < 64 ? this.n : (this.n = 0);
        this.n > 0 ? (this.n = 64) : this.n;

        // this.imgpath();
      }, 120);

      // this.stoprotating();
    },
    removeanimation() {
      //清空动画
      this.animation_list = [];
    },

    setanimation(parameter, imgIndex) {
      this.removeanimation(); // 清空动画
      this.stoprotating(); // 停止旋转
      this.n = imgIndex; //设定主图
      this.imgpath();
      // console.log(parameter)
      this.animation_list = parameter; //设定动画列表
    },

    // 模型旋转
    stoprotating() {
      //停止
      clearInterval(this.interval);
      this.rotatingtype = false;
    },
    startrotating() {
      //旋转
      this.removeanimation();
      if (!this.rotatingtype) {
        this.interval = setInterval(() => {
          this.n -= 1;
          this.n < 0 ? (this.n = 64) : this.n;
          // this.n < 64 ? this.n : (this.n = 0);
          this.imgpath();
        }, 120);
        this.rotatingtype = true;
      }
    },

    formatZero(num, length) {
      // 获取动态文件名称
      //num:要处理的参数
      // length: 要返回的总长度
      return (Array(length).join(0) + num).slice(-length);
    },

    // 预加载图片
    loadimg() {
      for (let index = 0; index < this.imglist.length; index++) {
        const element = this.imglist[index];
        let img = new Image();
        img.src = element;
      }
    },
    LoadingImageList() {
      this.loading = 0;
      // this.loadingindex = 0;
      this.imgs = [];
      let model = document.getElementsByClassName("img3dmodels")[0];
      // console.log(model);
      this.imgs = model.querySelectorAll("img"); //获取模型节点下的所有图片
      // console.log(this.imgs);
      Array.from(this.imgs).forEach((item) => {
        let img = new Image();
        img.onload = () => {
          this.loading++;
          this.loadingindex = (this.loading / 65) * 100;
        };
        img.src = item.getAttribute("src");
      });
      console.log("sss");
    },
    // 生成图片文件列表
    getlist() {
      var filenumber = 65; //文件数量
      let m_ist = [];
      for (let index = 0; index < filenumber; index++) {
        //   const element = array[index];091-Neu atNovena_00000
        let url = require(`@/assets/model/091-Fyve Derby_${this.formatZero(
          index,
          5
        )}.png`);
        // console.log(url);
        this.imglist.push(url);
      }
      //   console.log(m_ist)
      // this.imglist = m_ist;
      // this.loadimg();
    },

    imgpath() {
      // 设定图片路径
      this.imgeurl = this.imglist[this.n];
    },

    rotating(left, width_w) {
      // console.log("asdasd", left, this.positionY_1);
      this.removeanimation();
      //旋转函数
      // left当前传入的位置
      // width_w 最大宽度
      console.log(left, width_w);

      if (left && width_w) {
        // console.log(left, this.positionY_1, width_w, mom);
        if (left > this.positionY_1) {
          // console.log("==========>>右转", left, this.positionY_1);
          this.n -= 1;
          this.n > 0 ? this.n : (this.n = 64);
          console.log("减", left, this.positionY_1);
          this.imgpath();
          // console.log(this.img_url);
          this.positionY_1 = left;
        } else if (left < this.positionY_1) {
          // console.log("====>>左转", left, this.positionY_1);
          this.n += 1;
          this.n < 64 ? this.n : (this.n = 0);
          console.log("加", left, this.positionY_1);
          this.imgpath();
          // console.log(this.img_url);
          this.positionY_1 = left;
        }
      } else {
        console.log("超出元素范围");
      }
    },

    // 鼠标手势处理
    move(e) {
      let firstTime = "",
        lastTime = "";
      firstTime = new Date().getTime();
      let op = e.target; //获取目标元素
      let width_w = op.offsetWidth; //获取元素宽度
      //   document.onmousedown = (e) => {
      //     console.log(365);
      //   };
      document.onmousemove = (e) => {
        lastTime = new Date().getTime();
        if (lastTime - firstTime > 200) {
          //算出鼠标相对元素的位置
          let left = e.clientX - op.offsetLeft;
          let top = e.clientY - op.offsetTop;
          //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          console.log(width_w);

          this.rotating(left, width_w);
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.positionY_1 = 0;
      };
      document.onmousewheel = (e) => {
        // 鼠标滚轮事件
        let op = document.getElementsByClassName("img3dmodels")[0]; //获取操作元素
        var eleW = op.offsetWidth;
        var eleH = op.offsetHeight;
        console.log("鼠标缩放操作===>>>", this.fangm);

        if (e.wheelDelta < 0) {
          // console.log("-");
          this.fangm > 0.3 ? (this.fangm -= 0.1) : 0.3;
          op.style.transform = "scale(" + this.fangm + ")";
        } else {
          // console.log("+");
          this.fangm < 2 ? (this.fangm += 0.1) : 2;
          op.style.transform = "scale(" + this.fangm + ")";
        }
      };
    },

    formatZero(num, length) {
      // 获取动态文件名称
      //num:要处理的参数
      // length: 要返回的总长度
      return (Array(length).join(0) + num).slice(-length);
    },

    getDistance(p1, p2) {
      var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },
    phonetouchmove(e) {
      let as = document.getElementsByClassName("img3dmodels")[0]; //获取操作元素
      document.touchmove = (test) => {
        console.log("dddd");
      };
      if (e.touches.length == 1) {
        console.log("滑动---");
        let op = e.target; //获取目标元素 phone
        let width_w = op.offsetWidth; //获取元素宽度
        //算出鼠标相对元素的位置
        let left = e.targetTouches[0].pageX;
        let top = e.targetTouches[0].pageY;
        // console.log(width_w);
        this.rotating(left, width_w);
      }
      if (e.touches.length == 2) {
        console.log("缩放---");
        var now = e.touches;
        var scale =
          this.getDistance(now[0], now[1]) /
          this.getDistance(this.start[0], this.start[1]);
        console.log("获得缩放比例---", scale);

        scale = scale.toFixed(2);
        console.log("比例取整---", scale);
        // scale >= 0.5 ? scale : 0.5;
        as.style.transform = "scale(" + scale + ")";
      }
    },
    phonetouchstart(e) {
      console.log("手指按下开始执行---");
      let htmls = document.querySelector("html");
      htmls.style = "overflow:hidden;height:100%;";
      if (e.touches.length == 2) {
        //判断是否有两个点在屏幕上
        console.log("双指---");
        this.start = e.touches; //得到第一组两个点
      }
      if (e.touches.length == 1) {
        console.log("单指---");
        // let x = e.targetTouches[0].pageX;
        // let y = e.targetTouches[0].pageY;
      }
    },
    phonetouchend() {
      console.log("结束操作---");
      let htmls = document.querySelector("html");
      htmls.style = "overflow: visible;";
      this.x = 0;
      this.y = 0;
    },
    goPage(pageName, item) {
      console.log(pageName, item);

      this.$router
        .push({
          path: pageName,
          query: {
            typename: item,
          },
        })
        .catch((err) => {});
    },
  },

  watch: {
    n(val, oldval) {
      console.log(val);
    },

    imglist() {
      // 监听楼栋图片列表
      this.$nextTick(() => {
        // this.loadingindex = false;
        // console.log(this.loadingindex);

        this.LoadingImageList(); //加载图片
      });
    },
    loadingindex(val, oldval) {
      // 终止加载动画
      if (val == 100) {
        this.loadingindex = false;
        // console.log(this.loadingindex);
        //然后可以对后台发送一些ajax操作
      }
    },
  },

  mounted() {
    this.winsize()
    this.n = 0;
    this.getlist();
    // this.cutscene(62, 10);
  },
};
</script>

<style >
@import "~@/style/css/FloorAnimation.css";




#animation_div{
  position: absolute;
  width: 100%;
  height: 100%;
}
.animation_for_size_div {
  color: white;
    justify-content: space-around;
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    align-items: center;
  line-height: 10px;
}

.loading_div {
  width: 100vw;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: rgb(139, 138, 138, 0.5);
}
#floormodels {
  pointer-events: none;
  position: absolute;
}

.pro_page_models_div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.img3dmodels {
  position: relative;
  left: 0;
  right: 0;
  /* margin: 0 auto; */
  /* top: 10vh; */
  justify-content: center;
  /* top: 0; */
  bottom: 0;
  /* width: 80%;
  height: 80%; */
  /* width: 800px;
  height: 800px; */
  transform: scale(1.5);
  align-items: center;
  display: flex;
  font-size: 12px;
}

.bottom_btn_div {
  position: fixed;
  bottom: 30px;
  display: flex;
  left: 5%;
  font-size: 12px;
  z-index: 200;
}
.bottom_btn_div div {
  margin: 0 8px;
  padding: 3px;
  display: flex;
  width: 120px;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 185px;
  line-height: 15px;
  border-radius: 10px;
  /* padding: 20px; */
  /* background: #000; */
  height: auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pro_page_content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.pro_page_header_div {
  position: fixed;
  width: 185px;
  left: 5%;
  top: 5%;
  z-index: 200;
  /* font-family: Regular;  */
}
.btn_list {
  width: 100%;
  /* display: list-item; */
  font-size: 12px;
  margin-top: 10px;
}

.round_btn_div {
  background: #fff;
  color: #000;
  border-radius: 25px;
  /* height: 30px; */
  align-items: center;
  display: grid;
  justify-content: start;
  padding-left: 13px;
}
.btn_header {
  padding: 4px 0;
}
.btn_header ul li {
  padding: 4px;
  list-style-type: none;
}
.btn_header ul {
  margin-block-end: auto;
  /* padding-inline-start: 0px; */
  margin-block-start: 0px;
  margin: 2px 0;
}

.pro_page_content {
  /* 背景 */
  /* background-color: #fff79e; */
  background-image: url("~@/assets/img/background.png");
  background-attachment: fixed;
  background-size: cover;
  background-color: white !important;
}

@media screen and (max-width: 800px) {
  .img3dmodels {
    position: absolute;
    bottom: 20px;
    margin: auto;
  }
    .logo{
    width: 125px;
  }
  .pro_page_header_div{
    width: 125px;
  }
    .round_btn_div{
        line-height: 16px !important;
  }
  .btn_header ul{
  padding-inline-start: 20px;

  }
}
@media screen and (max-height: 500px) {
  /* .img3dmodels {
    width: 600px;
    height: 600px;
  } */
      .logo{
    width: 125px;
  }
}
</style>
