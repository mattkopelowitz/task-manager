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
  
      <!-- Conditional rendering of task list -->
      <div v-if="!isFormSubmitted">
        <h2>Task List</h2>
        <TaskList />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import TaskList from '@/components/TaskList.vue';
  
  export default {
    components: {
      TaskList
    },
    computed: {
      ...mapState(['user']),
    },
    data() {
      return {
        form: {
          title: '',
          description: ''
        },
        isFormSubmitted: false  // Flag to track form submission status
      };
    },
    methods: {
      async handleSubmit() {
        try {
          await axios.post('http://localhost:8080/api/tasks/createTask', {
            title: this.form.title,
            description: this.form.description,
            status: "Pending",
            user: {
              id: this.user.id
            }
          });
          this.form.description = '';
          this.isFormSubmitted = true; // Set flag to true after successful submission
        } catch (error) {
          console.error('Failed to create task', error);
        }
      }
    }
  };
  </script>
  