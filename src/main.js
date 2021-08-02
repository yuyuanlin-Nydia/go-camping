import { createApp } from "vue";
import App from "./App.vue";
import VueSplide from "@splidejs/vue-splide";
import store from "./store";
import router from "./assets/router/router.js";
import VCalendar from "v-calendar";
import { firebaseAuth } from "./firebase/firebaseInit";
// import { useRouter } from 'vue-router' // import router


import "@/assets/scss/main.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
// or
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
// or
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

firebaseAuth.onAuthStateChanged(function(user) {
  if (user) {
    // 使用者已登入，可以取得資料
    var email = user.email;
    var uid = user.uid;
    console.log(email, uid);
    // document.location.href="http://localhost:8080/"
    // this.SET_LOGIN();
  } else {
    // 使用者未登入
  }
});

createApp(App)
.use(store)
.use(router)
.use(VCalendar, {
  componentPrefix: "vc",
})
.use(VueSplide)
.mount("#app");
