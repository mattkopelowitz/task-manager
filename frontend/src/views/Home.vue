<template>
  <div>
    <div class="nav-bar" v-if="user">
      <div class="logo">Task Manager</div>
      <div class="welcome-message">Welcome, {{ user.username.toUpperCase() }}</div>
      <div class="profile"></div>
    </div>
    <TaskList v-if="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TaskList from '@/components/TaskList.vue';

export default {
  name: 'Home',
  components: { TaskList },
  computed: {
    ...mapState(['user', 'isLoggedIn'])
  },
  created() {    
    if (localStorage.getItem('isLoggedIn')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.$store.commit('setUser', user);
      this.$store.dispatch('fetchTasks');
    } else {
      this.$router.push("/login");
    }
  }
};
</script>

