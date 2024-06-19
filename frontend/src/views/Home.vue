<template>
    <div>
      <h1>Welcome, {{ user.username }}</h1>
      <TaskList />
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import TaskList from '@/components/TaskList.vue';
  
  export default {
    name: 'Home',
    components: { TaskList },
    computed: {
      ...mapState(['user']),
    }, 
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.$store.commit('setUser', user);
        this.$store.dispatch('fetchTasks');
    }
  };
  </script>