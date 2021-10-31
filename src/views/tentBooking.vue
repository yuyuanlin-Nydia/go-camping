<template>
  <div class="main">
    <div>
      <Banner-top>
        <template v-slot:title>帳篷預定</template>
      </Banner-top>
      <RoomFilter />
      <div class="room" v-for="(item, idx) in occupancy" :key="idx">
        <div>
          <ul>
            <li>{{ item.tentName }}</li>
            <li>
              <span style="font-size: 24px; font-weight: bold"
                >剩餘<span style="color: rgb(224, 145, 80); font-size: 48px">{{
                  item.rest
                }}</span
                >間</span
              >
            </li>
            <router-link
              :to="{
                name: 'TentIntro',
                params: { tentId: 'Im4dAoMFRx1himpQegM2' },
              }"
              ><li>客房介紹</li></router-link
            >
          </ul>
        </div>
        <div class="offers">
          <img src="https://placem.at/things?w=350" alt="" />
          <section>
            <div class="offer" v-for="(item2, idx) in item.offers" :key="idx">
              <div>{{ item2.offerName }}</div>

              <div>
                <span class="price">{{
                  item2.lowestPrice.toLocaleString("en-us")
                }}</span
                ><span class="small_txt">TWD/每晚</span>
              </div>
              <select
                name="rmBook_amount"
                id="rmBook_amount"
                class="custom_select"
                @change="
                  update(
                    item.tentName,
                    item2.offerName,
                    $event.target.value,
                    item.to,
                    item.from,
                    item2.lowestPrice
                  )
                "
              >
                >

                <option v-for="n in item.rest" :key="n" :value="n">
                  預定{{ n }}間
                </option>
              </select>
              <button
                class="btn_brown2"
                @click="addToCart(item.tentName, item2.offerName)"
              >
                預定
              </button>
            </div>
          </section>
        </div>
      </div>
      <div class="our_rooms">
        <h2 class="title">我們的客房</h2>
        <div class="tents">
          <div class="tent">
            <img src="https://placem.at/places?w=500" alt="" />
            <div>
              <h5>樹屋兩人帳</h5>
              <p>沐浴在樹林中，享受著都市叢林從未體驗過的清新空氣和芬多精。</p>
              <router-link
                :to="{
                  name: 'TentIntro',
                  params: { tentId: 'Ek7dOYZfalip9AxScA1w' },
                }"
                ><button class="btn_green2">
                  查看價格和更多資訊
                </button></router-link
              >
            </div>
          </div>

          <div class="tent">
            <img src="https://placem.at/places?w=500" alt="" />
            <div>
              <h5>豪華四人帳</h5>
              <p>帳篷擁有獨立衛浴及空調，能夠自在舒適地享受入住帳棚的樂趣。</p>
              <router-link
                :to="{
                  name: 'TentIntro',
                  params: { tentId: 'Im4dAoMFRx1himpQegM2' },
                }"
                ><button class="btn_green2">
                  查看價格和更多資訊
                </button></router-link
              >
            </div>
          </div>
        </div>
        <div class="check_all_rooms">
          <router-link :to="{ name: 'Tent' }" class="btn_brown2">
            查看全部的客房</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerTop from "../components/bannerTop.vue";
import RoomFilter from "../components/roomFilter.vue";
import { mapState } from "vuex";
export default {
  components: {
    RoomFilter,
    BannerTop,
  },
  data() {
    return {
      selected: [],
    };
  },

  mounted() {},
  activated() {
    this.$store.state.occupancy.forEach((element) => {
      for (var i = 0; i < element.offers.length; i++) {
        var data = {};
        data["tent"] = element.tentName;
        data["offer"] = element.offers[i].offerName;
        data["no"] = 1;
        data["to"] = element.to;
        data["from"] = element.from;
        data["price"] = element.offers[i].lowestPrice;
        this.selected.push(data);
      }
    });
  },
  created() {
    let _this = this;
    this.$store.watch(
      function (state) {
        return state.occupancy;
      },
      function () {
        _this.$store.state.occupancy.forEach((element) => {
          for (var i = 0; i < element.offers.length; i++) {
            var data = {};
            data["tent"] = element.tentName;
            data["offer"] = element.offers[i].offerName;
            data["no"] = 1;
            data["to"] = element.to;
            data["from"] = element.from;
            data["price"] = element.offers[i].lowestPrice;
            _this.selected.push(data);
          }
        });
      },
      {
        deep: true, //add this if u need to watch object properties change etc.
      }
    );
  },
  methods: {
    update(tent, offer, no, to, from, price) {
      var flag = true;
      for (var i = 0; i < this.selected.length; i++) {
        var tentName = this.selected[i].tent;
        var offerName = this.selected[i].offer;
        if (tentName == tent && offerName === offer) {
          this.selected[i].no = parseInt(no);
          flag = false;
        }
      }
      if (flag) {
        var data = {};
        data["tent"] = tent;
        data["offer"] = offer;
        data["no"] = parseInt(no);
        data["to"] = to;
        data["from"] = from;
        data["price"] = parseInt(price);
        this.selected.push(data);
      }
    },
    addToCart(tent, offer) {
      for (var i = 0; i < this.selected.length; i++) {
        if (tent == this.selected[i].tent && offer == this.selected[i].offer) {
          this.$store.commit("ADD_TO_CART", this.selected[i]);
          this.$router.push({ name: "BookingOrders" });
        }
      }
    },
  },
  computed: {
    ...mapState(["occupancy"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.main {
  display: block;
}
.room {
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid lightgray;
  box-shadow: 1px 1px 5px lightgray;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > li {
      &:first-child {
        font-size: 28px;
        font-weight: 600;
      }
    }
    > a {
      color: $color2 !important;
      &:hover {
        text-decoration: underline !important;
      }
    }
  }
  .offers {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      flex: 1;
    }
    section {
      flex: 4;
      border-bottom: 1px solid lightgray;
      border-top: 1px solid lightgray;
      .offer {
        display: flex;
        align-items: center;
        gap: 15px;
        justify-content: space-between;
        border-bottom: 1px solid lightgray;
        padding: 20px;
        font-size: 18px;
        div {
          &:first-child {
            font-weight: 600;
            font-size: 24px;
          }
        }
        span.price {
          font-weight: 900;
          font-size: 26px;
        }
        .small_txt {
          font-size: 12px;
        }
      }
    }
  }
}
.our_rooms {
  background-color: lightgray;
  padding: 20px 0;
  margin: 50px 0;
  h2.title {
    text-align: center;
    margin: 10px 0;
    font-weight: bold;
  }
  .check_all_rooms {
    text-align: center;
    margin-top: 20px;
  }
  .tents {
    display: flex;
    width: 100%;
    padding: 0 15%;
    margin: 0px auto;
    gap: 50px;
    flex-wrap: wrap;
    > div {
      width: 30%;
    }
    .tent {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      background-color: white;
      &:hover {
        img {
          opacity: 0.8;
        }
      }
      .btn_green1 {
        border-radius: none;
        width: 100%;
      }
      > div {
        padding: 5%;
      }
    }
  }
}


</style>