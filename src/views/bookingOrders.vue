<template>
  <Banner>
    <template v-slot:title>未付款的訂單</template>
  </Banner>
  <div class="main">
    <div v-if="cart.length" class="content">
      <div class="head">訂單內容</div>
      <div class="per_room" v-for="(item, idx) in cart" v-bind:key="idx">
        <div>
          <span>
            <b>{{ cart[idx].tent }}*{{ cart[idx].no }}間</b>-{{
              cart[idx].offer
            }}</span
          >
          <div>
            <b>TWD {{ cart[idx].price.toLocaleString() }}/間</b> <br />
            (含稅及服務費)
          </div>
        </div>
        <div>
          <div>
            <img src="https://placem.at/places?w=300" alt="" />
          </div>
          <div>
            <p class="info">
              入住日期： {{ dateFormat(cart[idx].to * 1000) }} <br />
              退房日期： {{ dateFormat(cart[idx].from * 1000) }}
            </p>
          </div>
          <button class="btn_brown1 cancle" @click="deleteItem(item)">
            刪除房間
          </button>
        </div>
      </div>
     
      <div class="bottom">
        <router-link :to="{ name: 'TentBooking' }">
          <button class="btn_green1">訂購更多房間</button>
        </router-link>
        <span
          >訂房總額
          <div class="total">{{ (cart.total * 1).toLocaleString() }}</div>
          TWD</span
        >
        <span
          >應付訂金(30%)
          <div class="total">
            {{ (cart.total * 0.3).toLocaleString() }}
          </div>
          TWD</span
        >
      </div>

      <div style="padding: 0 30px">
        <p>訂單備註</p>
        <textarea
          style="width: 100%"
          name=""
          id=""
          rows="3"
          placeholder="可選填"
        ></textarea>
      </div>
      <div style="padding: 20px 30px">
        <router-link :to="{name:'Payment'}"><button class="btn_brown2" style="width: 100%">付款預定</button></router-link>
      </div>
    </div>
    <div v-else class="no_booking">
      <h3>您目前沒有預訂房間唷!</h3>
      <router-link :to="{ name: 'TentBooking' }"
        ><button class="btn_green1">立即預定去</button></router-link
      >
    </div>
  </div>
</template>

<script>
import Banner from "../../src/components/bannerTop.vue";
import { mapState} from "vuex";
export default {
  components: {
    Banner,
  },
  mounted() {
    this.calTot()
  },
  methods: {
    deleteItem(item) {
      this.$store.commit("DELETE_CART_ITEM", item);
    },
    calTot(){
      var tot = 0;
      this.cart.forEach((element) => {
        tot += element.price * element.no;
      });
      this.cart.total=tot
    }
  },
  computed: {
    ...mapState(["cart", "occupancy"]),
    total() {
      var aaa = 0;
      // this.cart.forEach((element) => {
      //   tot += element.price * element.no;
      // });
      // console.log(this.cart)
      // // this.cart.total=tot
      return aaa;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.content {
  margin-top: 50px;
  background-color: rgb(236, 234, 234);
  width: 70%;
  border-bottom: 1px solid white;
  padding-bottom: 50px;

  .head {
    background-color: $color2;
    color: white;
    padding: 10px 0;
    text-align: center;
  }
  .per_room {
    padding: 0 30px;
    > div {
      display: flex;
      &:first-child {
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        font-size: 18px;
      }
      &:nth-child(2) {
        gap: 20px;
        position: relative;
        padding-bottom: 30px;
        .info {
          line-height: 30px;
          font-size: 16px;
        }
        .cancle {
          position: absolute;
          bottom: 30px;
          right: 0;
        }
        border-bottom: 1px solid $color2;
      }
    }
  }
  .bottom {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.no_booking {
  margin-top: 50px;
  text-align: center;
  button {
    margin-top: 20px;
  }
}
.total {
  width: 80px;
  display: inline-block;
  text-align: right;
  font-weight: 800;
  font-size: 1.5rem;
}
</style>