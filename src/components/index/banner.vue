<template>
  <div class="img_box">
    <img src="../../assets/img/environment/all2.jpg" alt="" />
    <img src="../../assets/img/environment/campus3.jpg" alt="" />
    <img src="../../assets/img/tent/tent6.jpg" alt="" />

    <h1>築樂|</h1>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.img_box {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0%;
  z-index: -10;
  overflow: hidden;
  img {
    height: 100vh;
    width: 100%;
    object-fit: cover;
    position: absolute;
    animation-name: myslide;
    animation-duration: 15s;
    animation-iteration-count: infinite;
  }

  img:nth-child(2) {
    animation-delay: 5s;
  }
  img:nth-child(3) {
    animation-delay: 10s;
  }
  h1 {
    color: $color4;
    position: absolute;
    top: 45vh;
    right: 45vw;
    font-weight: 900;
  }
}
@keyframes myslide {
  /* 輪播動畫 */
  0%{

  }
  10% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  33% {
    opacity: 0;
  }
  40% {
    transform: scale(1.05);
  }
}
</style>
