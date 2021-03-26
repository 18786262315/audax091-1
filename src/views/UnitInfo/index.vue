<template>
  <div class="unit_content_div">
    <!-- <div class="unitinfo_header_div">
      <div class="unitinfo_header_img_div">
        <img style="max-width: 100%;max-height: 100%;" src="@/assets/logo.png" />
      </div>
      <div class="unitinfo_btn_div btn_cursor" @click="$router.back(-1)">返回</div>
    </div>-->

    <div class="unitinfo_btn_group">
      <div @click="setzooms()">
        <svg
          t="1598077082941"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4039"
          width="20"
          height="20"
        >
          <path
            d="M460.8 51.2a409.6 409.6 0 0 1 323.1232 661.3504c2.3552 1.536 4.608 3.4304 6.656 5.5296l202.24 202.24a51.2 51.2 0 0 1-72.3968 72.3968l-202.24-202.24a51.5584 51.5584 0 0 1-5.632-6.656A409.6 409.6 0 1 1 460.8 51.2z m0 102.4a307.2 307.2 0 1 0 0 614.4A307.2 307.2 0 0 0 460.8 153.6z"
            p-id="4040"
            fill="#ffffff"
          />
        </svg>
      </div>
      <div @click="$router.back(-1)">
        <svg
          t="1598077045604"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3201"
          width="20"
          height="20"
        >
          <path
            d="M512 421.504l274.752-274.752 90.496 90.496L602.496 512l274.752 274.752-90.496 90.496L512 602.496l-274.752 274.752-90.496-90.496L421.504 512 146.752 237.248l90.496-90.496z"
            p-id="3202"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>

    <div class="unit_list_div">
      <div class="unit_img_div">
        <motion
          :w="800"
          :h="800"
          :btn="false"
          :newstyle="'display:flex;justify-content:center;align-items: center;'"
        >
          <img
            class="zoom_img"
           
            :src="unitimg"
          />
        </motion>
      </div>

      <div style="position: absolute;
    bottom: 30px;">
        <div style class="btn_cursor comparison_btn" @click="goPage('/comparison',unitimg)">
          <svg
            t="1598077794460"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4986"
            width="20"
            height="20"
          >
            <path
              d="M776.533333 896H247.466667C181.333333 896 128 842.666667 128 776.533333V247.466667C128 181.333333 181.333333 128 247.466667 128h531.2c66.133333 0 119.466667 53.333333 119.466666 119.466667v531.2c-2.133333 64-55.466667 117.333333-121.6 117.333333zM247.466667 213.333333c-19.2 0-34.133333 14.933333-34.133334 34.133334v531.2c0 19.2 14.933333 34.133333 34.133334 34.133333h531.2c19.2 0 34.133333-14.933333 34.133333-34.133333V247.466667c0-19.2-14.933333-34.133333-34.133333-34.133334H247.466667z"
              p-id="4987"
              fill="#ffffff"
            />
            <path
              d="M853.333333 441.6H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667z"
              p-id="4988"
              fill="#ffffff"
            />
            <path
              d="M398.933333 896c-23.466667 0-42.666667-19.2-42.666666-42.666667V398.933333c0-23.466667 19.2-42.666667 42.666666-42.666666s42.666667 19.2 42.666667 42.666666V853.333333c0 23.466667-19.2 42.666667-42.666667 42.666667z"
              p-id="4989"
              fill="#ffffff"
            />
          </svg>
          <span>COMPARE</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import motion from "@/components/motion.vue";

export default {
  components: {
    motion,
  },
  data() {
    return {
      zoomtype: true,
      unitimg: "",
      foortype: "",
    };
  },

  methods: {
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
    setzooms() {
      let op = document.getElementsByClassName("zoom_img")[0];

      if (this.zoomtype) {
        op.style = "transform: scale(2);";
      } else {
        op.style = "transform: scale(1);";
      }
      this.zoomtype = !this.zoomtype;
    },
  },
  mounted() {
    this.foortype = this.$route.query.typename;
    this.unitimg = require("../../assets/unit/" + this.foortype + ".jpg");
  },
};
</script>


<style>
.comparison_btn {
  /* width: 60px; */
  height: 35px;
  /* line-height: 35px; */
  background: #000;
  color: white;
  border-radius: 25px;
  display: flex;
  width: 120px;
  justify-content: center;

  align-items: center;
}

.unitinfo_btn_group {
  position: fixed;
  width: 60px;
  height: auto;
  bottom: 15px;
  right: 15px;
  display: flex;
  justify-content: space-between;
  background: gray;
  padding: 10px;
  color: white;
  z-index: 200;
}
.unitinfo_btn_group div {
  line-height: 20px;
  height: 20px;
  cursor: pointer;
}
.unitinfo_btn_div {
  background: #C59329 ;
  color: white;
  border-radius: 25px;
  height: 30px;
  align-items: center;
  display: grid;
  justify-content: center;
  /* color: #fff; */
}

.unitinfo_header_img_div {
  width: 125px;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 125px;
  display: flex;
  background: #000;
  justify-content: center;
  align-items: center;
}

.unitinfo_header_div {
  width: 125px;
  position: fixed;
  z-index: 999;
  left: 20px;
  top: 20px;
}

.zoom_img {
  width: auto;
  height: 80%;
  -webkit-user-drag: none;user-select: none;pointer-events: none;
}

.unit_img_div {
  user-select: none;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.unit_content_div {
  width: 100%;
  height: 100%;
  /* background: #fff; */
}
.unit_list_div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
</style>
