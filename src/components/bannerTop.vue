<template>
  <div class="banner">
    <h2><slot name="title">帳篷資訊</slot></h2>
  </div>
</template>

<script>
export default {
    name:"bannerTop",
};
</script>

<style lang="scss" scoped>
.banner {
  height: 200px;
  background-image: url("https://placem.at/things?w=500");
  display: flex;
  align-items: flex-end;
  h2 {
    margin-left: 50px;
    margin-bottom: 20px;
    color: white;
    font-weight: 900;
  }
}
</style>