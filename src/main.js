import { createApp } from "vue";
import App from "./App.vue";
import VueSplide from "@splidejs/vue-splide";
import store from "./store";
import router from "./assets/router/router.js";
import VCalendar from "v-calendar";

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


const app = createApp(App);
app.config.globalProperties.dateFormat = function(x) {
  var dateObject = new Date(x);
  const date = dateObject.getDate(); //15
  const day = dateObject.getDay(); //5
  const month = dateObject.getMonth() + 1; //6
  const year = dateObject.getFullYear(); //2016
  const weekday = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  return `${year}/${month}/${date} ${weekday[day]}`
};
app
  .use(store)
  .use(router)
  .use(VCalendar, {
    componentPrefix: "vc",
  })
  .use(VueSplide)
  .mount("#app");
