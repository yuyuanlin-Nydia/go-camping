<template>
  <div v-if="loadEnd">
    <Banner>
      <template v-slot:title>我的訂單</template>
    </Banner>
    <div class="main">
      <div class="content">
        <div class="topTabs">
          <button
            :class="{
              btn_green2: nowTab == 'restaurant',
              btn_green1: nowTab !== 'restaurant',
            }"
            @click="nowTab = 'restaurant'"
          >
            餐廳訂位紀錄
          </button>
          <button
            :class="{
              btn_brown2: nowTab == 'tent',
              btn_brown1: nowTab !== 'tent',
            }"
            @click="nowTab = 'tent'"
          >
            帳篷訂房紀錄
          </button>
        </div>
        <div
          class="resRev"
          v-if="nowTab == 'restaurant' && resBooking.length > 0"
        >
          <h5><b>餐廳訂位紀錄</b></h5>
          <div
            v-for="(order, idx) in resBooking"
            :key="order.rvId"
            class="perBooking"
            v-bind:class="{
              canceled:
                order.status == 'canceled' ||
                order.date.seconds * 1000 <= new Date().getTime(),
            }"
          >
            <div style="flex: 1">
              <div v-if="updateIdx !== order.id || updateIdx == null">
                <b>用餐時間</b> : {{ dateFormat(order.date.seconds * 1000) }}
                {{
                  order.time.substring(0, 2) + ":" + order.time.substring(2, 4)
                }}
              </div>
              <div v-if="updateIdx == order.id">
                <b>用餐時間</b> :
                <v-date-picker
                  v-model="originalDate"
                  :masks="masks"
                  :input-debounce="500"
                  :max-date="new Date().setDate(new Date().getDate() + 30)"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="bg-white border px-2 py-1 rounded"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker>
                <select name="time" id="" v-model="resBooking[idx].time">
                  <option
                    :selected="resBooking[idx].time == '1100'"
                    value="1100"
                  >
                    11:00
                  </option>
                  <option
                    :selected="resBooking[idx].time == '1130'"
                    value="1130"
                  >
                    11:30
                  </option>
                  <option
                    :selected="resBooking[idx].time == '1200'"
                    value="1200"
                  >
                    12:00
                  </option>
                  <option
                    :selected="resBooking[idx].time == '1230'"
                    value="1230"
                  >
                    12:30
                  </option>
                  <option
                    :selected="resBooking[idx].time == '1330'"
                    value="1300"
                  >
                    13:00
                  </option>
                  <option
                    :selected="resBooking[idx].time == '1330'"
                    value="1330"
                  >
                    13:30
                  </option>
                  <option
                    :selected="resBooking[idx].time == '1400'"
                    value="1400"
                  >
                    14:00
                  </option>
                  <option
                    :selected="resBooking[idx].time == '1430'"
                    value="1430"
                  >
                    14:30
                  </option>
                </select>
              </div>
              <div v-if="updateIdx !== order.id || updateIdx == null">
                <b>大人人數</b> : {{ order.adultNo }}位
              </div>
              <div v-if="updateIdx == order.id">
                <b>大人人數</b> :
                <input
                  class="changeInput"
                  type="text"
                  v-model="resBooking[idx].adultNo"
                />位
              </div>
              <div v-if="updateIdx !== order.id || updateIdx == null">
                <b>小孩人數</b> : {{ order.childNo }}位
              </div>
              <div v-if="updateIdx == order.id">
                <b>小孩人數</b> :
                <input
                  class="changeInput"
                  type="text"
                  v-model="resBooking[idx].childNo"
                />位
              </div>

              <p v-if="order.status == 'booked'"><b>訂位狀態</b> : 已訂位</p>
              <p v-if="order.status == 'canceled'"><b>訂位狀態</b> : 已取消</p>
            </div>
            <div
              class="change_btns"
              v-if="
                updateIdx == null &&
                order.status == 'booked' &&
                order.date.seconds * 1000 > new Date().getTime()
              "
            >
              <button class="btn_green1" @click="cxlRev(order.id)">
                取消訂位
              </button>
              <button class="btn_green1" @click="changeRev(order.id, idx)">
                更改訂位
              </button>
            </div>
            <div
              class="change_btns"
              v-if="updateIdx == order.id && order.status == 'booked'"
            >
              <button class="btn_grey1" @click="cfmChange(order.id, idx)">
                確認更改
              </button>
              <button class="btn_grey1" @click="cxlChange()">取消更改</button>
            </div>
          </div>
        </div>
        <div v-if="resBooking.length == 0">
          <h5><b>餐廳訂位紀錄</b></h5>
          <br />
          <p>目前您沒有餐廳訂位紀錄唷!</p>
        </div>
        <div class="tentRev" v-if="nowTab == 'tent' && tentBooking.length > 0">
          <h5><b>帳篷訂房紀錄</b></h5>
          <div
            v-for="(eachBooking, idx) in tentBooking"
            :key="idx"
            class="perBooking"
            v-bind:class="{
              canceled: eachBooking.status == 'canceled',
            }"
          >
            <div style="flex: 1">
              <p v-if="eachBooking.status == 'booked'">
                <b>訂位狀態</b> : 已訂房
              </p>
              <p v-if="eachBooking.status == 'canceled'">
                <b>訂位狀態</b> : 已取消
              </p>
              <div
                v-for="(item, idx2) in eachBooking.tentInfo"
                :key="idx2"
                class="single_offer"
                v-bind:class="{
                  single_offer_canceled: eachBooking.status == 'canceled',
                }"
              >
                <b>入住日期</b> : {{ dateFormat(new Date(item.from * 1000))
                }}<br />
                <b>退房日期</b> : {{ dateFormat(new Date(item.to * 1000)) }}
                <br />
                <b>入住房型</b> : {{ item.tent }} <br />
                <b>房型專案</b> : {{ item.offer }}<br />
                <b>價格</b> : TWD {{ item.price }} 元<br />
                <b>間數</b> : {{ item.no }} 間<br />
              </div>
            </div>

            <div class="change_btns" v-if="eachBooking.status == 'booked'">
              <button class="btn_brown1">取消帳篷</button>
              <button class="btn_brown1">更改訂房</button>
            </div>
          </div>
        </div>
        <div v-if="tentBooking.length == 0">
          <h5><b>帳篷訂房紀錄</b></h5>
          <br />
          <p>目前您沒有帳篷訂房紀錄唷!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/bannerTop.vue";
import { db } from "../firebase/firebaseInit";
export default {
  components: { Banner },

  data() {
    return {
      loadEnd: false,
      resBooking: [],
      tentBooking: [],
      tabs: ["restaurant", "tent"],
      nowTab: "restaurant",
      classObject: {
        btn_brown2: true,
        btn_brown1: false,
      },
      updateIdx: null,
      originalDate: new Date(), //更改訂位後的原始定位日期
    };
  },
  mounted() {
    this.getRev();
    this.getTentRev();
  },
  methods: {
    async getRev() {
      this.resBooking.length = 0;
      var dataBase = db
        .collection("reservation")
        .where("email", "==", this.$store.state.user[0].eMail);
      var result = await dataBase.get();
      result.forEach((doc) => {
        var data = {
          id: doc.id,
          rvId: doc.data().rvId,
          email: doc.data().email,
          date: doc.data().date,
          time: doc.data().time,
          adultNo: doc.data().adultNo,
          childNo: doc.data().childNo,
          status: doc.data().status,
        };
        this.resBooking.push(data);
      });
      this.loadEnd = true;
    },
    async getTentRev() {
      this.resBooking.length = 0;
      var dataBase = db
        .collection("tentRev")
        .where("email", "==", this.$store.state.user[0].eMail);
      var result = await dataBase.get();
      result.forEach((doc) => {
        var data = {
          id: doc.id,
          status: doc.data().status,
          tentInfo: doc.data().tentInfo,
        };
        this.tentBooking.push(data);
      });
      console.log(this.tentBooking);
      this.loadEnd = true;
    },
    cxlRev(id) {
      var dataBase = db.collection("reservation").doc(id);
      dataBase.update({
        status: "canceled",
      });
      alert("您已成功取消訂位");
      this.getRev();
    },
    changeRev(id, idx) {
      this.updateIdx = id;
      this.originalDate = new Date(this.resBooking[idx].date.seconds * 1000);
    },
    cfmChange(id, idx) {
      var dataBase = db.collection("reservation").doc(id);
      console.log(this.resBooking);
      dataBase.update({
        date: this.originalDate,
        time: this.resBooking[idx].time,
        adultNo: parseInt(this.resBooking[idx].adultNo),
        childNo: parseInt(this.resBooking[idx].childNo),
      });
      console.log(this.resBooking[idx].date.seconds);
      alert("您已成功更改訂位");
      this.getRev();
      this.updateIdx = null;
    },
    cxlChange() {
      this.updateIdx = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.content {
  width: 80%;
  margin: 0 auto;
  .topTabs {
    display: flex;
    margin: 20px 0;
    button {
      margin: 0 20px;
    }
  }
}
.resRev,
.tentRev {
  h5 {
    margin-bottom: 2%;
  }
  .perBooking {
    display: flex;
    align-items: center;
    padding: 1.5%;
    border-radius: 20px;
    border: 2px solid $color2;
    margin-bottom: 2%;
    p {
      font-size: 16px;
      flex: 1;
    }
    .change_btns {
      button {
        margin: 10px;
      }
    }
  }
  .canceled {
    border: 2px solid grey;
    background-color: lightgrey;
  }
}
.tentRev {
  .perBooking {
    border: 2px solid $color1;
    .single_offer {
      background-color: $color1;
      margin: 1.5%;
      padding: 2%;
    }
    .single_offer_canceled {
      background-color: grey;
    }
  }
}
.changeInput {
  width: 10% !important;
}
.btn_grey1 {
  background-color: lightgrey;
  padding: 5px 10px;
  border: 1px solid transparent;
  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px 6px rgb(104, 100, 100);
  }
}
.btn_green1,
.btn_green2 {
  border-radius: 0;
  padding: 7px 40px;
}
</style>