<template>
  <div class="kt-grid kt-grid--ver kt-grid--root kt-page" id="app">
    <div class="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v3 kt-login--signin" id="kt_login">
      <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
           :style="backgroundStyle">
        <div class="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
          <div class="kt-login__container">
            <div class="kt-login__logo">
              <a href="/">
                <img :src="logoSrc" alt="Logo"/>
              </a>
            </div>
            <div class="kt-login__signin">
              <div class="kt-login__head">
                <h3 class="kt-login__title">Log in to your account</h3>
              </div>
              <form class="kt-form" id="login-form" @submit.prevent="submit" method="POST" action="/login">
                <div class="input-group">
                  <input v-model="username" id="username" type="text" class="form-control"
                         placeholder="Nombre de usuario" required autofocus/>
                </div>
                <div class="input-group">
                  <input v-model="password" id="password" type="password" class="form-control"
                         placeholder="Contraseña" required/>
                </div>
                <div class="input-group">
                  <select class="form-control" v-model="country" required>
                    <option disabled value="">Select an option</option>
                    <option v-for="c in countryList" :key="c.iso" :value="c.iso">{{ c.name }}</option>
                  </select>
                </div>
                <div class="kt-login__actions">
                  <button type="submit" class="btn btn-brand btn-elevate kt-login__btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      country: '',
      countryList: [
        { iso: 'GR', name: 'GREECE' },
        { iso: 'IT', name: 'ITALY' },
        { iso: 'PT', name: 'PORTUGAL' },
        { iso: 'ES', name: 'SPAIN' },
        { iso: 'IC', name: 'CANARY ISLANDS' }
      ]
    };
  },
  computed: {
    backgroundStyle() {
      return { backgroundImage: "url('/img/fondo_login-dev.jpg')" };
    },
    logoSrc() {
      return '/img/logoMosy-dev.png';
    }
  },
  methods: {
    submit() {
      this.$el.querySelector('#login-form').submit();
    }
  }
};
</script>

<style scoped>
/* Styles are in app.css */
</style>
