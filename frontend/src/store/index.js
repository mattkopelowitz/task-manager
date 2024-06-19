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
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    login(state) {
        state.isLoggedIn = true;
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      const response = await axios.get('http://localhost:8080/api/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      commit('setTasks', response.data);
    },
    async createTask({ dispatch }, task) {
      await axios.post('http://localhost:8080/api/tasks', task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch('fetchTasks');
    },
    login({ commit }) {
        commit('login');
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn
  }
});

