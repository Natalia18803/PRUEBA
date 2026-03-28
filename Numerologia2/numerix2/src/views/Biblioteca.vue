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
          <router-link to="/biblioteca" class="nav-item active">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Biblioteca
          </router-link>
          <router-link to="/planes" class="nav-item">
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
      <main class="content-area-lecturas">
        
        <div class="content-header-lecturas" style="margin-bottom: 3rem;">
          <div class="header-text-block">
            <h1 class="page-title-lecturas">Biblioteca del Alma</h1>
            <p class="page-desc-lecturas">Registro cronológico de todas tus lecturas pasadas, canalizaciones y conexiones estelares.</p>
          </div>
        </div>

        <div class="timeline-container fade-in">
          <div v-for="(group, gIdx) in userLibrary" :key="gIdx" class="timeline-group">
            <h3 class="timeline-month italic-serif">{{ group.month }}</h3>
            
            <div class="history-list">
              <div class="history-row" v-for="item in group.items" :key="item.id" @click="openHistoryDetails(item)">
                <div class="row-icon" :class="item.iconClass" v-html="item.icon"></div>
                <div class="row-info">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.desc }}</p>
                </div>
                <div class="row-meta">
                  <span class="meta-label" :class="{ 'gold-text': item.metaGold }">{{ item.metaLabel }}</span>
                  <span class="meta-value">{{ item.metaValue }}</span>
                </div>
                <button class="row-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- HISTORY DETAILS MODAL (Reused from MisLecturas) -->
        <div v-if="showHistoryModal" class="modal-overlay" @click.self="closeHistoryDetails">
          <div class="modal-content">
            <button class="close-modal-btn" @click="closeHistoryDetails">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="modal-step-fade" v-if="selectedHistoryItem">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                 <div class="row-icon" :class="selectedHistoryItem.iconClass" v-html="selectedHistoryItem.icon"></div>
                 <h2 class="modal-title italic-serif" style="margin-bottom: 0;">{{ selectedHistoryItem.title }}</h2>
              </div>
              <p class="modal-subtitle" style="text-align: left; margin-bottom: 2rem;">{{ selectedHistoryItem.desc }}</p>
              <div class="history-reading">
                <div class="reading-section">
                  <div style="margin-bottom: 1.5rem; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
                     <span class="meta-label" :class="{ 'gold-text': selectedHistoryItem.metaGold }">{{ selectedHistoryItem.metaLabel }}:</span>
                     <span style="color: white; font-weight: bold; margin-left: 0.5rem; font-size: 1.2rem;">{{ selectedHistoryItem.metaValue }}</span>
                  </div>
                  <p>Archivos cósmicos sellados para la lectura de <strong>{{ selectedHistoryItem.title }}</strong> almacenada con éxito en el compendio astral.</p>
                </div>
              </div>
              <button class="gold-action-btn" style="margin-top: 2rem; width: 100%; display: justify-content; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);" @click="closeHistoryDetails">
                COMPRENDIDO
              </button>
            </div>
          </div>
        </div>

        <footer class="lecturas-footer" style="margin-top: 4rem;">
          <p class="copyright"></p>
          <p class="tagline">Guiado por las estrellas, interpretado por el alma.</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLibrary, formatLibraryByMonth } from '../utils/historyManager';

import { useRouter } from 'vue-router';
import { showProfileMenu } from '../utils/userProfile.js';

const router = useRouter();
const userName = ref('Buscador de la Verdad');

const openProfileMenu = () => {
  showProfileMenu(router);
};
const showHistoryModal = ref(false);
const selectedHistoryItem = ref(null);

onMounted(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) {
    userName.value = storedName;
  }
});

const userLibrary = ref(formatLibraryByMonth(getLibrary()));

const openHistoryDetails = (item) => {
  selectedHistoryItem.value = item;
  showHistoryModal.value = true;
};
const closeHistoryDetails = () => {
  showHistoryModal.value = false;
  selectedHistoryItem.value = null;
};
</script>

<style src="../styles/dashboard.css"></style>
<style src="../styles/mis-lecturas.css"></style>
<style scoped>
.timeline-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.timeline-month {
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 0.5rem;
}

.history-row {
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.history-row:hover {
  transform: translateX(5px);
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
