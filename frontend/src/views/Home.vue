<template>
  <div>
    <h1 v-if="user">Welcome, {{ user.username.toUpperCase() }}</h1>
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
    console.log(localStorage.getItem('isLoggedIn'));
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

