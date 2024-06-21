<template>
    <div>
      <div class="nav-bar">
        <h2>Register</h2>
      </div>
      <div class="register-form">
          <form @submit.prevent="register">
          <div>
            <label>Username</label>
            <input v-model="username" type="text" required>
          </div>
          <div>
            <label>Password</label>
            <input v-model="password" type="password" required>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('http://localhost:8080/api/auth/register', {
            username: this.username,
            password: this.password
          });
          this.$router.push('/login');
        } catch (error) {
          console.error('Failed to register', error);
        }
      }
    }
  };
  </script>  