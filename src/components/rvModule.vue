<template>
  <div class="bg" @click.self="closeModule">
    <div class="wrapper">
      <div class="module_top"><slot name="module_top">線上訂位</slot></div>
      <slot name="module_center">
        <form>
          <div>
            <label for="">姓名:</label>
            <input
              type="text"
              placeholder="請輸入姓名 ex.王小名、張先生"
              v-model="name" v-on:keyup.right="fillUpForm"
              v-on:keypress.enter="quickSet"
            />
          </div>
          <div>
            <label for="">電話:</label>
            <input type="text" placeholder="請輸入手機號碼" v-model="phoneNo" />
          </div>
          <div>
            <label for="">大人人數:</label
            ><input type="text" v-model="adultNo" />
          </div>

          <div>
            <label for="">小孩人數:</label
            ><input type="text" v-model="childNo" />
          </div>

          <div>
            <label for="">日期:</label>
            <v-date-picker
              mode="date"
              :min-date="new Date().setDate(new Date().getDate() + 1)"
              :max-date="new Date().setDate(new Date().getDate() + 30)"
              v-model="date"
            />
          </div>

          <div>
            <label for="">時間:</label>
            <select name="time" id="" v-model="time">
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
            </select>
          </div>
        </form>
      </slot>
      <div class="buttons">
        <slot name="module_bottom">
          <button class="btn_brown2" @click="uploadReservation">確認</button>
          <button class="btn_brown2" @click="closeModule">取消</button>
        </slot>
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
      date: new Date(),
      time: null,
      adultNo: null,
      childNo: null,
      madeRvTime: null,
      isLoading: null,
    };
  },
  methods: {
    quickSet(){
        this.name= "林小姐",
        this.phoneNo= "0985123456"
        // this.date=new Date(2022,2,28), //畫面未顯示，但實際有設定
        this.time= "11:30",
        this.adultNo= 2,
        this.childNo= 2
    },
    async uploadReservation() {
      console.log(this.$store.state.user[0]);
      this.isLoading = true;
      const database = db.collection("reservation").doc();
      
      await database.set({
        rvId: uid(6),
        email: this.$store.state.user[0].eMail,
        name: this.name,
        phoneNo: this.phoneNo,
        adultNo: this.adultNo,
        childNo: this.childNo,
        date: this.date,
        time: this.time,
        madeRvTime: new Date().getTime(),
        status: "booked",
      });
      this.isLoading = false;
      alert("您已成功預約訂位!");
      this.$emit("update", false);
    },
    closeModule() {
      this.$emit("update", false);
    },
    fillUpForm() {
      this.name="張小姐",
      this.phoneNo="0988126789",
      this.adultNo="4",
      this.childNo="0",
      this.time="1200"
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