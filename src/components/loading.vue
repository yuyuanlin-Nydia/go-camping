<template>
  <div class="bg">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
.bg {
  backdrop-filter: blur(1rem);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 300;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  span {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 3px solid transparent;
    border-top-color: #000;
    border-bottom-color: #000;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
    z-index: 500;
  }
}
</style>