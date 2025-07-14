<template>
  <div class="health-check">
    <h2>Estado del Sistema</h2>

    <div class="status-container">
      <div :class="['status-indicator', { 'is-healthy': isHealthy, 'is-unhealthy': !isHealthy }]">
        {{ isHealthy ? '✓' : '✗' }}
      </div>

      <div class="status-message">
        {{ statusMessage }}
      </div>

      <button @click="checkStatus" :disabled="loading">
        {{ loading ? 'Comprobando...' : 'Comprobar Estado' }}
      </button>
    </div>
  </div>
</template>

<script>
import { healthService } from '@/services/healthService';

export default {
  name: 'HealthCheck',

  data() {
    return {
      isHealthy: false,
      statusMessage: 'No se ha comprobado el estado',
      loading: false
    };
  },

  methods: {
    async checkStatus() {
      this.loading = true;
      try {
        const result = await healthService.checkHealth();
        this.isHealthy = result.status;
        this.statusMessage = result.message;
      } catch (error) {
        this.isHealthy = false;
        this.statusMessage = 'Error al comprobar el estado';
      } finally {
        this.loading = false;
      }
    }
  },

  mounted() {
    this.checkStatus();
  }
};
</script>

<style scoped>
.health-check {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.status-indicator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  transition: all 0.3s ease;
}

.is-healthy {
  background-color: #4caf50;
}

.is-unhealthy {
  background-color: #f44336;
}

.status-message {
  font-size: 1.2rem;
  margin: 1rem 0;
}

button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #1976d2;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>