<template>
  <div class="main" v-if="rvLoaded">
    <div>
      <Banner />
      <RoomFilter />
      <div class="tents">
        <div class="tent" v-for="(item, idx) in tentData" :key="idx">
          <img src="https://placem.at/places?w=500" alt="" />
          <div>
            <h5>{{ item.tentName }}</h5>
            <p>
              {{ item.description }}
            </p>
            <router-link
              :to="{ name: 'TentIntro', params: { tentId: item.id } }"
              ><button class="btn_green1">
                查看價格和更多資訊
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import RoomFilter from "../components/roomFilter.vue";
import Banner from "../components/bannerTop.vue"
export default {
  components: {
    RoomFilter,
    Banner
  },
  data() {
    return {};
  },
  created() {
    this.GET_TENTDATA();
  },
  methods: {
    ...mapMutations(["SET_TENTDATA"]),
    ...mapActions(["GET_TENTDATA"]),
  },
  computed: {
    ...mapState(["tentData", "rvLoaded"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.main {
  display: block;
}

.tents {
  display: flex;
  width: 70%;
  margin: 50px auto;
  gap: 50px;
  flex-wrap: wrap;

  > div {
    width: 30%;
  }
  .tent {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      img {
        opacity: 0.8;
      }
    }
    .btn_green1 {
      border-radius: none;
      width: 100%;
    }
    > div {
      padding: 5%;
    }
  }
}
svg {
  width: 20px;
}
.date_range {
  display: flex;
  flex-wrap: nowrap;
  > div {
    background-color: lightgray;
  }
}
</style>