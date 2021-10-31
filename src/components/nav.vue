<template>
  <div class="top_nav">
    <div v-if="logIn" class="member_info">
      <span class="member_accout">{{ user[0].userName }}您好</span>
      <ul class="member_menu">
        <router-link :to="{ name: 'MemberPage' }"><li>我的訂單</li></router-link>
        <li @click="logOut">登出</li>
      </ul>
    </div>
    <div v-else class="log_btn">
      <router-link :to="{ name: 'SignIn' }"><span>登入|註冊</span></router-link>
      <router-link :to="{ name: 'BookingOrders' }"
        ><span
          >購物車<b v-if="cart.length">({{ cart.length }})</b></span
        ></router-link
      >
    </div>
  </div>
  <div class="right_nav">
    <div @click="toggle_nav" class="bar_icon">
      <img src="@/assets/icon/bars-solid.svg" alt="" />
    </div>
  </div>
  <transition name="nav">
    <ul class="myNav" v-if="navToggle">
      <li @click="toggle_nav">
        <router-link to="/"
          ><img src="../assets/img/logo.png" alt=""
        /></router-link>
      </li>
      <li @click="toggle_nav">
        <router-link :to="{ name: 'Tent' }"><span>帳篷資訊</span></router-link>
      </li>
      <li @click="toggle_nav">
        <router-link :to="{ name: 'Restaurant' }"
          ><span>餐廳資訊</span></router-link
        >
      </li>
      <li @click="toggle_nav">
        <router-link :to="{ name: 'Attraction' }"
          ><span>周邊景點</span></router-link
        >
      </li>
      <li @click="toggle_nav">
        <router-link :to="{ name: 'ContactUs' }"
          ><span>聯絡我們</span></router-link
        >
      </li>
    </ul>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { fireBase } from "../firebase/firebaseInit";

export default {
  name: "Nav",
  props: {},
  data() {
    return { data: {} };
  },
  methods: {
    ...mapMutations(["TOGGLE_NAV", "SET_LOGIN"]),
    toggle_nav() {
      this.TOGGLE_NAV();
    },
    logOut() {
      fireBase
        .auth()
        .signOut()
        .then(() => {
          // 登出成功
          this.SET_LOGIN();
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState(["navToggle", "logIn", "user", "cart"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.nav-enter-from,
.nav-leave-to {
  transform: translateX(-300px);
}
.nav-enter-active,
.nav-leave-active {
  transition: 1s ease all;
}
.right_nav {
  float: right;
  position: absolute;
  right: 5%;
  top: 1%;
  display: flex;
  align-items: center;
  gap: 15px;

  .bar_icon {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    img {
      width: 28px;
      height: 28px;
    }
  }
}
.top_nav {
  .member_info {
    cursor: pointer;
    &:hover {
      ul.member_menu {
        display: block;
      }
    }
    &:hover {
      span.member_accout {
        text-decoration: underline;
      }
    }
    span.member_accout {
      padding: 3px 10px;
      background-color: $color2;
      position: absolute;
      right: 200px;
    }
    ul {
      list-style: none;
      display: none;
      position: absolute;
      right: 200px;
      top: 30px;
      background-color: white;
      padding: 0 0px;
      li {
        cursor: pointer;
        text-align: center;
        padding: 5px 27px;
        border-bottom: 2px $color2 solid;
        &:hover {
          background-color: lightgray;
        }
      }
    }
  }
  .log_btn {
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    right: 200px;
    span {
      padding: 3px 10px;
      background-color: $color2;
      color: white;
    }
    a {
      &:hover {
        color: white;
        text-decoration: underline !important;
      }
    }
  }
}

ul.myNav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: $color2;
  width: 300px;
  height: 100vh;
  position: fixed;
  z-index: 100;
  cursor: pointer;

  li {
    display: inline-block;
    padding: 20px 0;
    text-align: center;
  }
  li span {
    color: $color5;
    font-size: 18px;
    font-weight: 800;
    position: relative;
    &:after {
      content: "";
      width: 0%;
      height: 1px;
      background-color: rgb(65, 62, 62);
      position: absolute;
      bottom: 0;
      left: 0;
      transition: all 0.3s linear;
    }
    &:hover::after {
      width: 100%;
    }
  }
  li img {
    height: 50px;
  }
}

</style>
