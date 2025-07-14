<template>
  <button v-if="isLoggedIn" @click="handleLogout">Cerrar sesión</button>
</template>

<script>
import { authService } from '@/services/loginService';

export default {
  name: 'LogoutButton',
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
    handleLogout() {
      authService.logout();
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d32f2f;
}
</style>
