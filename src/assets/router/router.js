import { createRouter, createWebHistory } from "vue-router";

import Home from "../../views/home.vue";
import Restaurant from "../../views/restaurant.vue";
import Tent from "../../views/tent.vue";
import TentIntro from "../../views/tentIntro.vue";
import Attraction from "../../views/attraction.vue";
import Contactus from "../../views/contactus.vue";
import Reservations from "../../views/reservations.vue";
import SignIn from "../../views/signIn.vue";
import TentBooking from "../../views/tentBooking.vue";
import BookingOrders from "../../views/bookingOrders.vue";
import Payment from "../../views/payment.vue";
import MemberPage from "../../views/memberPage.vue";
import { fireBase, firebaseAuth } from "../../firebase/firebaseInit";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "首頁",
        keepAlive: false,
        requiresAuth: false,
      },
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: Restaurant,
      meta: {
        keepAlive: false,
        requiresAuth: false,
      },
    },
    {
      path: "/reservations",
      name: "Reservations",
      component: Reservations,
      meta: {
        keepAlive: false,
        // requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/tent",
      name: "Tent",
      component: Tent,
      meta: {
        keepAlive: false,
        requiresAuth: false,
      },
    },
    {
      path: "/tent-intro/:tentId",
      name: "TentIntro",
      component: TentIntro,
      meta: {
        keepAlive: false,
        requiresAuth: false,
      },
    },
    {
      path: "/tent-booking",
      name: "TentBooking",
      component: TentBooking,
      meta: {
        keepAlive: true, //判断是否缓存
        requiresAuth: false,
      },
    },
    {
      path: "/attraction",
      name: "Attraction",
      component: Attraction,
      meta: {
        keepAlive: false,
        requiresAuth: false,
      },
    },
    {
      path: "/contactus",
      name: "ContactUs",
      component: Contactus,
      meta: {
        keepAlive: false,
        requiresAuth: false,
      },
    },
    {
      path: "/signIn",
      name: "SignIn",
      component: SignIn,
      meta: {
        keepAlive: false,
        requiresAuth: false,
      },
    },
    {
      path: "/booking-orders",
      name: "BookingOrders",
      component: BookingOrders,
      meta: {
        keepAlive: false,
        requiresAuth: true,
      },
    },
    {
      path: "/payment",
      name: "Payment",
      component: Payment,
      meta: {
        keepAlive: false,
        requiresAuth: true,
      },
    },
    {
      path: "/memberPage",
      name: "MemberPage",
      component: MemberPage,
      meta: {
        keepAlive: false,
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  var currentUser = fireBase.auth().currentUser;
  var admin = null;
  firebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
      // 使用者已登入，可以取得資料
      firebaseAuth.currentUser.getIdTokenResult().then((token) => {
        admin = token.claims.user_id;
      });
    }
  });

  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (currentUser) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
