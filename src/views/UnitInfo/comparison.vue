<template>
  <div class="comparison_content_div">
    <div class="comparison_header_div">
      <img style="max-width: 100%;max-height: 100%;" src="@/assets/logo.png" />
      <div class="comparison_btn_div btn_cursor" @click="$router.back(-1)">Back</div>
    </div>

    <div class="comparison_list_div">
      <buildingsvg :index="1" :zoom="1" :unit_img_url="unit_img_url" >

      </buildingsvg>
      <buildingsvg :index="2" />
      <!-- <div
        @mouseover="move"
        style="width:50%;height:100%;background: red;overflow: hidden; position: relative; pointer-events: none; "
        >
        <VueDragResize
          :isActive="true"
          :isResizable="false"
          :w="200"
          :h="200"
          :parentW="800"
          :parentH="800"
          v-on:dragging="resize"
          id="divs"
          style="pointer-events: auto; "
        >
          <template>
            <div style="background:#dac5c5">
              <div>
                <h3>Hello World!</h3>
                <p>{{ top }} х {{ left }}</p>
                <p>{{ width }} х {{ height }}</p>
              </div>
              <div>
                <h3>Hello World!</h3>
                <p>{{ top }} х {{ left }}</p>
                <p>{{ width }} х {{ height }}</p>
              </div>
            </div>
          </template>
        </VueDragResize>
      </div>-->
    </div>
  </div>
</template>


<script>
import buildingsvg from "@/components/BuildingSvg.vue";
export default {
  name: "comparison",

  components: {
    buildingsvg,
  },
  data() {
    return {
      unit_img_url:this.$route.query.typename,
      comparison_div1: true,
      comparison_div2: true,
      contrast: false,
      fangm: 1,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      
    };
  },
  methods: {
    setimageurl(data){
      console.log(data)
      this.unit_img_url = data
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    setcomparisondiv(e) {
      console.log("鼠标悬停", e);
    },
    move(e) {
      // let op = document.getElementById("divs");
      console.log("鼠标移动到位置");
      console.log(e);
      let op = e.target;
      document.onmousewheel = (e) => {
        // 鼠标滚轮事件

        var eleW = op.offsetWidth;
        var eleH = op.offsetHeight;
        console.log("鼠标缩放操作===>>>", this.fangm);

        if (e.wheelDelta < 0) {
          // console.log("-");
          this.fangm > 1 ? (this.fangm -= 0.1) : 1;
          op.style.transform = "scale(" + this.fangm + ")";
        } else {
          // console.log("+");
          this.fangm < 3 ? (this.fangm += 0.1) : 3;
          op.style.transform = "scale(" + this.fangm + ")";
        }
      };
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
        console.log(width_w);
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
  },

  watch: {
    comparison_div1(val, oldval) {
      console.log(val, oldval);
    },
  },

  mounted() {},
};
</script>


<style>
.comparison_header_img_div {
  width: 185px;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 50px;
  display: flex;
  /* background: #000; */
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.comparison_content_div {
  width: 100%;
  height: 100%;
}
.comparison_list_div {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  grid-template-columns: 50% 50%;
  justify-content: space-around;
  align-items: center;
  flex-flow: row;
}

.comparison_header_div {
  line-height: 48px;
  width: 185px;
  position: fixed;
  z-index: 999;
  left: 20px;
  top: 20px;
}

.comparison_btn_div {
  background: #BCB8AF !important;
  border-radius: 25px;
  height: 30px;
  position: absolute;
  width: 120px;
  left: 10px;
  color: #000;
  
}
@media screen and (max-width: 800px) {
  .comparison_header_div{
        width: 85px;
  }
  .comparison_btn_div{
        width: 85px;
  }
  .comparison_list_div{
        flex-flow: column;
  }
}
@media screen and (max-height: 800px) {
  .comparison_header_div{
        width: 85px;
  }
  .comparison_btn_div{
        width: 85px;
  }
  /* .comparison_list_div{
        flex-flow: column;
  } */
}
</style>
