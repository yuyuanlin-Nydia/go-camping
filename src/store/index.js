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
      state.user.push(payload);
    },
    SET_TENTDATA(state, payload) {
      state.tentData.push(payload);
      console.log(state.tentData);
    },
    SET_CURRENT_TENT(state, payload) {
      state.currentTent = state.tentData.filter((tent) => {
        return tent.id === payload;
      });
    },
    searchTent(state, payload) {
      state.occupancy.push(payload);
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
      var getData = db.collection("tent");
      var results = await getData.get();

      results.forEach((doc) => {
        const data = {
          id: doc.id,
          tentName: doc.data().tentName,
          description: doc.data().description,
          facility: doc.data().facility,
          offers: doc.data().offers,
        };
        commit("SET_TENTDATA", data);
      });

      commit("RV_LOADED");
    },
    //  GET_TENTBOOKING({commit}){
    //   const getData=db.collection('tents').where('price','<=',8000)
    //   const data=await getData.get();
    // }
    // 搜尋特定帳篷
    async SEARCH_TENT(context, args) {
      var a = args.toString().split(",");
      var getData = db.collection("tent").where("tentName", "in", a);
      var result = await getData.get();
      result.forEach((doc) => {
        const data = {
          id: doc.id,
          tentName: doc.data().tentName,
          description: doc.data().description,
          facility: doc.data().facility,
          offers: doc.data().offers,
        };
        context.commit("searchTent", data);
      });
    },
  },
  modules: {},
});
