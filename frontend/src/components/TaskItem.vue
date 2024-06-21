<template>
  <div v-if="task" class="task-item">
    <div>
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
    </div>
    <div>
      <button @click="deleteTask" class="delete-button">Delete</button>
    </div>
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
    async deleteTask() {
      await axios.delete(`http://localhost:8080/api/tasks/${this.task.id}`);
      this.$emit('task-deleted');
    }
  }
};
</script>
