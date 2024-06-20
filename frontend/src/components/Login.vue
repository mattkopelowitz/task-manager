<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label>Username</label>
          <input v-model="username" type="text" required>
        </div>
        <div>
          <label>Password</label>
          <input v-model="password" type="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
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
        async login() {
            try {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    username: this.username,
                    password: this.password
                });
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isLoggedIn', 'true');
                this.$router.push('/');
            } catch (error) {
                console.error('Failed to login', error.response.data);
                alert('Failed to login: ' + error.response.data.message);
            }
        }
    }
  };
  </script>
  