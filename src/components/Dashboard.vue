<template>
  <div class="dashboard">
    <aside class="sidebar">
      <nav>
        <ul>
          <li><router-link to="/dashboard/check_health">Health Check</router-link></li>
          <li><router-link to="/dashboard/aena_xml">AENA XML</router-link></li>
          <li><router-link to="/dashboard/aena_csv">AENA CSV</router-link></li>
          <li><router-link to="/dashboard/invoices">Facturas</router-link></li>
          <li v-if="isAuthenticated">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  name: 'Dashboard',
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #222;
  color: white;
  padding: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 0.5rem 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}

.content {
  flex: 1;
  padding: 1rem;
}
</style>
