<template>
  <div class="bg" @click.self="closeModule">
    <div class="wrapper">
      <div class="module_top">線上訂位</div>
      <form>
        <div>
          <label for="">姓名:</label>
          <input
            type="text"
            placeholder="請輸入姓名 ex.王小名、張先生"
            v-model="name"
          />
        </div>
        <div>
          <label for="">電話:</label>
          <input type="text" placeholder="請輸入手機號碼" v-model="phoneNo" />
        </div>
        <div>
          <label for="">大人人數:</label><input type="text" v-model="adultNo" />
        </div>

        <div>
          <label for="">小孩人數:</label><input type="text" v-model="childNo" />
        </div>

        <div>
          <label for="">日期:</label>
          <v-date-picker
            mode="date"
            :min-date="new Date().setDate(new Date().getDate() + 1)"
            :max-date="new Date().setDate(new Date().getDate() + 30)"
            v-model="date"
          />
          <!-- <select name="date" id="" v-model="date">
            <option value="2021/07/13">2021/07/13</option>
            <option value="2021/07/14">2021/07/14</option>
            <option value="2021/07/15">2021/07/15</option>
          </select> -->
        </div>

        <div>
          <label for="">時間:</label>
          <select name="time" id="" v-model="time">
            <option value="1100">11:00</option>
            <option value="1130">11:30</option>
            <option value="1200">12:00</option>
            <option value="1230">12:30</option>
            <option value="1300">13:00</option>
            <option value="1330">13:30</option>
            <option value="1400">14:00</option>
            <option value="1430">14:30</option>
          </select>
        </div>
      </form>
      <div class="buttons">
        <button class="btn_brown2" @click="uploadReservation">確認</button>
        <button class="btn_brown2" @click="closeModule">取消</button>
      </div>
    </div>
  </div>
  <Loading v-show="isLoading" />
</template>

<script>
import { db } from "../firebase/firebaseInit";
import Loading from "../components/loading.vue";
import { uid } from "uid";

export default {
  components: { Loading },
  data() {
    return {
      name: null,
      phoneNo: null,
      date:new Date(),
      time: null,
      adultNo: null,
      childNo: null,
      madeRvTime: null,
      isLoading: null,
    };
  },
  methods: {
    async uploadReservation() {
      this.isLoading = true;
      const database = db.collection("reservation").doc();

      await database.set({
        rvId:uid(6),
        name: this.name,
        phoneNo: this.phoneNo,
        adultNo: this.adultNo,
        childNo: this.childNo,
        date: this.date,
        time: this.time,
        madeRvTime: new Date().getTime(),
        status:"booked"
      });
      this.isLoading = false;
      alert("您已成功預約訂位!");
      this.$emit("update", false);
    },
    closeModule() {
      this.$emit("update", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.bg {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(0.1rem);
  width: 100%;
  height: 100%;
  z-index: 10;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    width: 500px;
    border-radius: 15px;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    flex-direction: column;
    margin: 0 auto;
    border: 4px solid $color1;
    .module_top {
      padding: 15px 0;
      height: 60px;
      width: 100%;
      background-color: $color1;
      text-align: center;
      font-weight: 800;
      font-size: 30px;
    }
    form {
      width: 80%;
      > div {
        margin: 15px 0;
      }
      label {
        width: 30%;
      }
      input {
        padding: 5px;
        border-radius: 5px;
        width: 60%;
        border: 1px solid lightgrey;
        &:focus {
          border: 1px solid $color1 !important;
        }
      }
      select {
        padding: 5px;
        border: 1px solid lightgrey;
        border-radius: 5px;
        appearance: none;
        width: 60%;
        padding-right: 40px;
        background: url("../assets/icon/icon-arrow-down.svg") no-repeat 95%
          center transparent;
        &:focus {
          border: 1px solid $color1 !important;
        }
      }
    }

    .buttons {
      margin: 15px 0;
      button {
        margin: 0 10px;
      }
    }
  }
}
</style>