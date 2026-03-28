<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import api from '../services/api';

const router = useRouter();
const isLoginMode = ref(true);
const isPasswordVisible = ref(false);
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const userBirthDate = ref('');
const isLoggingIn = ref(false);
const todayDate = new Date().toISOString().split('T')[0];

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handleAction = async () => {
  // Verificación básica
  if (isLoginMode.value) {
    if (userEmail.value.trim() === '' || userPassword.value.trim() === '') {
        return Swal.fire({
            title: 'Atención',
            text: 'Ingresa tu identificador y llave cósmica.',
            icon: 'warning',
            background: '#0a0b1e',
            color: '#fff',
            confirmButtonColor: '#dbc065'
        });
    }
  } else {
    if (userEmail.value.trim() === '' || userPassword.value.trim() === '' || userName.value.trim() === '' || !userBirthDate.value) {
        return Swal.fire({
            title: 'Atención',
            text: 'Todos los campos son obligatorios para crear tu identidad.',
            icon: 'warning',
            background: '#0a0b1e',
            color: '#fff',
            confirmButtonColor: '#dbc065'
        });
    }
    if (userBirthDate.value > todayDate) {
        return Swal.fire({
            title: 'Línea de tiempo inválida',
            text: 'La fecha de nacimiento no puede ser futura.',
            icon: 'warning',
            background: '#0a0b1e',
            color: '#fff',
            confirmButtonColor: '#dbc065'
        });
    }
  }

  isLoggingIn.value = true;

  try {
    // 1. Simulación de carga intensa ("Desbloqueando portal/Iniciando manuscrito")
    // Esperar 3 segundos como solicitó el usuario
    const simulationPromise = new Promise(resolve => setTimeout(resolve, 3000));

    // 2. Llamada real a la API (en paralelo o después, pero esperamos los 10s al final)
    let response;
    if (isLoginMode.value) {
      response = await api.post('/api/auth/login', {
        email: userEmail.value,
        password: userPassword.value
      });
    } else {
      response = await api.post('/api/auth/registro', {
        nombre: userName.value,
        email: userEmail.value,
        password: userPassword.value,
        fecha_nacimiento: userBirthDate.value
      });
    }

    // Esperamos a que la simulación termine si la API fue más rápida
    await simulationPromise;

    const { token, usuario } = response.data;
    
    // Guardar sesión real
    localStorage.setItem('token', token);
    localStorage.setItem('userName', usuario.nombre);
    localStorage.setItem('userEmail', usuario.email);
    localStorage.setItem('userRole', usuario.rol);

    isLoggingIn.value = false;

    // Alerta Estética
    await Swal.fire({
      title: isLoginMode.value ? '¡Portal Desbloqueado!' : '¡Manuscrito Iniciado!',
      text: `Bienvenido, ${usuario.nombre}. Las estrellas se alinean para ti.`,
      icon: 'success',
      background: '#0a0b1e',
      color: '#fff',
      confirmButtonColor: '#dbc065',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
        popup: 'cosmic-swal'
      }
    });

    router.push('/dashboard');

  } catch (error) {
    isLoggingIn.value = false;
    const errorMsg = error.response?.data?.error || 'No se pudo conectar con el oráculo celestial. Inténtalo de nuevo.';
    
    Swal.fire({
      title: 'Error de Sincronización',
      text: errorMsg,
      icon: 'error',
      background: '#0a0b1e',
      color: '#fff',
      confirmButtonColor: '#dbc065'
    });
  }
};
</script>

<template>
  <div class="login-page">
    <!-- Fondo Astral -->
    <div class="celestial-bg">
      <div class="stars-container"></div>
    </div>
    <header class="header-branding">
      <h1>AETHERIC ORACLE</h1>
      <p>ACCESO AL MANUSCRITO CELESTIAL</p>
    </header>

    <form class="portal-card" @submit.prevent="handleAction" novalidate>
      <h2 class="portal-title">
        {{ isLoginMode ? 'Identifícate' : 'Crea tu Identidad' }}
      </h2>

      <!-- NOMBRE COMPLETO (Solo en Registro) -->
      <transition name="fade">
        <div class="input-group" v-if="!isLoginMode">
          <div class="label-container">
            <label class="input-label">NOMBRE TERRENAL</label>
          </div>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input 
              type="text" 
              v-model="userName"
              placeholder="Tu nombre completo" 
              class="portal-input"
              required
            />
          </div>
        </div>
      </transition>

      <div class="input-group">
        <div class="label-container">
          <label class="input-label">IDENTIFICADOR CELESTIAL</label>
        </div>
        <div class="input-wrapper">
          <span class="input-icon">✦</span>
          <input 
            type="email" 
            v-model="userEmail"
            placeholder="email@cosmos.com" 
            class="portal-input"
            required
          />
        </div>
      </div>

      <!-- FECHA DE NACIMIENTO (Solo en Registro) -->
      <transition name="fade">
        <div class="input-group" v-if="!isLoginMode">
          <div class="label-container">
            <label class="input-label">MOMENTO DE ENCARNACIÓN</label>
          </div>
          <div class="input-wrapper">
            <span class="input-icon">📅</span>
            <input 
              type="date" 
              v-model="userBirthDate"
              class="portal-input"
              :max="todayDate"
              required
            />
          </div>
        </div>
      </transition>

      <div class="input-group">
        <div class="label-container">
          <label class="input-label">LLAVE CÓSMICA</label>
          <a href="#" class="forgot-link" v-if="isLoginMode">¿OLVIDASTE LA LLAVE?</a>
        </div>
        <div class="input-wrapper">
          <span class="input-icon">🗝️</span>
          <input 
            :type="isPasswordVisible ? 'text' : 'password'" 
            v-model="userPassword"
            placeholder="••••••••" 
            class="portal-input password-input"
            required
          />
          <button 
            type="button" 
            class="visibility-toggle" 
            @click="togglePasswordVisibility"
          >
            {{ isPasswordVisible ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
      </div>

      <button type="submit" class="submit-btn" :disabled="isLoggingIn">
        <template v-if="!isLoggingIn">
          {{ isLoginMode ? 'DESBLOQUEAR PORTAL' : 'INICIAR MANUSCRITO' }}
        </template>
        <template v-else>
          <div class="spinner"></div>
          CANALIZANDO...
        </template>
      </button>

      <button type="button" class="create-btn" @click="toggleMode" :disabled="isLoggingIn">
        {{ isLoginMode ? 'Crear Usuario' : 'Ya tengo cuenta' }}
      </button>

    </form>
  </div>
</template>

<style scoped>
@import '../styles/login.css';
</style>
