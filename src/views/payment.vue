<template>
  <Banner>
    <template v-slot:title>帳篷付款</template>
  </Banner>
  <div class="main">
    <div class="content">
      <div class="customer_info">
        <h4>客戶資料</h4>
      </div>
      <div class="orders_data">
        <h4>訂房明細</h4>
        <p>
          入住日期: 2021年9月21日 <br />
          退房日期: <br />
          2021年9月22日 <br />
          房間數量: 1 <br />
          房間: 尊榮客房 <br />
          專案: 夢幻假期 <br />價格/晚:5890TWD <br />
          3晚: <br />
          2021年9月21日<br />
          $3,391 2021年9月22日 $3,391<br />
          2021年9月23日 $3,391<br />
        </p>
        <p>總金額: <br />TWD 7290 (含稅)</p>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/bannerTop.vue";
export default {
  components: { Banner },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  width: 80%;
  padding-bottom: 50px;
  .customer_info {
    flex: 5;
  }
  .orders_data {
    flex: 2;
  }
}
</style>