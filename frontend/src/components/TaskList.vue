<template>
    <div>
      <h2>Tasks</h2>
      <TaskForm @task-created="fetchTasks" />
      <div v-for="task in tasks" :key="task.id">
        <TaskItem :task="task" @task-updated="fetchTasks" @task-deleted="fetchTasks" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TaskItem from './TaskItem.vue';
  import TaskForm from './TaskForm.vue';
  
  export default {
    components: {  TaskForm, TaskItem },
    data() {
      return {
        tasks: []
      };
    },
    methods: {
      async fetchTasks() {
        const response = await axios.get('http://localhost:8080/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.tasks = response.data;
        console.log(this.tasks)
      }
    },
    created() {
      this.fetchTasks();
    }
  };
  </script>