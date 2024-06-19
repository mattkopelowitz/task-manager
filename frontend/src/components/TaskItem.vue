<template>
    <div>
      <p>{{ task.description }} - {{ task.completed ? 'Completed' : 'Pending' }}</p>
      <button @click="toggleComplete">{{ task.completed ? 'Mark as Pending' : 'Mark as Completed' }}</button>
      <button @click="deleteTask">Delete</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['task'],
    methods: {
      async toggleComplete() {
        await axios.put(`http://localhost:8080/api/tasks/${this.task.id}`, {
          ...this.task,
          completed: !this.task.completed
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.$emit('task-updated');
      },
      async deleteTask() {
        await axios.delete(`http://localhost:8080/api/tasks/${this.task.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.$emit('task-deleted');
      }
    }
  };
  </script>