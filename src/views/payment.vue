<template>
  <Banner>
    <template v-slot:title>帳篷付款</template>
  </Banner>
  <div class="main">
    <div class="content">
      <div class="customer_info">
        <h4>客戶資料</h4>
        
        <div>
          <label for="email">Email*</label><br />
          <input
            type="text"
            id="email"
            v-model="customer.email"
            v-on:keypress.enter="quickSet"
          />
        </div>
        <div>
          <label for="">姓名*</label><br />
          <div class="name_inputs">
            <input
              type="text"
              placeholder="姓"
              v-model="customer.name.firstName"
            />
            <input
              type="text"
              placeholder="名"
              v-model="customer.name.lastName"
            />
          </div>
        </div>
        <div class="IdBith">
          <div>
            <label for="id">身分證字號*</label><br />
            <input type="text" v-model="customer.id" />
          </div>
          <div>
            <label for="bdday">生日</label><br />
            <input type="date" name="" id="" v-model="customer.birth" />
          </div>
        </div>
        <div class="phones">
          <div>
            <label for="phone">手機*</label><br />
            <input type="text" id="phone" v-model="customer.phone" />
          </div>
          <div>
            <label for="tele">電話</label><br />
            <div>
              <input
                type="text"
                id="tele"
                placeholder="電話區碼"
                style="width: 25%"
                v-model="customer.tele.tele1"
              />
              <input
                type="text"
                style="width: 75%"
                v-model="customer.tele.tele2"
              />
            </div>
          </div>
        </div>
        <div class="address_div">
          <label for="address">地址*</label><br />
          <select
            name="county"
            id="county"
            class="custom_select"
            v-model="customer.county"
          >
            <option value="台北市">台北市</option>
            <option value="台中市">台中市</option>
          </select>
          <select
            name="town"
            id="town"
            class="custom_select"
            v-model="customer.town"
          >
            <option value="豐原區">豐原區</option>
            <option value="潭子區">潭子區</option>
          </select>
          <input type="text" style="width:70%" v-model="customer.address" />
        </div>

        <div class="cc">
          <label for="c_card">信用卡號</label><br />
          <input type="text" id="c_cart" v-model="customer.c_card.c_card1" />-
          <input type="text" v-model="customer.c_card.c_card2" />-
          <input type="text" v-model="customer.c_card.c_card3" />-
          <input type="text" v-model="customer.c_card.c_card4" />
        </div>
        <br />
        <div class="btns">
          <button class="cfm btn_green2" @click="cfmTent">確認訂房</button>
          <button class="cxl btn_green2" @click="cxlTent">取消訂房</button>
        </div>
      </div>
      <div class="orders_data">
        <h4>訂房明細</h4>
        <section>
          <article v-for="(item, idx) in cart" :key="idx">
            <ul class="arter">
              <li>
                <span>入住日期<i></i></span>: {{ dateFormat(item.from * 1000) }}
              </li>
              <li>
                <span>退房日期<i></i></span>: {{ dateFormat(item.to * 1000) }}(共{{Math.round((item.to-item.from)/86400)}}晚)
              </li>
              <li>
                <span>房間數量<i></i></span>: {{ item.no }} 間
              </li>
              <li>
                <span>房型<i></i></span>: {{ item.tent }}
              </li>
              <li>
                <span>專案<i></i></span>: {{ item.offer }}
              </li>
              <li>
                <span>價格/晚<i></i></span>:
                {{ item.price.toLocaleString() }}TWD
              </li>
              <!-- <li>
                 2021年9月21日 ${{
                  item.price.toLocaleString()
                }}<br />
                <p style="padding-left: 72px">
                  2021年9月22日 ${{ item.price.toLocaleString() }}<br />
                  2021年9月23日 ${{ item.price.toLocaleString() }}<br />
                </p>
              </li> -->
              
              <li >
                <span style="font-size: 18px">金額<i></i></span>:TWD {{(Math.round((item.to-item.from)/86400)*item.price).toLocaleString()}}
              </li>
            </ul>
            <div>-----------------------------------------</div>
          </article>
          <pre style="font-size:1.2rem;font-weight:900">
房    費:{{cart.total.toLocaleString()}}
刷卡金額:{{(cart.total*0.3).toLocaleString()}}
            
          </pre>
          
        </section>
      </div>
    </div>
  </div>
  <Loading v-if="isLoading" />
</template>

<script>
import Banner from "../components/bannerTop.vue";
import Loading from "../components/loading.vue";
import { db } from "../firebase/firebaseInit";
import { uid } from "uid";
import { mapState } from "vuex";
export default {
  components: { Banner, Loading },
  data() {
    return {
      customer: {
        email: null,
        name: {
          firstName: null,
          lastName: null,
        },
        id: null,
        birth: null,
        phone: null,
        tele: {
          tele1: null,
          tele2: null,
        },
        county: null,
        address: null,
        c_card: {
          c_card1: null,
          c_card2: null,
          c_card3: null,
          c_card4: null,
        },
      },
      isLoading: false,
    };
  },
  mounted() {},
  methods: {
    quickSet() {
      console.log(this.$store.state.user[0]);
      this.customer.email = this.$store.state.user[0].eMail;
      this.customer.name.firstName = "林";
      this.customer.name.lastName = "芋圓";
      this.customer.id = "L265656565";
      this.customer.birth = "1994-06-01";
      this.customer.phone = "0958868526";
      this.customer.tele.tele1 = "04";
      this.customer.tele.tele2 = "255689252";
      this.customer.county = "台中市";
      this.customer.town = "豐原區";
      this.customer.address = "豐東路58號";
      this.customer.c_card.c_card1 = "5520";
      this.customer.c_card.c_card2 = "0000";
      this.customer.c_card.c_card3 = "5599";
      this.customer.c_card.c_card4 = "6682";
    },
    async cfmTent() {
      this.isLoading = true;
      const database = db.collection("tentRev").doc();
      var cus = this.customer;
      await database.set({
        rvId: uid(6),
        email: cus.email,
        lastName: cus.name.lastName,
        firstName: cus.name.firstName,
        id: cus.id,
        birth: cus.birth,
        phone: cus.phone,
        tele1: cus.tele.tele1,
        tele2: cus.tele.tele2,
        county: cus.county,
        town: cus.town,
        address: cus.address,
        c_card:
          cus.c_card.c_card1 +
          cus.c_card.c_card2 +
          cus.c_card.c_card3 +
          cus.c_card.c_card4,
        tentInfo: this.$store.state.cart,
        status: "booked",
      });

      this.isLoading = false;
      alert("您已成功預約帳篷!感謝您的預定");
      this.$router.push({ name: "Home" });
      this.$store.commit("DELETE_ALLCART");
    },
    cxlTent() {
      this.$store.commit("DELETE_ALLCART");
      this.$router.push({
        name: "Home",
      });
    },
  },
  computed: {
    ...mapState(["cart"]),
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  width: 80%;
  gap: 30px;
  padding-bottom: 50px;
  input,
  select {
    border-radius: 0;
  }
  label {
    font-size: 18px;
    color: #4a4a4a;
    padding: 5px;
  }
  .customer_info {
    flex: 5;
    border-right: 1px solid lightgray;
  }
  .orders_data {
    flex: 2;
  }
  .name_inputs {
    input {
      width: 40%;
      display: inline-block;
    }
  }
  .IdBith,
  .phones {
    display: flex;
    width: 80%;
    > div {
      flex: 1;
    }
  }
  .address_div {
    width: 90%;
  }
  .cc {
    input {
      margin: 1%;
      width: 18%;
    }
  }
  .btns {
    button {
      width: 40%;
      margin: 1%;
    }
  }
}

.orders_data {
  ul {
    padding: 0;
    margin: 0;
    li {
      font-size: 14px;
      line-height: 24px;
      color: #4a4a4a;
      list-style: none;
      padding: 0;
      margin: 0;
      span {
        font-weight: 900;
        height: 24px;
        line-height: 24px;
        width: 65px;
        text-align: justify;
        display: inline-block;
        overflow: hidden;
        vertical-align: top;
        i {
          display: inline-block;
          width: 100%;
          height: 0;
        }
      }
    }
  }
}
</style>