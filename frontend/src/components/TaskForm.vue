<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Title</label>
        <input v-model="form.title" type="text" required>
        <label>Description</label>
        <input v-model="form.description" type="text" required>
      </div>
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      form: {
        title: '',
        description: ''
      },
      isFormSubmitted: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.post('http://localhost:8080/api/tasks/createTask', {
          title: this.form.title,
          description: this.form.description,
          status: "Pending",
          userId: user.id
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          params: { userId: user.id }
        });
        this.form.title = '';
        this.form.description = '';
        this.isFormSubmitted = true;
        this.$emit('task-created');
      } catch (error) {
        console.error('Failed to create task', error);
      }
    }
  }
};
</script>
