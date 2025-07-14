<template>
  <div class="partner-form">
    <h2>Buscar facturas por partner y rango de fechas</h2>

    <form @submit.prevent="submitForm" class="inline-form">
      <!-- Select2 integrado -->
      <select id="partner" ref="partnerSelect" required>
        <option disabled value="">-- Selecciona un partner --</option>
        <option
            v-for="partner in partners"
            :key="partner.code"
            :value="partner.code"
        >
          [{{ partner.code }}] {{ partner.name }} | {{ partner.licTradNum }}
        </option>
      </select>

      <input
          type="date"
          id="dateStart"
          v-model="dateStart"
          required
      />

      <input
          type="date"
          id="dateEnd"
          v-model="dateEnd"
          required
      />

      <button type="submit">Buscar</button>
    </form>

    <div v-if="loading" class="loading">Cargando...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="invoices.length" class="invoices">
      <h3>Facturas encontradas:</h3>
      <table>
        <thead>
        <tr>
          <th>ACRISS</th>
          <th>Doc Entry</th>
          <th>Booking ID</th>
          <th>Total</th>
          <th>Pagado</th>
          <th>Pendiente</th>
          <th>Fecha Pickup</th>
          <th>Fecha DropOff</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="invoice in invoices" :key="invoice.docEntry">
          <td>{{ invoice.acrissCode }}</td>
          <td>{{ invoice.docEntry }}</td>
          <td>{{ invoice.bookingId }}</td>
          <td>{{ invoice.docTotal.toFixed(2) }} {{ invoice.currency }}</td>
          <td>{{ invoice.paidToDate.toFixed(2) }} {{ invoice.currency }}</td>
          <td>{{ invoice.pending.toFixed(2) }} {{ invoice.currency }}</td>
          <td>{{ formatDate(invoice.pickUpDate) }}</td>
          <td>{{ formatDate(invoice.dropOffDate) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'select2';
import { invoiceService } from '@/services/invoice';

export default {
  name: 'Invoice',

  data() {
    return {
      partners: [],
      selectedPartnerCode: '',
      dateStart: '',
      dateEnd: '',
      invoices: [],
      loading: false,
      error: null,
    };
  },

  async created() {
    await this.fetchPartners();
  },

  mounted() {
    this.initializeSelect2();
  },

  methods: {
    initializeSelect2() {
      $(this.$refs.partnerSelect)
          .select2({
            placeholder: 'Selecciona un partner',
            width: '100%',
          })
          .on('change', (e) => {
            this.selectedPartnerCode = e.target.value;
          });
    },

    async fetchPartners() {
      this.loading = true;
      this.error = null;

      try {
        this.partners = await invoiceService.getPartners();
      } catch (err) {
        this.error = 'Error al cargar los partners.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async submitForm() {
      this.loading = true;
      this.error = null;

      try {
        console.log(this.selectedPartnerCode, this.dateStart, this.dateEnd);
        this.invoices = await invoiceService.getInvoices(
            this.selectedPartnerCode,
            this.dateStart,
            this.dateEnd
        );
      } catch (err) {
        this.error = 'Error al buscar las facturas.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
  },
};
</script>

<style scoped>
@import '~select2/dist/css/select2.min.css';

.partner-form {
  width: 80%;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.inline-form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto; /* Mantiene la disposición en columnas */
  gap: 10px; /* Espaciado entre los elementos */
  width: 100%; /* Ocupa el 100% del ancho */
  max-width: 800px; /* Limita el ancho máximo del formulario */
  margin: 0 auto; /* Centra horizontalmente el formulario */
  justify-content: center; /* Centra los elementos internamente si sobra espacio */
}

.inline-form select,
.inline-form input[type='date'],
.inline-form button {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.inline-form select {
  width: 100%;
}

.inline-form button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  height: 100%;
}

.inline-form button:hover {
  background-color: #0056b3;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.error {
  color: red;
  text-align: center;
  margin-top: 20px;
}

.invoices {
  margin-top: 20px;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table th,
table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

table th {
  background-color: #f4f4f4;
}

table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
