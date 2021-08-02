<template>
  <footer class="d-flex justify-content-around align-items-center">
    <div>
      <h3>聯絡我們</h3>
      <p>
        訂房諮詢：(04)9291-2677 (8:00AM-5:00PM) <br />
        地址：545南投縣埔里鎮桃米路12-11號<br />
      </p>
    </div>
    <div class="icon_div">
      <a href="https://www.facebook.com/chikuraku1211/" target="_blank"
        ><i class="fab fa-facebook-square f_icon"></i
      ></a>
      <a
        href="https://instagram.com/chikuraku1211?utm_medium=copy_link"
        target="_blank"
        ><i class="fab fa-instagram f_icon"></i
      ></a>
    </div>
    <iframe
      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fchikuraku1211%2F&tabs=timeline&width=340&height=100&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId"
      width="340"
      height="70"
      style="border: none; overflow: hidden"
      scrolling="no"
      frameborder="0"
      allowfullscreen="true"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    ></iframe>
  </footer>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret);
export default {
  name: "",
  props: {},
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/main.scss";
footer {
  height: 100px;
  width: 100%;
  background-color: $color2;
  position: absolute;
  bottom: 0;
}
.icon_div {
  .f_icon {
    font-size: 40px;
    margin-right: 30px;
    &:hover {
      color: $color1;
    }
  }
}
</style>
