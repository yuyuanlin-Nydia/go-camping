<template>
  <div class="main">
    <div>
      <Banner-top>
        <template v-slot:title>帳篷預定</template>
      </Banner-top>
      <RoomFilter  />
      <div class="room" v-for="item,idx in occupancy" :key="idx">
        <div>
          <ul>
            <li>{{item.tentName}}</li>
            <router-link
              :to="{
                name: 'TentIntro',
                params: { tentId: 'Im4dAoMFRx1himpQegM2' },
              }"
              ><li>客房介紹</li></router-link
            >
          </ul>
        </div>
        <div class="offers">
          <img src="https://placem.at/things?w=350" alt="" />
          <section>
            <div class="offer" v-for="(item,idx) in occupancy[idx].offers " :key="idx">
              <div>{{item.offerName}}</div>
              <div>
                <span class="price">{{item.lowestPrice.toLocaleString('en-us')  }}</span
                ><span class="small_txt">TWD/每晚</span>
              </div>
              <button class="btn_brown2">預定</button>
            </div>
          </section>
        </div>
      </div>
 
    </div>
  </div>
</template>

<script>
import BannerTop from "../components/bannerTop.vue";
import RoomFilter from "../components/roomFilter.vue";
import {mapState }from 'vuex'
export default {
  components: {
    RoomFilter,
    BannerTop,
  },
  methods: {
   
  },
  computed:{
    ...mapState(["occupancy"])
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.main {
  display: block;
}
.room {
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid lightgray;
  box-shadow: 1px 1px 5px lightgray;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > li {
      &:first-child {
        font-size: 28px;
        font-weight: 600;
      }
    }
    > a {
      color: $color2 !important;
      &:hover {
        text-decoration: underline !important;
      }
    }
  }
  .offers {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      flex: 1;
    }
    section {
      flex: 4;
      border-bottom: 1px solid lightgray;
      border-top: 1px solid lightgray;
      .offer {
        display: flex;
        align-items: center;
        gap: 15px;
        justify-content: space-between;
        border-bottom: 1px solid lightgray;
        padding: 20px;
        font-size: 18px;
        div {
          &:first-child {
            font-weight: 600;
            font-size: 24px;
          }
        }
        span.price {
          font-weight: 900;
          font-size: 26px;
        }
        .small_txt {
          font-size: 12px;
        }
      }
    }
  }
}
</style>