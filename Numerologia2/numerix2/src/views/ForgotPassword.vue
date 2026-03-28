<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import api from '../services/api';

const router = useRouter();
const email = ref('');
const isLoading = ref(false);
const enviado = ref(false);

const solicitarRecuperacion = async () => {
  if (!email.value.trim()) {
    return Swal.fire({
      title: 'Campo vacío',
      text: 'Ingresa tu correo para continuar.',
      icon: 'warning',
      background: '#0a0b1e',
      color: '#fff',
      confirmButtonColor: '#dbc065'
    });
  }

  isLoading.value = true;
  try {
    await api.post('/api/auth/forgot-password', { email: email.value });
    enviado.value = true;
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.response?.data?.error || 'No se pudo procesar la solicitud.',
      icon: 'error',
      background: '#0a0b1e',
      color: '#fff',
      confirmButtonColor: '#dbc065'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="celestial-bg">
      <div class="stars-container"></div>
    </div>

    <header class="header-branding">
      <h1>AETHERIC ORACLE</h1>
      <p>RECUPERACIÓN DE LLAVE CÓSMICA</p>
    </header>

    <div class="portal-card">
      <!-- ESTADO: Enviado -->
      <div v-if="enviado" class="text-center">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔑</div>
        <h2 class="portal-title" style="color: #dbc065;">¡Enlace Enviado!</h2>
        <p style="color: #c8c8e0; font-size: 0.95rem; line-height: 1.7; margin: 1rem 0 2rem;">
          Si el correo existe en nuestros registros cósmicos, recibirás un enlace para recuperar tu llave en los próximos minutos. Revisa también tu carpeta de spam.
        </p>
        <button class="submit-btn" @click="router.push('/login')">
          ← Volver al Portal
        </button>
      </div>

      <!-- ESTADO: Formulario -->
      <form v-else @submit.prevent="solicitarRecuperacion" novalidate>
        <h2 class="portal-title">¿Olvidaste tu Llave?</h2>
        <p style="color: #8888b0; font-size: 0.9rem; text-align: center; margin-bottom: 2rem;">
          Ingresa tu correo y te enviaremos un enlace de recuperación que expira en 15 minutos.
        </p>

        <div class="input-group">
          <div class="label-container">
            <label class="input-label">IDENTIFICADOR CELESTIAL</label>
          </div>
          <div class="input-wrapper">
            <span class="input-icon">✦</span>
            <input
              type="email"
              v-model="email"
              placeholder="email@cosmos.com"
              class="portal-input"
              id="forgot-email"
            />
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading" id="btn-recuperar">
          <template v-if="!isLoading">ENVIAR ENLACE DE RECUPERACIÓN</template>
          <template v-else>
            <div class="spinner"></div>
            BUSCANDO EN EL COSMOS...
          </template>
        </button>

        <button type="button" class="create-btn" @click="router.push('/login')">
          ← Volver al Login
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import '../styles/login.css';
</style>
