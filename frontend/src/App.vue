<template>
  <div id="app">
    <nav v-if="!isLoggedIn">
      <!-- <router-link to="/">Home</router-link> -->
      <!-- <router-link to="/tasks">Tasks</router-link> -->
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
    <router-view />
    <button v-if="isLoggedIn" >Logout</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isLoggedIn'])
  },
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

