import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    tasks: [],
    isLoggedIn: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isLoggedIn = !!user;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    login(state, user) {
      state.isLoggedIn = true;
      state.user = user;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/api/tasks');
        commit('setTasks', response.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    },
    async createTask({ dispatch }, task) {
      try {
        await axios.post('http://localhost:8080/api/tasks', task);
        dispatch('fetchTasks');
      } catch (error) {
        console.error('Failed to create task', error);
      }
    },
    login({ commit }, user) {
      this.$store.commit('isLoggedIn', true);
      commit('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(user));
      commit('login', user);
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      commit('logout');
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn
  }
});
