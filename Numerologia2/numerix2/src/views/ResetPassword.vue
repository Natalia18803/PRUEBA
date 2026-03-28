<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import api from '../services/api';

const router = useRouter();
const route = useRoute();

const token = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const isPasswordVisible = ref(false);
const isConfirmVisible = ref(false);
const tokenValido = ref(true);

onMounted(() => {
  token.value = route.query.token || '';
  if (!token.value) {
    tokenValido.value = false;
  }
});

const togglePasswordVisibility = () => { isPasswordVisible.value = !isPasswordVisible.value; };
const toggleConfirmVisibility = () => { isConfirmVisible.value = !isConfirmVisible.value; };

const resetearPassword = async () => {
  if (!password.value || !confirmPassword.value) {
    return Swal.fire({
      title: 'Campos vacíos',
      text: 'Completa ambos campos de contraseña.',
      icon: 'warning',
      background: '#0a0b1e',
      color: '#fff',
      confirmButtonColor: '#dbc065'
    });
  }

  if (password.value.length < 6) {
    return Swal.fire({
      title: 'Llave débil',
      text: 'La contraseña debe tener al menos 6 caracteres.',
      icon: 'warning',
      background: '#0a0b1e',
      color: '#fff',
      confirmButtonColor: '#dbc065'
    });
  }

  if (password.value !== confirmPassword.value) {
    return Swal.fire({
      title: 'Las llaves no coinciden',
      text: 'Asegúrate de escribir la misma contraseña en ambos campos.',
      icon: 'error',
      background: '#0a0b1e',
      color: '#fff',
      confirmButtonColor: '#dbc065'
    });
  }

  isLoading.value = true;
  try {
    await api.post('/api/auth/reset-password', {
      token: token.value,
      password: password.value
    });

    await Swal.fire({
      title: '¡Llave Renovada!',
      text: 'Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión.',
      icon: 'success',
      background: '#0a0b1e',
      color: '#fff',
      confirmButtonColor: '#dbc065',
      timer: 3000,
      timerProgressBar: true
    });

    router.push('/login');
  } catch (error) {
    const msg = error.response?.data?.error || 'El enlace expiró o no es válido. Solicita uno nuevo.';
    Swal.fire({
      title: 'Error Cósmico',
      text: msg,
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
      <p>RENOVAR LLAVE CÓSMICA</p>
    </header>

    <!-- Token inválido -->
    <div class="portal-card" v-if="!tokenValido">
      <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
        <h2 class="portal-title" style="color: #e74c3c;">Enlace Inválido</h2>
        <p style="color: #c8c8e0; font-size: 0.95rem; line-height: 1.7; margin: 1rem 0 2rem;">
          Este enlace de recuperación no es válido o ya expiró. Solicita uno nuevo.
        </p>
        <button class="submit-btn" @click="router.push('/forgot-password')">
          Solicitar Nuevo Enlace
        </button>
      </div>
    </div>

    <!-- Formulario de Reset -->
    <form class="portal-card" v-else @submit.prevent="resetearPassword" novalidate>
      <h2 class="portal-title">Nueva Llave Cósmica</h2>
      <p style="color: #8888b0; font-size: 0.9rem; text-align: center; margin-bottom: 2rem;">
        Elige una contraseña segura de al menos 6 caracteres.
      </p>

      <div class="input-group">
        <div class="label-container">
          <label class="input-label">NUEVA LLAVE CÓSMICA</label>
        </div>
        <div class="input-wrapper">
          <span class="input-icon">🗝️</span>
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="password"
            placeholder="••••••••"
            class="portal-input password-input"
            id="new-password"
          />
          <button type="button" class="visibility-toggle" @click="togglePasswordVisibility">
            {{ isPasswordVisible ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
      </div>

      <div class="input-group">
        <div class="label-container">
          <label class="input-label">CONFIRMAR LLAVE</label>
        </div>
        <div class="input-wrapper">
          <span class="input-icon">🔐</span>
          <input
            :type="isConfirmVisible ? 'text' : 'password'"
            v-model="confirmPassword"
            placeholder="••••••••"
            class="portal-input password-input"
            id="confirm-password"
          />
          <button type="button" class="visibility-toggle" @click="toggleConfirmVisibility">
            {{ isConfirmVisible ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
      </div>

      <!-- Indicador de coincidencia -->
      <p v-if="password && confirmPassword" :style="{ color: password === confirmPassword ? '#2ecc71' : '#e74c3c', fontSize: '0.85rem', marginBottom: '1rem' }">
        {{ password === confirmPassword ? '✓ Las llaves coinciden' : '✗ Las llaves no coinciden' }}
      </p>

      <button type="submit" class="submit-btn" :disabled="isLoading" id="btn-reset">
        <template v-if="!isLoading">RENOVAR MI LLAVE CÓSMICA</template>
        <template v-else>
          <div class="spinner"></div>
          RENOVANDO...
        </template>
      </button>
    </form>
  </div>
</template>

<style scoped>
@import '../styles/login.css';
</style>
