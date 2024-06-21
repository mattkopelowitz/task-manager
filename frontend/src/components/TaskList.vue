<template>
  <div class="task-list">
    <h2>Create New Task</h2>
    <TaskForm @task-created="fetchTasks" />
    <h2>Tasks</h2>
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <TaskItem :task="task" @task-updated="fetchTasks" @task-deleted="fetchTasks" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';

export default {
  components: { TaskForm, TaskItem },
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get('http://localhost:8080/api/tasks', {
          params: { userId: user.id }
        });
        this.tasks = response.data;
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    }
  },
  created() {
    this.fetchTasks();
  }
};
</script>
