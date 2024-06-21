<template>
  <div v-if="task">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <button @click="toggleComplete">Mark as Completed</button>
    <button @click="deleteTask">Delete</button>
  </div>
  <div v-else>
    <p>All tasks completed</p>
  </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
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
        await axios.delete(`http://localhost:8080/api/tasks/${this.task.id}`);
        this.$emit('task-deleted');
      }
    }
  };
  </script>