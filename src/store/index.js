import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

Vue.use(Vuex)

const state = {
	userInfo:{},
	user:{},
  userRoleid:0,
  typeid:0
};

const getters = {
};

const mutations = {
	//set user infomation from stglt
	setUserInfo(state,data){
		state.userInfo=data;
	},
	setUser(state,data){
		state.user=data;
	},
	setUserRoleid(state,data){
		state.userRoleid=data;
  },
  setTypeid(state,data){
    state.typeid=data;
  }
};

const actions = {
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
