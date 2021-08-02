<template>
  {{ filteredData[0] }}
  
  <div class="myContainer main" v-if="rvLoaded">
    <!-- 搜尋列 -->
    <div class="search_bar">
      <div class="status">
        <label for="">狀態:</label>
        <select name="rvStatus" id="rvStatus" v-model="status">
          <option value="all" @click="filteredData()">全部訂位</option>
          <option value="booked" @click="filteredData()">已訂位</option>
          <option value="canceled" @click="filteredData()">已取消</option>
        </select>
      </div>

      <div class="filtered_date">
        <label for="">訂位區間:</label>
        <div>
          <v-date-picker v-model="range" is-range>
            <template v-slot="{ inputValue, inputEvents }">
              <div class="flex justify-center items-center">
                <input
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                  class="
                    border
                    px-2
                    py-1
                    w-32
                    rounded
                    focus:outline-none
                    focus:border-indigo-300
                  "
                />
                <svg
                  class="w-4 h-4 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <input
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                  class="
                    border
                    px-2
                    py-1
                    w-32
                    rounded
                    focus:outline-none
                    focus:border-indigo-300
                  "
                />
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>
    </div>

    <div v-if="filteredData[0].length > 0">
      <table>
        <tr>
          <td colspan="8">
            <h3>訂位資料:{{ showStatus }}</h3>
          </td>
        </tr>
        <tr>
          <th>日期</th>
          <th>時間</th>
          <th>訂位大名</th>
          <th>電話</th>
          <th>大人人數</th>
          <th>小孩人數</th>
          <th v-if="status !== 'canceled'"></th>
        </tr>

        <tr v-for="(data, idx) in filteredData[0]" :key="idx">
          <td v-if="data.edit">
            <v-date-picker 
              v-model="data.date.seconds"
              :masks="masks"
              :input-debounce="500"
              :min-date="new Date().setDate(new Date().getDate() + 1)"
              :max-date="new Date().setDate(new Date().getDate() + 30)"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <input
                  @input="console.log('aaa')"
                  class="bg-white border px-2 py-1 rounded"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </v-date-picker>
          </td>
          <td v-else>{{ data.date.seconds }}</td>
          <td v-if="data.edit">
            <select name="time" id="" v-model="data.time">
              <option value="1100">11:00</option>
              <option value="1130">11:30</option>
              <option value="1200">12:00</option>
              <option value="1230">12:30</option>
              <option value="1300">13:00</option>
              <option value="1330">13:30</option>
              <option value="1400">14:00</option>
              <option value="1430">14:30</option>
            </select>
          </td>
          <td v-else>
            {{ data.time.substring(0, 2) + ":" + data.time.substring(2, 4) }}
          </td>
          <td v-if="data.edit"><input type="text" v-model="data.name" /></td>
          <td v-else>{{ data.name }}</td>
          <td v-if="data.edit"><input type="text" v-model="data.phoneNo" /></td>
          <td v-else>{{ data.phoneNo }}</td>
          <td v-if="data.edit">
            <input type="number" v-model="data.adultNo" />
          </td>
          <td v-else>{{ data.adultNo }}</td>
          <td v-if="data.edit">
            <input type="number" v-model="data.childNo" />
          </td>
          <td v-else>{{ data.childNo }}</td>

          <td v-if="!data.edit && status !== 'canceled'">
            <button class="btn_green1" @click="data.edit = true">
              更改訂位
            </button>
            <button class="btn_green1" @click="cancelRV(idx)">取消訂位</button>
          </td>
          <td v-if="data.edit && status !== 'canceled'">
            <button class="btn_green1" @click="confirmChange(idx)">確認</button>
            <button class="btn_green1" @click="data.edit = false">
              取消更改
            </button>
          </td>
        </tr>
      </table>
      <div class="statistics">
        <h5 v-if="status === 'canceled'">
          <b>取消組數:</b>{{ filteredData[0].length }}組<br />
          <b>取消人數:</b>{{ filteredData[1] }}人
        </h5>
        <h5 v-else>
          <b>訂位組數:</b>{{ filteredData[0].length }}組<br />
          <b>訂位人數:</b>{{ filteredData[1] }}人
        </h5>
      </div>
    </div>
    <div v-else>
      <h3 style="text-align: center">目前沒有符合搜尋的訂位結果!</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { db } from "../firebase/firebaseInit";
export default {
  name: "Reservations",
  data() {
    return {
      currentRV: null,
      reservations: null,
      editedRV: null,
      range: {
        start: new Date(),
        end: new Date().setDate(new Date().getDate() + 30),
      },
      status: "booked",
      masks: {
        input: "YYYY-MM-DD",
      },
    };
  },
  created() {
    this.plus();
  },
  methods: {
    ...mapActions(["GET_RVDATA"]),
    editTodo: function (RV) {
      this.editedRV = RV;
    },
    // 獲取全部訂位資訊
    async plus() {
      await this.GET_RVDATA();
      this.reservations = this.rvData;
      var totalAmount = 0;
      this.rvData.forEach((item) => {
        item.edit = false;
        var date = new Date(item.date.seconds * 1000);
        var d =
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate();
        item.date.seconds = d;
        var amount = item.adultNo + item.childNo;
        totalAmount += amount;
      });
      this.totalAmount = totalAmount;
    },
    changeFunc(item, index) {
      var d=this.filteredData[0][index].date.seconds.toString() ;
      console.log(d)
      console.lof(item)
      // this.watchVal();
    },
    // 確認更改訂位
    confirmChange(idx) {
      this.filteredData[0][idx].edit = false;
      const data = this.filteredData[0][idx];
      const dataBase = db.collection("reservation").doc(data.docId);
      var d = data.date.seconds.toString();
      var rvDate = new Date(d.replace(/\//g, "-"));
      console.log(d);
      console.log(rvDate);
      dataBase.update({
        name: data.name,
        adultNo: parseInt(data.adultNo),
        childNo: parseInt(data.childNo),
        time: data.time,
        phoneNo: data.phoneNo,
        date: rvDate,
      });
      this.plus()
    },
    //刪除訂位
    cancelRV(idx) {
      const data = this.filteredData[0][idx];
      const dataBase = db.collection("reservation").doc(data.docId);
      dataBase.update({
        status: "canceled",
      });
    },
  },
  computed: {
    ...mapState(["rvData", "rvLoaded"]),
    // 狀態篩選訂位
    filteredData() {
      var filtered_items = this.rvData.filter((rv) => {
        if (this.status == "all") {
          return rv;
        }
        var d = rv.date.seconds.toString();
        var rvDate = new Date(d.replace(/\//g, "-")).getTime();
        var choosed_start = new Date(this.range.start).getTime();
        var choosed_end = new Date(this.range.end).getTime();
        return (
          rv.status === this.status &&
          rvDate <= choosed_end &&
          rvDate >= choosed_start
        );
      });
      var tot = 0;
      filtered_items.forEach(function (item) {
        var amount = parseInt(item.adultNo) + parseInt(item.childNo);
        tot += amount;
      });
      var rvs = new Array(filtered_items, tot);
      return rvs;
    },
    showStatus() {
      if (this.status == "booked") {
        return "已訂位";
      }
      if (this.status == "all") {
        return "全部訂位";
      }
      if (this.status == "canceled") {
        return "已取消";
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.myContainer {
  width: 80%;
  margin: 0 auto;
  padding-top: 3%;
  height: 100%;
  display: block;
  justify-content: left !important;
  table {
    width: 100%;
    margin: 0 auto;
    border: 4px solid rgb(61, 155, 108);
    border-radius: 20px;
    text-align: center;
    border-collapse: separate;
    border-spacing: 0;
    input {
      text-align: center;
    }
    tr:nth-child(even) {
      background-color: rgb(182, 223, 206);
    }
    tr:nth-child(odd) {
      background-color: transparent;
    }
    tr:nth-child(1) {
      background-color: rgb(61, 155, 108);
      color: white;
    }
  }
  td,
  th {
    padding: 10px 5px;
  }
  tr:first-child td:first-child {
    border-top-left-radius: 10px;
  }
  /*第一欄最後列：左下*/
  tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }
  /*最後欄第一列：右上*/
  tr:first-child td:last-child {
    border-top-right-radius: 10px;
  }
  /*最後欄第一列：右下*/
  tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
  tr:nth-child(3) {
    td:nth-child(1),
    td:nth-child(2),
    td:nth-child(3),
    td:nth-child(4) {
      width: 15%;
    }
    td:nth-child(5),
    td:nth-child(6) {
      width: 10%;
    }
  }

  td:last-child {
    button {
      margin: 0 10px;
    }
  }
  .search_bar {
    display: flex;
    gap: 20px;

    margin-bottom: 30px;
    .status {
      flex-basis: 25%;
      display: flex;
      align-items: center;
      select {
        flex-grow: 1;
      }
    }
    .filtered_date {
      display: flex;
      align-items: center;
      flex-grow: 1;
      flex-basis: 75%;
      div {
        display: flex;
        flex: 2;
      }
      svg {
        width: 10%;
      }
    }
  }
  .statistics {
    margin: 10px 0 30px 0;
    margin-left: 80%;
  }
}
</style>