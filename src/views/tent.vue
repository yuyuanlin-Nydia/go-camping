<template>
  <div class="myContainer main">
    <div>
      <div class="banner">
        <h2>帳篷資訊</h2>
      </div>
      <div class="selection">
        <div>
          <p>客房<br /></p>
        </div>
        <div>
          <v-date-picker
            class="inline-block h-full"
            v-model="startDate"
            :min-date="new Date().setDate(new Date().getDate() + 1)"
          >
            <template v-slot="{ inputValue, togglePopover }">
              <div class="flex items-center">
                <p @click="togglePopover()">
                  入住<br />
                  <span v-if="startDate == null" class="sub_title"
                    >新增日期</span
                  >
                  <input
                    v-else
                    :value="inputValue"
                    class="
                      bg-white
                      text-gray-700
                      w-full
                      py-1
                      px-2
                      appearance-none
                      border
                      rounded-r
                      focus:outline-none
                      focus:border-blue-500
                    "
                    readonly
                  />
                </p>
              </div>
            </template>
          </v-date-picker>
        </div>
        <div>
          <v-date-picker
            class="inline-block h-full"
            v-model="endDate"
            
          >
            <template v-slot="{ inputValue, togglePopover }">
              <div class="flex items-center">
                <p @click="togglePopover()">
                  退房<br />
                  <span v-if="endDate == null" class="sub_title">新增日期</span>
                  <input
                    v-else
                    :value="inputValue"
                    class="
                      bg-white
                      text-gray-700
                      w-full
                      py-1
                      px-2
                      appearance-none
                      border
                      rounded-r
                      focus:outline-none
                      focus:border-blue-500
                    "
                    readonly
                  />
                </p>
              </div>
            </template>
          </v-date-picker>
        </div>
        <div>
          <p>入住<br /><span class="sub_title">新增人數</span></p>
        </div>

        <button class="btn_brown1 search_btn">搜尋</button>
      </div>
      <div class="tents">
        <div class="tent" v-for="(item,idx) in tentData" :key="idx">
          <img src="https://placem.at/places?w=500" alt="" />
          <div>
            <h5>{{item.tentName}}</h5>
            <p>
              {{item.description}}
            </p>
            <router-link :to="{name:'TentIntro',params:{tentId:item.id}}"><button class="btn_green1">查看價格和更多資訊</button></router-link>
          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex';
export default {
  data() {
    return {
      startDate: null,
      endDate: null,
    };
  },  
  created(){
    this.GET_TENTDATA()
  },
  methods:{
    ...mapMutations(["SET_TENTDATA"]),
    ...mapActions(["GET_TENTDATA"])
  },
  computed: {
    selectDragAttribute() {
      return {
        popover: {
          visibility: "hover",
          isInteractive: false, // Defaults to true when using slot
        },
      };
    },
    ...mapState(["tentData"])
  },
 
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.selection {
  width: 70%;
  margin: 30px auto;
  border-radius: 50px;
  display: flex;
  flex-wrap: nowrap;
  align-self: center;
  justify-content: space-around;
  border: 1px solid lightgray;
  padding: 5px 0;
  > div {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 0 0 2%;
    border-right: 0.5px solid lightgrey;

    &:hover {
      background-color: lightgray;
      border-radius: 25px;
      cursor: pointer;
    }
    span.sub_title {
      color: grey;
    }
  }
  > div:last-of-type {
    border-right: none !important;
  }
  .search_btn {
    background-color: $color1;
    border-radius: 50px;
    color: white;
  }
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