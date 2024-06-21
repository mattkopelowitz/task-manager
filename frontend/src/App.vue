<template>
  <div id="app">
    <div class="nav-bar">
      <div class="logo"></div>
      <div class="nav-links" v-if="!isLoggedIn">
        <router-link to="/login" class="nav-button">Login</router-link>
        <router-link to="/register" class="nav-button">Register</router-link>
      </div>
      <div class="profile" v-if="isLoggedIn">
        <button class="logout-button" @click="handleLogout">Logout</button>
      </div>
    </div>
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