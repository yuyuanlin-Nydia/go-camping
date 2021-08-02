import { createStore } from "vuex";
import {db} from "../firebase/firebaseInit"


export default createStore({
  state: {
    navToggle:null,
    rvData:[],
    rvLoaded:null,
    logIn:null,
    user:[]
  },
  mutations: {
    TOGGLE_NAV(state){
      state.navToggle= !state.navToggle
    },
    SET_RVDATA(state,payload){
      state.rvData.push(payload)
    },
    RV_LOADED(state){
      state.rvLoaded=true;
    },
    SET_LOGIN(state,payload){
      state.logIn=!state.logIn;
      state.user.push(payload)
    }
  },
  actions: {
    async GET_RVDATA({commit}){
      const getData=db.collection('reservation').orderBy("date").orderBy("time");
      const results=await getData.get();
      results.forEach(doc=>{
        const data={
          docId: doc.id,
          rvId:doc.data().rvId,
          name:doc.data().name,
          phoneNo:doc.data().phoneNo,
          adultNo:doc.data().adultNo,
          childNo:doc.data().childNo,
          date:doc.data().date,
          time:doc.data().time,
          status:doc.data().status
        }
        commit("SET_RVDATA", data);
      })
      commit("RV_LOADED")
    }
  },
  modules: {},
});
