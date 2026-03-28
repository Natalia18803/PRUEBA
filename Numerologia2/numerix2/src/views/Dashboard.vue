<template>
  <div class="dashboard-layout">
    <!-- Top Navbar -->
    <header class="top-nav">
      <div class="logo">AETHERIC ORACLE</div>
      <div class="nav-actions">
        <button class="icon-btn profile-btn" @click="openProfileMenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </button>
      </div>
    </header>

    <div class="main-body">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>Aetheric Oracle</h2>
          <p>CELESTIALMANUSCRIPT</p>
        </div>
        <nav class="sidebar-nav">
          <a href="#" class="nav-item active">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Página Principal
          </a>
          <router-link to="/lecturas" class="nav-item">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Mis Lecturas
          </router-link>
          <router-link to="/predicciones" class="nav-item">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            Predicciones
          </router-link>
          <router-link to="/biblioteca" class="nav-item">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Biblioteca
          </router-link>
          <!-- Planes Navigation Item -->
          <router-link to="/planes" class="nav-item">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            Planes
          </router-link>
          
          <!-- Admin Panel (Only for admins) -->
          <router-link v-if="userRole === 'admin'" to="/admin" class="nav-item admin-link">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            ARCHIVOS CELESTIALES
          </router-link>
        </nav>
        
        <div class="sidebar-bottom">
          <a href="#" class="nav-item settings">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            AJUSTES
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="content-area">
        <div class="content-wrapper">
          <div class="page-header">
            <p class="alignment-subtitle">ALINEACIÓN ACTUAL: MERCURIO RETRÓGRADO</p>
            <h1 class="page-title">Bienvenido, <span class="italic-gold">{{ userName }}</span></h1>
            <p class="page-description">Tu camino celestial se está revelando. Consulta el manuscrito para navegar las energías cambiantes del próximo ciclo lunar.</p>
          </div>

          <div class="cards-grid top-cards">
            <!-- Lecturas Card -->
            <div class="dashboard-card lecturas-card">
              <div class="card-content">
                <h3 class="card-title">
                  <span class="card-icon">📚</span> Lecturas
                </h3>
                <p class="card-text">Sumérgete en tus tiradas de Tarot personalizadas y alineaciones de Carta Natal. Descubre lo que las cartas tienen para revelar en tu camino actual.</p>
                <div class="card-actions">
                  <button class="primary-btn" @click="goToLecturas">Abrir Manuscrito</button>
                  <button class="secondary-btn" @click="goToLecturas">Historial</button>
                </div>
              </div>
              <div class="card-graphic">
                <svg class="bg-cards-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="20" width="50" height="70" rx="8" transform="rotate(15 55 55)" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                  <rect x="20" y="10" width="50" height="70" rx="8" transform="rotate(-5 45 45)" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
                  <circle cx="45" cy="45" r="8" fill="rgba(255,255,255,0.1)"/>
                </svg>
              </div>
            </div>

            <!-- Ver Futuro Card -->
            <div class="dashboard-card futuro-card">
              <div class="card-content">
                <div class="icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </div>
                <h3 class="card-title">Ver Futuro</h3>
                <p class="card-text">Observa a través del velo cósmico utilizando geometría predictiva avanzada y alineaciones telescópicas.</p>
                <a href="#" class="ascend-link" @click.prevent="goToLecturas">ASCENDER AHORA ➔</a>
              </div>
              <div class="futuro-bg-element"></div>
            </div>
          </div>

          <div class="cards-grid bottom-cards">
            <!-- Predicciones Graphic Card -->
            <div class="dashboard-card predictions-card">
              <div class="card-header">
                <h3 class="card-title"><span class="card-icon">✨</span> Predicciones</h3>
                <span class="badge">FLUJO EN TIEMPO REAL</span>
              </div>
              <div class="resonance-graphic">
                <svg viewBox="0 0 100 100" class="circular-chart">
                  <path class="circle-bg"
                    d="M18 50
                      a 32 32 0 1 1 64 0
                      a 32 32 0 1 1 -64 0"
                  />
                  <path class="circle"
                    stroke-dasharray="200, 200"
                    d="M18 50
                      a 32 32 0 1 1 64 0
                      a 32 32 0 1 1 -64 0"
                  />
                </svg>
                <div class="circle-progress-text">
                  <span class="value">{{ resonancia }}%</span>
                  <span class="label">RESONANCIA</span>
                </div>
              </div>
              <div class="metrics-list">
                <div class="metric-item">
                  <span class="metric-name">Probabilidad de Fase Lunar</span>
                  <span class="metric-value gold">{{ probabilidadLunar }}</span>
                </div>
                <div class="metric-item">
                  <span class="metric-name">Convergencia Estelar</span>
                  <span class="metric-value white">{{ convergencia }}</span>
                </div>
              </div>
            </div>

            <!-- Visiones List Card -->
            <div class="dashboard-card visions-card">
              <div class="card-header">
                <h3 class="card-title">Fragmentos de Visiones Recientes</h3>
                <a href="#" class="view-all" @click.prevent="goToLecturas">VER ARCHIVOS</a>
              </div>
              <div class="vision-list">
                <div class="vision-item active-click" @click="goToLecturas">
                  <div class="vision-image tarot-img"></div>
                  <div class="vision-details">
                    <h4>Tirada de La Suma Sacerdotisa</h4>
                    <p>Visión sobre el conocimiento oculto y la intuición.</p>
                  </div>
                  <div class="vision-time">HACE 2 HORAS</div>
                </div>
                <div class="vision-item active-click" @click="goToLecturas">
                  <div class="vision-image space-img"></div>
                  <div class="vision-details">
                    <h4>Tránsito de Venus</h4>
                    <p>Predicciones de relaciones y armonía actualizadas.</p>
                  </div>
                  <div class="vision-time">AYER</div>
                </div>
                <div class="vision-item active-click" @click="goToLecturas">
                  <div class="vision-image stars-img"></div>
                  <div class="vision-details">
                    <h4>Refinamiento de Carta Natal</h4>
                    <p>Ajuste de precisión para tu lugar de nacimiento.</p>
                  </div>
                  <div class="vision-time">HACE 3 DÍAS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="content-footer">
          <div class="footer-links">
            <a href="#">PRIVACIDAD</a>
            <a href="#">TÉRMINOS</a>
            <a href="#">CONTACTO</a>
          </div>
          <div class="copyright">
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { showProfileMenu } from '../utils/userProfile.js';

const router = useRouter();
const userName = ref('Buscador de la Verdad');
const userRole = ref('');

const openProfileMenu = () => {
  showProfileMenu(router);
};
const resonancia = ref(88);
const probabilidadLunar = ref('Alta');
const convergencia = ref('En Espera');

let intervalId;

const goToLecturas = () => {
  router.push('/lecturas');
};

const simulateRealTime = () => {
  intervalId = setInterval(() => {
    // Generate a new resonance between 75 and 99
    const newVal = Math.floor(Math.random() * 25) + 75;
    resonancia.value = newVal;
    
    // Randomize states
    const estados = ['Alta', 'Media', 'Estable', 'Pico Energético'];
    probabilidadLunar.value = estados[Math.floor(Math.random() * estados.length)];
    
    const conv = ['Alineando', 'En Espera', 'Conectada', 'Resonando'];
    convergencia.value = conv[Math.floor(Math.random() * conv.length)];
  }, 4000);
};

onMounted(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) {
    userName.value = storedName;
  }
  userRole.value = localStorage.getItem('userRole') || 'usuario';
  simulateRealTime();
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style src="../styles/dashboard.css"></style>
