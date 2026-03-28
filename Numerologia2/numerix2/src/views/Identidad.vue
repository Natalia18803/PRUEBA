<template>
  <div class="celestial-bg">
    <div class="stars-container pulsate"></div>
    <div class="shooting-stars">
      <span class="shooting-star"></span>
      <span class="shooting-star"></span>
      <span class="shooting-star"></span>
      <span class="shooting-star"></span>
      <span class="shooting-star"></span>
    </div>
  </div>
  
  <main class="identidad-container">


    <div class="hero-section">
      <h2 class="subtitle-ethereal">ORÁCULO ETÉREO</h2>
      <h1 class="main-title">
        Tu Destino <span class="italic">Aguarda</span> Revelación
      </h1>

      <button class="cta-button" @click="goToLogin">
        ELIGE TU CAMINO 
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>

      <p class="description-text">
        Cruza el velo celestial. Alinea tu conciencia con la geometría antigua de las estrellas y descifra el manuscrito de tu existencia.
      </p>
    </div>



    <footer class="footer">
      <div class="footer-links">
        <span>PRIVACIDAD</span>
        <span>TÉRMINOS</span>
        <span>CONTACTO</span>
      </div>
      <div class="copyright">
      </div>
    </footer>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(() => {
  if (localStorage.getItem('userName')) {
    router.push('/dashboard');
  }
});

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
@import '../styles/identidad.css';
</style>
