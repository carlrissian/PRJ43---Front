<template>
  <div class="aena-xml">
    <h2>AENA XML</h2>

    <form class="form-row" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="branch">Selecciona Delegacion</label>
        <select v-model="selectedBranch" id="branch" required>
          <option v-for="branch in branchsList" :key="branch.key" :value="branch">
            {{ branch.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="month">Selecciona Mes</label>
        <select v-model="selectedMonth" id="month" required>
          <option v-for="(month, index) in months" :key="index" :value="index + 1">
            {{ month }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="year">Selecciona Año</label>
        <select v-model="selectedYear" id="year" required>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn-submit" :disabled="loading">
        {{ loading ? "Descargando..." : "Enviar" }}
      </button>
    </form>
  </div>
</template>

<script>
import { branchesService } from '@/services/branchesService';
import { xmlService } from '@/services/xmlService';

export default {
  name: 'AenaXML',

  data() {
    return {
      branchsList: [],
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      years: [2020, 2021, 2022, 2023, 2024, 2025],
      selectedBranch: null,
      selectedMonth: null,
      selectedYear: null,
      loading: false, // Nuevo estado para el indicador de carga
    };
  },

  async created() {
    try {
      this.branchsList = await branchesService.getBranches();
    } catch (error) {
      console.error('Error loading branches:', error.message || error);
    }
  },

  methods: {
    async handleSubmit() {
      if (!this.selectedBranch || !this.selectedMonth || !this.selectedYear) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      this.loading = true;

      const branchId = this.selectedBranch.key;
      const branchName = this.selectedBranch.iata;
      const month = this.selectedMonth.toString().padStart(2, '0');
      const year = this.selectedYear;

      try {
        const response = await xmlService.getXML({ branch: branchId,month: month,year: year });
        this.downloadFile(response, branchName, month, year);
        alert('Archivo descargado correctamente.');
      } catch (error) {
        const errorMessage = error.response?.data?.detail || error.message || 'Error desconocido al descargar el archivo.';
        console.error('Error al descargar el archivo XML:', errorMessage);
        alert(`Hubo un error al intentar descargar el archivo: ${errorMessage}`);
      } finally {
        this.loading = false;
      }
    },

    downloadFile(data, name, month, year) {
      const blob = new Blob([data], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}_${month}_${year}.xml`;
      a.click();

      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>
/* Estilo igual que antes */
.aena-xml {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.form-group {
  flex: 1 1 calc(33.33% - 10px);
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #555;
}

select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-submit:hover:enabled {
  background-color: #0056b3;
}
</style>
