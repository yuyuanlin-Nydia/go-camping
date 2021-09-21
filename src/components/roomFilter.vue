<template>
  <div v-if="tentData.length">
    <div class="selection">
      <div @click="showOptions" style="flex-direction:column;justify-content:center;align-items:start">
        <p>客房</p>
        <p v-if="checkedItem.length">{{checkedItem.toString()}}</p>
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
                <span v-if="startDate == null" class="sub_title">新增日期</span>
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
      <!-- 搜尋的選擇 -->

      <div>
        <v-date-picker
          class="inline-block h-full"
          v-model="endDate"
          :min-date="new Date().setDate(new Date(startDate).getDate() + 1)"
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
      <!-- <div>
        <p>入住<br /><span class="sub_title">新增人數</span></p>
      </div> -->
      <button class="btn_brown1 search_btn" @click="searchTent">搜尋</button>
    </div>
   
    <div class="filter_content">
      <div class="tent_choice" v-if="optionsShow">
        <label for="tentsAll"
          ><input
            type="checkbox"
            id="tentsAll"
            value="all"
            v-model="checkedAll"
            @change="changeAllChecked()"
          />全部</label
        >
        <label v-for="(item, idx) in tentData" :key="idx" :for="idx"
          ><input
            type="checkbox"
            :id="idx"
            :value="item.tentName"
            v-model="checkedItem"
          />{{ item.tentName }}</label
        ><br />
      </div>
      <!-- <div class="people">
        <div>
          <p>成人</p>
          <div>
            <span @click="plus()">{{ adult }}位成人</span>
            <div style="display: flex">
              <div
                @click="adult--"
                :class="[adult <= 0 ? 'active' : 'canMath']"
              >
                <i class="fas fa-minus-circle"></i>
              </div>
              <div
                @click="adult++"
                :class="[adult >= 0 && adult < 8 ? 'canMath' : 'active']"
              >
                <i class="fas fa-plus-circle"></i>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>兒童(小於10歲以下)</p>
          <div>
            <span>{{ child }}位兒童</span>
            <div style="display: flex">
              <div
                @click="child--"
                :class="[child <= 0 ? 'active' : 'canMath']"
              >
                <i class="fas fa-minus-circle"></i>
              </div>
              <div
                @click="child++"
                :class="[child >= 0 && child < 8 ? 'canMath' : 'active']"
              >
                <i class="fas fa-plus-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
     <div class="filtered_text" v-if="occupancy.length && startDate && endDate  ">
      <span class="question">您選擇的帳篷</span>:<span class="answer">{{ checkedItem.toString() }} </span><br>
      <span class="question">選擇入住日期</span>:<span class="answer">{{startDate.toLocaleDateString()}}</span><br>
      <span class="question">選擇退房日期</span>:<span class="answer">{{ endDate.toLocaleDateString() }} </span><br>
      <span class="question">搜尋結果</span>:<span class="answer">共{{ occupancy.length }}種房型</span> 
    </div>
  </div>
  
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "RoomFilter",
  data() {
    return {
      startDate: null,
      endDate: null,
      adult: 0,
      child: 0,
      checkedAll: false,
      checkedItem: [],
      checkedAttr: ["樹屋兩人帳", "豪華四人帳"],
      optionsShow: null,
    };
  },
  async mounted() {
    await this.GET_TENTDATA();
  },
  methods: {
    ...mapActions([ "GET_TENTDATA","SEARCH_TENT"]),
    changeAllChecked() {
      if (this.checkedAll) {
        this.checkedItem = this.checkedAttr;
      } else {
        this.checkedItem = [];
      }
    },
    searchTent() {
      var data = {
        tentType: this.checkedItem,
        stayFrom: parseInt(this.startDate.getTime() / 1000),
        stayTo: parseInt(this.endDate.getTime() / 1000),
      };
      this.$store.dispatch("SEARCH_REST_TENT", data);
      this.optionsShow = false;
    },
    showOptions() {
      this.optionsShow = !this.optionsShow;
    },
  },
  computed: {
    ...mapState(["tentsName", "tentData", "occupancy"]),
  },

  watch: {
    checkedItem: function () {
      if (this.checkedItem.length == this.checkedAttr.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.selection {
  width: 70%;
  margin: 30px auto;
  margin-bottom: 0;
  display: flex;
  flex-wrap: nowrap;
  align-self: center;
  justify-content: space-around;
  border: 1px solid lightgray;
  padding: 5px 0;
  position: relative;
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

  .search_btn {
    background-color: $color1;
    color: white;
  }
}
.filtered_text{
  padding: 10px 15%;
  .answer{
    font-weight: bold;
  }
  
}
.filter_content {
  display: flex;
  position: relative;
  .tent_choice {
    padding: 20px;
    border: 1px solid lightgrey;
    position: absolute;
    z-index: 20;
    left: 15%;
    display: flex;
    flex-wrap: wrap;
    font-size: 18px;
    width: 180px;
    background-color: white;
    label {
      width: 100%;
    }
  }
  .people {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 62%;
    padding: 20px;
    border: 1px solid lightgrey;
    background-color: white;
    > div {
      > div {
        border: 1px solid lightgrey;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .fa-minus-circle,
        .fa-plus-circle {
          font-size: 30px;
          margin: 0 5px;
          cursor: pointer;
        }
        .canMath {
          color: $color2;
        }
        .active {
          color: lightgrey;
          pointer-events: none;
        }
        &:nth-child(2) {
          width: 220px;
        }
      }
    }
  }
}
</style>