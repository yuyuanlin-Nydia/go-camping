<template>
  <div class="mycontainer main" v-if="tent">
      <div class="content">
      <h2>{{ tent.tentName }}</h2>
      <div class="back_rec">
        <p class="tent_desc">{{ tent.description }}</p>
      </div>
      <splide :options="options">
        <splide-slide>
          <img style="width: 100%" src="../assets/img/tent/tent1.jpg" />
        </splide-slide>
        <splide-slide>
          <img style="width: 100%" src="../assets/img/tent/tent3.jpg" />
        </splide-slide>
      </splide>
      <div class="section facility_sec">
        <div class="title">
          <p>room facility</p>
          <h3>—客房設施—</h3>
        </div>
        <ul class="">
          <li v-for="(item, idx) in tent.facility" :key="idx">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="section">
        <div class="title">
          <p>room offers</p>
          <h3>—住房專案—</h3>
        </div>
        <div class="offers">
          <div class="offer" v-for="(item, idx) in tent.offers" :key="idx">
            <div class="offer_content">
              <h5>{{ item.offerName }}</h5>
              <h5>TWD {{ item.lowestPrice.toLocaleString("en-US") }}起</h5>
              <div class="buttons">
                <button class="btn_brown1">查看更多</button>
                <button class="btn_brown1">立即訂房</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      options: {
        rewind: true,
        // width: 1500,
        perPage: 1,
        gap: "1rem",
      },
      tent: null,
    };
  },
  async mounted() {
    this.getCurrentTent();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_TENT"]),
    ...mapActions(["GET_TENTDATA"]),
    getCurrentTent() {
      this.GET_TENTDATA();
      this.SET_CURRENT_TENT(this.$route.params.tentId);
      this.tent = this.currentTent[0];
    },
  },
  computed: {
    ...mapState(["currentTent"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.splide {
  padding-top: 0px;
}
.main {
  display: block;
}
.mycontainer {
  width: 80%;
  margin: 0 auto;
}
.content {
  padding-top: 70px;
  h2,
  p.tent_desc,
  .title {
    text-align: center;
  }
  .title {
    font-weight: 800;
    p {
      color: $color1;
    }
  }

  .back_rec {
    width: 800px;
    margin: 0 auto;
    border: 20px solid $color1;
    border-bottom: 1px solid transparent;
    position: relative;
    padding: 20px 0;
  }
  .section {
    margin-top: 50px;
  }
  .facility_sec{
    background-color: lightgray;
    width: 500px;
    margin: 0 auto;
    padding: 30px;
    li{
      font-size: 20px;
      font-weight: 500;
    }
  }
  .offers {
    display: flex;
    flex-wrap: wrap;

    gap: 30px;
    color: white;
    margin: 30px 0;
    .offer {
      flex: 1;
      background-image: url("https://placem.at/person");
      background-size: 100%;
      height: 100%;

      .offer_content {
        height: 240px;
        margin: 15px;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(1px);
        font-weight: 600;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        &:hover {
          background-color: rgba(0, 0, 0, 0.4);
        }
        .buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          .btn_brown1 {
            padding: 7px 15px;
          }
        }
      }
    }
  }
}
</style>