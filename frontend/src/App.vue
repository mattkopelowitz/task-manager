<template>
  <div id="app">
    <nav v-if="!isLoggedIn">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
    <nav v-if="isLoggedIn">
      <button @click="handleLogout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['user', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style>
nav {
  padding: 10px;
  background-color: #f8f9fa;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
