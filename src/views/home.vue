<template>
  <Banner />
  <div class="main">
    <div class="announcement_div col-12">
      <p class="sub">ANNOUCENEMT</p>
      <h2 class="text-center">—園區公告—</h2>
      <table>
        <tr>
          <th class="column1">類別</th>
          <th class="column2">日期</th>
          <th class="column3">標題</th>
          <th class="column4">內容</th>
        </tr>
        <tr>
          <td><span>營業時間</span></td>
          <td>2021/05/15</td>
          <td>6/8前預訂變更政策</td>
          <td>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
            atque corporis velit accusantium? Adipisci recusandae perferendis
            voluptatibus nulla, illo corrupti iste obcaecati voluptate dolores
            repellendus velit doloremque repudiandae esse ab.
          </td>
        </tr>
        <tr>
          <td><span>行銷活動</span></td>
          <td>2021/05/15</td>
          <td>即日起，外帶餐點享77折</td>
          <td>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            voluptatum tempore delectus soluta ullam, nihil maxime unde
            architecto beatae, fugiat facere, cumque minima voluptates repellat
            rerum quam officiis! Illum, assumenda! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Possimus ducimus tenetur nobis non,
            voluptatibus aut? Blanditiis omnis minima officia ea, repellat ex
            delectus fuga doloremque laborum. Earum laborum fugiat magnam!
          </td>
        </tr>
      </table>
    </div>
    <div class="campus_intro_div col-12">
      <p class="sub">ENVIRONMENT</p>
      <h2 class="text-center">—輕鬆愜意‧湖畔時光—</h2>
      <div class="d-flex content_div">
        <div>
          <img src="../assets/img/environment/campus5.jpg" alt="" />
        </div>
        <div>
          <p>
            平靜的時光，感受草地的氣息。<br />
            彷彿有著神祕的吸引力，就這麼靜靜地望著。
          </p>
          <div>
            <div>
              <img src="../assets/img/environment/campus7.jpg" alt="" />
            </div>
            <div>
              <img src="../assets/img/environment/campus6.jpg" alt="" />
            </div>
          </div>
          <p>
            或是，與家人和朋友們嬉戲玩樂，<br />
            一起放肆大笑，共度美好的早晨、下午與夜晚。
          </p>

          <button class="btn_brown2">MORE</button>
        </div>
      </div>
    </div>
    <div class="dinning_intro_div col-12">
      <p class="sub">DINING</p>
      <h2 class="text-center">—共度美好‧餐點享用—</h2>
      <div class="d-flex justify-content-center">
        <div><img src="../assets/img/dinning/dinning7.jpg" alt="" /></div>
        <div class="content_div align-self-end mb-4">
          <h3>築樂珈琲</h3>
          <p>
            預約電話:(04)9291-2677<br />
            營業時間:禮拜二~禮拜天11:00-17:00 <br />
            地 址:545南投縣埔里鎮桃米路12-11號<br />
            公 休:禮拜一<br />
          </p>
          <p><button class="btn_brown2">MORE</button></p>
        </div>
      </div>
      <!-- 餐廳食物圖片slide -->
      <splide :options="slide_options">
        <splide-slide v-for="(slide, idx) in slides" :key="idx">
          <img :src="slide.src" />
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
import Banner from "../components/index/banner.vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  name: "App",
  components: {
    Banner,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      slide_options: {
        type: "loop",
        perPage: 4,
        perMove: 1,
        autoplay: true,
        interval: 2000,
        pauseOnHover: true,
        breakpoints: {
          500: {
            perPage: 1,
          },
          1000: {
            perPage: 3,
          },
        },
      },
      slides: [
        { src: require("../assets/img/dinning/cake1.jpg") },
        { src: require("../assets/img/dinning/cake2.jpg") },
        { src: require("../assets/img/dinning/curry1.jpg") },
        { src: require("../assets/img/dinning/curry2.jpg") },
        { src: require("../assets/img/dinning/curry3.jpg") },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.main {
  > div {
    margin-bottom: 70px;
  }
}
.sub {
  text-align: center;
  color: $color1;
  font-weight: 800;
  font-size: 18px;
}
.announcement_div {
  margin-top: 110vh;
  width: 70%;
  table {
    width: 100%;
    margin-top: 20px;
    .column1,
    .column2,
    .column3 {
      width: 15%;
    }
    th,
    td {
      border-bottom: 1px solid #ddd;
    }
    th {
      font-size: 20px;
      font-weight: 700;
      background-color: $color1;
      padding: 5px 10px;
    }
    tr {
      td {
        padding: 5px 10px;
      }
      td:first-child {
        span {
          background-color: $color1;
          border-radius: 10px;
          padding: 7px;
        }
      }
      td:last-child {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.campus_intro_div {
  position: relative;
  top: 110%;
  width: 70%;
  h2 {
    margin-bottom: 30px;
  }
  img {
    width: 100%;
  }
  .content_div {
    gap: 80px;
    width: 100%;
    flex-wrap: nowrap;
    div:nth-of-type(1) {
      flex: 0.8;
    }
    div:nth-of-type(2) {
      flex: 1;
      margin-bottom: 30px;
      > div {
        display: flex;
        flex-wrap: nowrap;
        gap: 30px;
        margin: 20px 0;
        width: 100%;
        > div:nth-of-type(1) {
          flex: 1.3;
          img {
            height: 250px;
          }
        }
        > div:nth-of-type(2) {
          flex: 2;
          margin-top: 80px;
        }
      }
      button{
        margin-top: 20px;
      }
    }
  }
}

.dinning_intro_div {
  width: 80%;
  h2 {
    margin-bottom: 30px;
  }
  > div:nth-of-type(1) {
    width: 80%;
    margin: 0 auto;
  }
  .content_div {
    width: 60%;
    p {
      line-height: 26px;
      margin-bottom: 20px;
    }
  }
  div:nth-child(1) {
    width: 50%;
    margin-right: 50px;
    img {
      display: block;
      width: 100%;
    }
  }
}

.splide__slide {
  img {
    width: 100%;
  }
}
</style>
