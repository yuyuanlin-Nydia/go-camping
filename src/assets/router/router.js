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

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: Restaurant,
      meta: {
        keepAlive: false
      }
      
    },
    {
      path: "/reservations",
      name: "Reservations",
      component: Reservations,
      meta: {
        keepAlive: false
      }
      
    },
    {
      path: "/tent",
      name: "Tent",
      component: Tent,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/tent-intro/:tentId",
      name: "TentIntro",
      component: TentIntro,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/tent-booking",
      name: "TentBooking",
      component: TentBooking,
      meta: {
        keepAlive: true  //判断是否缓存
       }
    },
    {
      path: "/attraction",
      name: "Attraction",
      component: Attraction,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/contactus",
      name: "ContactUs",
      component: Contactus,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/signIn",
      name: "SignIn",
      component: SignIn,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/booking-orders",
      name: "BookingOrders",
      component: BookingOrders,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/payment",
      name: "Payment",
      component: Payment,
      meta: {
        keepAlive: false
      }
    },
  ],
});

export default router;
