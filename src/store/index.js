import { createStore } from "vuex";
import { db } from "../firebase/firebaseInit";

export default createStore({
  state: {
    navToggle: null,
    rvData: [],
    rvLoaded: null,
    logIn: null,
    user: [],
    tentData: [],
    currentTent: [],
    occupancy: [],
    occupancy_s: [],
    cart: [],
  },
  mutations: {
    TOGGLE_NAV(state) {
      state.navToggle = !state.navToggle;
    },
    SET_RVDATA(state, payload) {
      state.rvData.push(payload);
    },
    RV_LOADED(state) {
      state.rvLoaded = true;
    },
    SET_LOGIN(state, payload) {
      state.logIn = !state.logIn;
      state.user.length = 0;
      state.user.push(payload);
    },
    SET_TENTDATA(state, payload) {
      state.tentData=payload;
    },
    DELETE_TENTDATA(state) {
      state.tentData.splice(0, state.tentData.length);
    },
    SET_CURRENT_TENT(state, payload) {
      state.currentTent = state.tentData.filter((tent) => {
        return tent.id === payload;
      });
    },
    searchTentType(state, payload) {
      state.occupancy_s.push(payload);
    },
    searchTent(state, payload) {
      state.occupancy.length = 0;
      state.occupancy.push(payload);
    },
    ADD_TO_CART(state, payload) {
      state.cart.push(payload);
    },
    DELETE_CART_ITEM(state, payload) {
      var x = state.cart.indexOf(payload);
      state.cart.splice(x, 1);
    },
    DELETE_ALLCART(state) {
      state.cart.splice(0, state.cart.length);
    },
  },
  actions: {
    //所有訂位
    async GET_RVDATA({ commit }) {
      const getData = db
        .collection("reservation")
        .orderBy("date")
        .orderBy("time");
      const results = await getData.get();
      results.forEach((doc) => {
        const data = {
          docId: doc.id,
          rvId: doc.data().rvId,
          name: doc.data().name,
          phoneNo: doc.data().phoneNo,
          adultNo: doc.data().adultNo,
          childNo: doc.data().childNo,
          date: doc.data().date,
          time: doc.data().time,
          status: doc.data().status,
        };
        commit("SET_RVDATA", data);
      });
      commit("RV_LOADED");
    },
    //所有帳篷
    async GET_TENTDATA({ commit }) {
      commit("DELETE_TENTDATA");
      var getData = db.collection("tent");
      var results = await getData.get();
      var tentType = [];
      results.forEach((doc) => {
        const data = {
          id: doc.id,
          tentName: doc.data().tentName,
          description: doc.data().description,
          facility: doc.data().facility,
          offers: doc.data().offers,
        };
        tentType.push(data);
      });
      commit("SET_TENTDATA", tentType);
      commit("RV_LOADED");
    },
    // 搜尋特定帳篷=>專案資訊
    async SEARCH_TENT({ commit }, args) {
      var a = args.tentType.toString().split(","); //帳篷名陣列
      var getData = db.collection("tent").where("tentName", "in", a);
      var result = await getData.get();
      var data;
      var data_arr = [];
      result.forEach((doc) => {
        data = {
          id: doc.id,
          tentName: doc.data().tentName,
          description: doc.data().description,
          facility: doc.data().facility,
          offers: doc.data().offers,
          tentNo: doc.data().tentNo,
          from: args.stayFrom,
          to: args.stayTo,
        };
        data_arr.push(data);
      });
      commit("searchTentType", data);
      return data_arr;
    },
    async SEARCH_REST_TENT({ dispatch, commit }, args) {
      var a = args.tentType.toString().split(","); //帳篷名陣列
      var received = await dispatch("SEARCH_TENT", args); // 等待 SEARCH_TENT 完成
      // 統計日期內的總預訂房間數
      let start = args.stayFrom;
      let end = args.stayTo;
      var getData2 = db
        .collectionGroup("tentBooking")
        .where("tentName", "in", a)
        .where("stayDate", ">=", start)
        .where("stayDate", "<", end);
      var result2 = await getData2.get();
      let cal = [];

      var details;
      result2.forEach((doc) => {
        details = {
          tentName: doc.data().tentName,
          bookNum: doc.data().bookNum,
        };
        cal.push(details);
      });
      var temp = {};
      //統計相同帳篷的數量
      if (cal) {
        for (var i = 0; i < cal.length; i++) {
          var key = cal[i].tentName;
          if (temp[key]) {
            temp[key].bookNum += cal[i].bookNum;
          } else {
            temp[key] = {};
            temp[key].tentName = cal[i].tentName;
            temp[key].bookNum = cal[i].bookNum;
          }
        }
      }
      //計算剩餘的帳篷數量
      var finalTent = [];

      received.forEach(function(item) {
        if (temp.length) {
          item.rest = item.tentNo - temp[item.tentName].bookNum;
        } else {
          item.rest = item.tentNo;
        }
        finalTent.push(item);
      });
      //傳給mutations
      commit("searchTent", finalTent);
    },
  },
  modules: {},
});
