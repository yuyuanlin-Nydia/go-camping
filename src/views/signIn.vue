<template>
  <div class="bg main">
    <div class="mycontainer">
      <div class="left">
        <div class="tabs">
          <span
            v-for="tab in tabs"
            :key="tab"
            :class="['tab-button', { active: currentTab === tab }]"
            @click="currentTab = tab"
            >{{ tab }}</span
          >
        </div>
        <!-- 登入欄位 -->
        <div v-if="currentTab === '登入'">
          <label for="">信箱:</label
          ><input type="email" placeholder="請輸入信箱" v-model="logEmail"/><br />
          <label for="">密碼:</label
          ><input type="password" placeholder="請輸入密碼" v-model="logPassword"/>
          <button class="btn_brown2" @click="signIn">登入</button>
          <button class="btn_brown2 google" @click="googleSignIn">
            使用GOOGLE登入
          </button>
          <button class="btn_brown2 fb" @click="fbSignIn">使用FB登入</button>
        </div>
        <!-- 註冊欄位 -->
        <div v-if="currentTab === '註冊'">
          <label for="">信箱:</label
          ><input
            type="email"
            placeholder="請輸入信箱"
            required
            v-model="email"
          />
          <br />
          <label for="">密碼:</label
          ><input
            type="password"
            placeholder="請輸入6位以上密碼"
            required
            v-model="password"
          /><br />

          <button class="btn_brown2" @click="register">註冊</button>
        </div>
      </div>
    </div>
  </div>
  <Loading v-if="isLoading" />
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { firebaseAuth, fireBase } from "../firebase/firebaseInit";
import Loading from "../components/loading.vue";
export default {
  components: { Loading },
  data() {
    return {
      currentTab: "登入",
      tabs: ["登入", "註冊"],
      isLoading: null,
      account: null,
      password: null,
      email: null,
      logPassword: null,
      logEmail: null,
    };
  },
  mounted() {
  },
  
  methods: {
    ...mapMutations(["SET_LOGIN"]),
    
    // 註冊
    register() {
      this.isLoading = true;
      var email = this.email;
      var password = this.password;
      firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("註冊成功!請重新登入");
        })
        .catch(function (error) {
          alert(error.message);
        });
      this.isLoading = false;
      this.currentTab = "登入";
      this.email = "";
      this.password = "";
    },
    // 一般登入
    signIn() {
      var email = this.logEmail;
      var password = this.logPassword;
      if (email && password) {
        firebaseAuth
          .signInWithEmailAndPassword(email, password)
          .then(
            () => {
              alert("成功登入");
              var userData = {
                userName: this.logEmail.split("@")[0],
                eMail: this.logEmail,
              };
              this.SET_LOGIN(userData);
              this.$router.push("/");
            },
            (err) => {
              alert(err.message);
            }
          )
          .catch(function (error) {
            alert(error.message);
          });
      } else {
        alert("帳號或密碼不得為空");
      }
    },
    //google登入
    googleSignIn() {
      const provider = new fireBase.auth.GoogleAuthProvider();
      fireBase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          var userData = {
            userName: user.displayName,
            eMail: user.email,
          };
          console.log(userData);
          this.SET_LOGIN(userData);
          this.$router.push({ name: "Home" });
          // this.$store.state.user;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    //FB登入
    fbSignIn() {
      const provider = new fireBase.auth.FacebookAuthProvider();
      fireBase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          var userData = {
            userName: user.displayName,
            eMail: user.email,
          };
          console.log(userData);
          this.SET_LOGIN(userData);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error.email);
          console.log(error.code);
          if (error.code === "auth/account-exists-with-different-credential") {
            console.log(fireBase);
            fireBase
              .auth()
              .fetchSignInMethodsForEmail(error.email)
              .then(function (providers) {
                console.log(providers);
                // if (providers[0] == "google.com") {
                //   var provider = new fireBase.auth.GoogleAuthProvider();
                //   fireBase
                //     .auth()
                //     .signInWithRedirect(provider)
                //     .then(function (result) {
                //       fireBase
                //         .auth()
                //         .signInWithCredential(result.credential)
                //         .then((user) => {
                //           user.linkWithCredential(error.credential);
                //         })
                //         .catch(function () {});
                //     })
                //     .catch(function () {});
                // }
              });
          }
        });
    },
  },
  computed: {
    ...mapState(["logIn"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.bg {
  background-image: url("../assets/img/environment/all2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  .mycontainer {
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(0.1rem);
    width: 450px;
    height: 80%;
    display: flex;
    align-items: center;

    flex-wrap: nowrap;
    .left {
      width: 80%;
      height: 100%;
      padding: 5%;
      margin: 0 auto;
      .tabs {
        margin-bottom: 30px;

        span {
          margin: 10px;
          font-size: 16px;
          font-weight: 700;
          padding: 5px;
          font-size: 20px;
          cursor: pointer;
        }
        .active {
          border-bottom: 3px solid $color1;
        }
      }
      input {
        margin: 10px 0;
      }
      .btn_brown2 {
        margin-top: 20px;
        width: 100%;
        &:hover {
          color: white;
          background-color: $color1;
          text-decoration: underline;
          opacity: 0.9;
        }
      }
      .google {
        background-color: #ea4335;
        border-color: #ea4335;
        &:hover {
          color: white;
          text-decoration: underline;
          opacity: 0.9;
          background-color: #ea4335;
        }
      }
      .fb {
        background-color: #3c5998;
        border-color: #3c5998;
        &:hover {
          color: white;
          text-decoration: underline;
          opacity: 0.9;
          background-color: #3c5998;
        }
      }
    }
  }
}
</style>