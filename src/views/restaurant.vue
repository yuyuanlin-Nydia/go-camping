<template>
  <RvModule v-if="isBooking" @update="selfUpdate" />
  <BannerTop >
    <template v-slot:title>餐廳資訊</template>
  </BannerTop>
  <div class="myContainer main">
    <div class="restaurant_div">
      <button class="btn_green1" @click="rvBooking">線上訂位</button>
        <!-- <button class="btn_green1">預約外帶</button> -->
      <div class="menu">
        <h2 class="text-center">菜單</h2>
        <div class="d-flex">
          <div class="bottom-opacity" @click="showBigMenu(0)">
            <img src="../assets/img/dinning/menu1.jpg" alt="" />
            <div class="bottom">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
          <div class="bottom-opacity" @click="showBigMenu(1)">
            <img src="../assets/img/dinning/menu2.jpg" alt="" />
            <div class="bottom">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
          <div class="bottom-opacity" @click="showBigMenu(2)">
            <img src="../assets/img/dinning/menu3.jpg" alt="" />
            <div class="bottom">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
          <div class="bottom-opacity" @click="showBigMenu(3)">
            <img src="../assets/img/dinning/menu4.jpg" alt="" />
            <div class="bottom">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="dinning_env">
        <h2 class="text-center">用餐環境</h2>
        <div class="evimg_div">
          <div class="bottom-opacity" @click="showThumbnailSlider(0)">
            <img src="../assets/img/dinning/dinning9.jpg" alt="" />
            <div class="bottom">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
          <div class="bottom-opacity" @click="showThumbnailSlider(1)">
            <img src="../assets/img/dinning/dinning2.jpg" alt="" />
            <div class="bottom">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
          <div class="bottom-opacity" @click="showThumbnailSlider(2)">
            <img src="../assets/img/dinning/dinning3.jpg" alt="" />
            <div class="bottom">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
          <div class="bottom-opacity" @click="showThumbnailSlider(3)">
            <img src="../assets/img/dinning/dinning4.jpg" alt="" />
            <div class="bottom">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LightBox v-if="isLightBox1" @update="hideLightBox">
    <splide :options="primaryOptions" ref="primary1">
      <splide-slide v-for="slide in menus" :key="slide.src">
        <img :src="slide.src" alt="slide.alt" />
      </splide-slide>
    </splide>
    <splide :options="secondaryOptions" ref="secondary1">
      <splide-slide v-for="slide in menus" :key="slide.src">
        <img :src="slide.src" alt="slide.alt" />
      </splide-slide>
    </splide>
  </LightBox>
  <LightBox v-if="isLightBox2" @update="hideLightBox">
    {{ primaryOptions }}
    <splide :options="primaryOptions" ref="primary">
      <splide-slide v-for="slide in slides" :key="slide.src">
        <img :src="slide.src" alt="slide.alt" />
      </splide-slide>
    </splide>
    <splide :options="secondaryOptions" ref="secondary">
      <splide-slide v-for="slide in slides" :key="slide.src">
        <img :src="slide.src" alt="slide.alt" />
      </splide-slide>
    </splide>
  </LightBox>
</template>

<script>
import "bootstrap";
import RvModule from "../components/rvModule.vue";
import LightBox from "../components/lightBox.vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import BannerTop from '../components/bannerTop.vue';

export default {
  name: "",
  components: {
    RvModule,
    LightBox,
    Splide,
    SplideSlide,
    BannerTop,
  },
  props: {},
  data() {
    return {
      toggleThumbnailSlider: null,
      isBooking: null,
      isLightBox1: null,
      isLightBox2: null,
      lightBoxIndex: null,

      primaryOptions: {
        start: 0,
        type: "loop",
        perPage: 1,
        perMove: 1,
        gap: "1rem",
        pagination: false,
        width: 800,
        heightRatio: 0.7,
        cover: true,
        arrows: false,
      },
      secondaryOptions: {
        start: 0,
        type: "slide",
        rewind: true,
        gap: "1rem",
        pagination: false,
        fixedWidth: 220,
        fixedHeight: 140,
        cover: true,
        focus: "center",
        isNavigation: true,
        updateOnMove: true,
      },
      slides: [
        { src: require("../assets/img/dinning/dinning9.jpg") },
        { src: require("../assets/img/dinning/dinning2.jpg") },
        { src: require("../assets/img/dinning/dinning3.jpg") },
        { src: require("../assets/img/dinning/dinning4.jpg") },
        { src: require("../assets/img/dinning/dinning5.jpg") },
        { src: require("../assets/img/dinning/dinning6.jpg") },
        { src: require("../assets/img/dinning/dinning7.jpg") },
        { src: require("../assets/img/dinning/dinning8.jpg") },
      ],
      menus: [
        { src: require("../assets/img/dinning/menu1.jpg") },
        { src: require("../assets/img/dinning/menu2.jpg") },
        { src: require("../assets/img/dinning/menu3.jpg") },
        { src: require("../assets/img/dinning/menu4.jpg") },
      ],
    };
  },
  mounted() {
    // Set the sync target.
  },
  methods: {
    // 環境燈箱
    showThumbnailSlider(idx) {
      this.isLightBox2 = true;
      this.primaryOptions.width = 800;
      this.primaryOptions.heightRatio = 0.7;
      this.primaryOptions.height = 0;
      this.primaryOptions.start = idx;
      this.secondaryOptions.start = idx;
      this.$nextTick(function () {
        this.$refs.primary.sync(this.$refs.secondary.splide);
      });
    },
    // 線上訂位
    rvBooking() {
      if(this.$store.state.user[0]){
        this.isBooking = true;
      }else{
        alert("請先登入才能進行線上訂位喔!")
        this.$router.push({name:'SignIn'})
      }
    },
    selfUpdate(val) {
      this.isBooking = val;
    },
    hideLightBox(val) {
      this.isLightBox1 = val;
      this.isLightBox2 = val;
    },
    // 菜單燈箱
    showBigMenu(idx) {
      this.isLightBox1 = true;
      this.primaryOptions.width = "35%";
      this.primaryOptions.height = "100%";
      this.primaryOptions.start = idx;
      this.secondaryOptions.start = idx;
      this.$nextTick(function () {
        this.$refs.primary1.sync(this.$refs.secondary1.splide);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.restaurant_div {
  width: 75%;
  margin-bottom: 100px;
  .menu {
    h2 {
      margin: 50px 0 20px 0;
      font-weight: 700;
    }
  }
  .dinning_env {
    h2 {
      margin: 50px 0 20px 0;
      font-weight: 700;
    }

    .evimg_div {
      display: flex;
    }
  }
}
.bottom-opacity {
  width: 25%;
  position: relative;
  height: 250px;

  img {
    width: 100%;
    height: 250px;
  }
  .bottom {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0px;
    display: grid;
    place-items: center;

    .fa-search-plus {
      font-size: 50px;
      color: $color4;
      visibility: hidden;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
    &:hover .fa-search-plus {
      visibility: visible;
    }
  }
}

.myModal {
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  position: absolute;
  display: none;

  p {
    text-align: right;
    margin: 50px;
  }
  .modalBody {
    text-align: center;
    position: relative;
    top: 20%;
    transform: translateY(-50%);
  }
  img {
    width: 40%;
    margin: 0 100px;
    &:hover {
      box-shadow: rgb(3, 3, 3) 3px 3px 15px;
    }
  }
  .fa-angle-left,
  .fa-angle-right,
  .fa-times-circle {
    font-size: 50px;
    cursor: pointer;
  }
}
.btn_green1 {
  margin-right: 20px;
  margin-top: 50px;
}
.splide {
  padding: 1rem 3em;
  margin: 0 auto;
}
</style>

