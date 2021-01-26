import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: {
    todolistName: []
  },
  mutations: {
    mutationInit(state, payload) {
      state.todolistName = payload;
    },
    addName(state, payload) {
      state.todolistName.push(payload);
    },
    updateName(state,payload) {
      state.todolistName.splice(payload.index, 1, { name: payload.name, id: payload.id });
    },
    deleteName(state,index) {
      state.todolistName.splice(index, 1);
    },
  },
  actions: {
  async Init({ commit },{url}) {
    await axios.get(url)
        .then((response) => {
          // console.log(response.data.data);
          commit("mutationInit", response.data.data)
        })
    },
    async AddTodoName({ commit }, {url,name}) {
      await axios.post(url, {
        name:name
      })
        .then((response) => {
          // console.log(response);
          // console.log(response.data);
          // console.log(response.data.data);
          commit("addName", response.data.data)
        })
    },
    async updateTodoName({ commit }, { url, name, ID, Index }) {
      await axios.put(url+"/"+ ID,
      {name:name}).then((response) => {
          // console.log(response);
          // console.log(response.data);
        console.debug(response)
        console.log(name + " " + ID);
        commit({ type:"updateName", name:name, id:ID, index:Index })
      })
    },
    async deleteTodoName({ commit }, { url,ID, Index }) {
      await axios.delete(url + "/" + ID)
        .then((response) => {
          // console.log(response);
          // console.log(response.data);
          console.debug(response)
          commit("deleteName",Index)
      })
    },

  },
  modules: {
  }
})
