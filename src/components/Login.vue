<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <input
          v-model="user"
          type="text"
          placeholder="Usuario"
          required
          autocomplete="username"
      />
      <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
          autocomplete="current-password"
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import { authService } from '@/services/loginService';

export default {
  name: 'Login',
  data() {
    return {
      user: '',
      password: '',
      loading: false,
      error: null,
      country_id: 'IC' // hardcoded
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;
      try {
        const result = await authService.login(this.user, this.password, this.country_id);
        if (result.success) {
          // Token ya guardado en localStorage por el servicio
          this.$router.push('/dashboard');
        } else {
          this.error = result.message;
        }
      } catch (e) {
        this.error = 'Error inesperado, inténtalo de nuevo.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1976d2;
}

.error-message {
  color: #f44336;
  margin-top: 1rem;
}
</style>
