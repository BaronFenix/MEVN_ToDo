import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const app = new axios.create({
  baseURL: 'http://localhost:3000'
});
export default new Vuex.Store({
  state: {
    notes: [],
    checkedNotes: [],
    uncheckedNotes: [],
    changeNote: { statu5: false },
  },
  mutations: {
    GET_STATUS(state,payload){ 
      state.notes = payload;
    },
    GET_POSTS(state, payload){
      state.notes = payload;
    },
    POST_STATUS(state, payload){
      state.notes.push(payload);
    },
    DELETE_STATUS(state, payload){
      state.notes.splice(payload, 1);
    },
    PUT_STATUS(state, payload){
      state.notes[payload].header = state.newValue.header;
      state.notes[payload].content = state.newValue.content;
    },
    PATCH_STATUS(state, payload){
      state.notes[payload].statu5 = state.newValue.statu5;
    }
  },
  actions: {
    async getPosts({ commit }) {
      const {data, status} = await app.get('notes');
      console.log(status);
      commit('GET_POSTS', data);
    },
    async getCheckedUsers({ commit }) {
      const {data, status} = await app.get('checked_notes');
      console.log(status);
      commit('GET_POSTS', data);
    },
    async getUnCheckedUsers({ commit }) {
      const {data, status} = await app.get('unchecked_notes');
      console.log(status);
      commit('GET_POSTS', data);
    },
    async addNote({ commit }, user) {
      // if(user.name)
      const {status} = await app.post('notes', user);
      console.log(status);
      commit('POST_STATUS',user);
    },
    async removeNote({ commit, state }, index){
      const id = state.notes[index]._id;
      const {status} = await app.delete('notes/' + id);
      console.log(id);
      console.log(status);
      commit('DELETE_STATUS', index);
    },
    async changeStatus({ commit, state }, index){
      const id = state.notes[index]._id;
      if(state.notes[index].statu5 === false) {
        state.changeNote.statu5 = true;
      }
      else {
        state.changeNote.statu5  = false;
      }
      const {status, data} = await app.patch('notes/' + id, (state.changeNote));
        if(status === 200) {
          state.newValue.statu5 = data.statu5;
          commit('PATCH_STATUS', index);
      }
      else{
        alert("Произошла ошибка!");
      }
    },
    async changeNote({ commit, state }, index) {
      const id = state.notes[index]._id;
      const {status, data} = await app.put('notes/' + id, state.notes[index]);
      if(status === 200) {
        state.newValue.header = data.header;
        state.newValue.content = data.content;
        commit('CHANGE_STATUS', index);
      }
      else{
        alert("Произошла ошибка!");
      }
    },
  },
  modules: {
  }
})
