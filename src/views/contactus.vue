<template>
  <Banner-top>
    <template v-slot:title>聯絡我們</template>
    
  </Banner-top>
  <div class="content main">
    <h5>若您有任何疑問、或問題反饋，歡迎您透過以下方式聯絡我們!謝謝您的蒞臨</h5>
    
    <div class="wrapper">
      <div>
        <table class="m_table">
          <tr>
            <td>主旨</td>
            <td>
              <input type="text" placeholder="請填寫主旨" v-model="subject" />
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>
              <input type="text" placeholder="請填寫姓名" v-model="name" />
            </td>
          </tr>
          <tr>
            <td>電話</td>
            <td>
              <input type="text" placeholder="請填寫電話" v-model="tele" />
            </td>
          </tr>
          <tr>
            <td>信箱</td>
            <td>
              <input type="text" placeholder="請填寫email" v-model="email" />
            </td>
          </tr>
          <tr>
            <td>內容</td>
            <td>
              <textarea placeholder="請填寫內容" v-model="content"></textarea>
            </td>
          </tr>
        </table>
        <button class="btn_brown2" @click="sendEmail">發送
          <img src="../assets/img/loading.gif" alt="" v-if="isLoading">
        </button>
      </div>

      <div>
        <img
          style="width: 100%"
          src="../assets/img/environment/all3.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="wrapper">
      <div>
        <img
          style="width: 90%"
          src="../assets/img/environment/front_foor.jpg"
          alt=""
        />
      </div>
      <div>
        <table class="m_table">
          <tr>
            <td>
              地址 <br />
              Address
            </td>
            <td>545南投縣埔里鎮桃米路12-11號</td>
          </tr>
          <tr>
            <td>
              信箱<br />
              E-mail
            </td>
            <td>mail1@nayangbeach.com.tw</td>
          </tr>
          <tr>
            <td>電話 <br />TEL</td>
            <td>
              (04)9291-2677 <br />
              (8:00AM-5:00PM)
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import BannerTop from "../components/bannerTop.vue";
import emailjs from "emailjs-com";
export default {
  components: {
    BannerTop,
  },
  data() {
    return {
      subject: null,
      name: null,
      tele: null,
      email: null,
      content: null,
      isLoading: null,
    };
  },
  methods: {
    sendEmail() {
      this.isLoading = true;
      let templateParams = {
        userMail: this.email,
        user: this.name,
        tele: this.tele,
        subject: this.subject,
        content: this.content,
      };
      let service_id = "default_service";
      let template_id = "template_qfit1he";
      let userID = "user_RtSc5vIZxc8QmHcvyu6yT";
      emailjs
        .send(service_id, template_id, templateParams, userID)
        .then((response) => {
          alert("SUCCESS!", response.status, response.text);
          this.isLoading = null;
          this.email = null;
          this.name = null;
          this.tele = null;
          this.subject = null;
          this.content = null;
        })
        .catch((error) => {
          alert("FAILED...", error);
        });
      
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.content {
  margin: 50px 0;
  h5 {
    margin-bottom: 20px;
    font-weight: 800;
  }
}
.m_table {
  width: 90%;
  tr {
    td {
      font-size: 16px;
      font-weight: 900;
      padding: 0 10px 10px 10px;
      &:first-child {
        color: $color1;
      }
      &:nth-child(2) {
        input {
          width: 100%;
        }
      }
    }
  }
}
.wrapper {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-bottom: 40px;
  div {
    &:first-child {
      flex: 4;

      .btn_brown2 {
        width: 90%;
      }
      textarea {
        width: 100%;
        height: 100px;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 5px;
      }
    }
    &:nth-child(2) {
      flex: 3;
    }
  }
}
</style>>

