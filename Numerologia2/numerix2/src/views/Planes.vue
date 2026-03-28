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
          <router-link to="/dashboard" class="nav-item">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Panel de Control
          </router-link>
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
          <router-link to="/planes" class="nav-item active">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            Planes
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
      <main class="content-area-lecturas planes-main-content fade-in">
        
        <div class="planes-hero text-center">
          <h1 class="italic-serif">Define tu <span class="gold-text">Camino Cósmico</span></h1>
          <p class="planes-subtitle">Desbloquea conocimientos profundos y ciclos astrológicos secretos.<br/>Elige el nivel de manuscrito que resuene con tu frecuencia de alma actual.</p>
        </div>

        <div class="pricing-grid">
          
          <!-- Explorador -->
          <div class="pricing-card regular-card">
            <div class="card-top-content">
              <span class="tier-level">PORTAL DE ENTRADA</span>
              <h2 class="tier-name">Explorador Astral</h2>
              <div class="price-block">
                <span class="price">$11</span>
                <span class="duration">/ mes lunar</span>
              </div>
              
              <ul class="features-list">
                <li><span class="gold-star">★</span> <span class="feature-text">Análisis Diario de Tránsitos Planetarios</span></li>
                <li><span class="gold-star">★</span> <span class="feature-text">Sincronización Básica de Chakras (Móvil)</span></li>
                <li><span class="gold-star">★</span> <span class="feature-text">Notificaciones de Fases Lunares y Eclipses</span></li>
              </ul>
            </div>
            
            <button class="plan-btn dark-plan-btn" @click="selectPlan('Explorador Astral', 11)">ACTIVAR INICIACIÓN</button>
          </div>

          <!-- Sacerdote Max -->
          <div class="pricing-card popular-card">
            <div class="popular-badge">MÁS POPULAR</div>
            <div class="card-top-content">
              <span class="tier-level">SANTUARIO INTERIOR</span>
              <h2 class="tier-name">Sacerdote Mayor</h2>
              <div class="price-block">
                <span class="price gold-text">$49</span>
                <span class="duration">/ 12 ciclos lunares</span>
              </div>
              
              <div class="oracle-box">
                <h4 class="oracle-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 7 1-5 5 1.5 7-6.5-3.5L5.5 21 7 14l-5-5 7-1z"></path></svg>
                  SINCRONIZACIÓN ORACULAR
                </h4>
                <p>Algoritmo cuántico activo que recalcula tu destino probabilístico apoyándose en el cosmos vivo.</p>
              </div>

              <ul class="features-list">
                <li><span class="gold-star">★</span> <strong>Consultas Estelares Ilimitadas (Voz y Texto)</strong></li>
                <li><span class="gold-star">★</span> <span class="feature-text">Detección Predictiva de Ciclos Kármicos</span></li>
                <li><span class="gold-star">★</span> <span class="feature-text">Mapeo de Almas Gemelas y Sinastría</span></li>
                <li><span class="gold-star">★</span> <span class="feature-text">Calendario Mágico y Rituales de Manifestación</span></li>
              </ul>
            </div>
            
            <button class="plan-btn gold-plan-btn" @click="selectPlan('Sacerdote Mayor', 49)">CONSOLIDAR DESTINO</button>
          </div>

          <!-- Oráculo Eterno -->
          <div class="pricing-card regular-card">
            <div class="card-top-content">
              <span class="tier-level">MAESTRO ANCESTRAL</span>
              <h2 class="tier-name">Oráculo Eterno</h2>
              <div class="price-block">
                <span class="price">$88</span>
                <span class="duration">/ 12 ciclos lunares</span>
              </div>
              
              <ul class="features-list">
                <li><span class="gold-star">★</span> <span class="feature-text">Todos los privilegios de Sacerdote Mayor</span></li>
                <li><span class="gold-star">★</span> <span class="feature-text">Asesoría Espiritual Personalizada 1-a-1</span></li>
                <li><span class="gold-star">★</span> <span class="feature-text">Manuscrito de Carta Natal Enviado Físicamente</span></li>
                <li><span class="gold-star">★</span> <span class="feature-text">Acceso a la Biblioteca Akáshica Premium</span></li>
              </ul>
            </div>
            
            <button class="plan-btn dark-plan-btn" @click="selectPlan('Oráculo Eterno', 88)">ELEVACIÓN ESPIRITUAL</button>
          </div>

        </div>

        <div class="planes-bottom-box">
          <div class="bottom-box-text">
            <h3 class="italic-serif gold-text">'Como es arriba, es abajo.'</h3>
            <p>Cada nivel de suscripción contribuye a la Gran Alineación. Nuestros algoritmos están sintonizados con los movimientos de los cuerpos celestes, asegurando que tu manuscrito digital evolucione con tu viaje personal.</p>
            <div class="stats-row">
              <div class="stat">
                <span class="stat-num gold-text">12k+</span>
                <span class="stat-label">BUSCADORES ACTIVOS</span>
              </div>
              <div class="stat">
                <span class="stat-num gold-text">99%</span>
                <span class="stat-label">PRECISIÓN</span>
              </div>
            </div>
          </div>
          <div class="bottom-box-graphic">
            <div class="radar-circle">
              <div class="radar-line-h"></div>
              <div class="radar-line-v"></div>
              <div class="radar-ring r1"></div>
              <div class="radar-ring r2"></div>
              <div class="radar-ring r3"></div>
              <div class="radar-dot"></div>
              <div class="radar-dot d2"></div>
            </div>
          </div>
        </div>
        
        <footer class="legal-footer">
          <div class="footer-links">
            <a href="#">PRIVACIDAD</a>
            <a href="#">TÉRMINOS</a>
            <a href="#">CONTACTO</a>
          </div>
          <p>© 2024 ANCIENT GEOMETRY. TODOS LOS DERECHOS RESERVADOS.</p>
          <div class="social-circles">
            <div class="circle-icon"></div>
            <div class="circle-icon"></div>
            <div class="circle-icon"></div>
          </div>
        </footer>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { showProfileMenu } from '../utils/userProfile.js';

const userName = ref('Buscador de la Verdad');
const router = useRouter();

const openProfileMenu = () => {
  showProfileMenu(router);
};

onMounted(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) {
    userName.value = storedName;
  }
});

const selectPlan = (plan, price) => {
  router.push({ path: '/pago', query: { plan, price } });
};
</script>

<style src="../styles/dashboard.css"></style>
<style src="../styles/planes.css"></style>
