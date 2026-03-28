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
          <router-link to="/lecturas" class="nav-item active">
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
          <router-link to="/planes" class="nav-item">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            Planes
          </router-link>

          <!-- Admin Panel (Only for admins) -->
          <router-link v-if="userRole === 'admin'" to="/admin" class="nav-item">
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
      <main class="content-area-lecturas">
        <div class="content-header-lecturas">
          <div class="header-text-block">
            <h1 class="page-title-lecturas">Mis Lecturas</h1>
            <p class="page-desc-lecturas">Explora la sabiduría de los astros y el tarot grabada en tu<br>camino personal.</p>
          </div>
          <button class="gold-action-btn" @click="drawNewReading" :disabled="isReading">
            <span class="sparkle-icon">✨</span> {{ isReading ? 'Consultando...' : 'Iniciar Nueva Lectura' }}
          </button>
        </div>

        <!-- Section 1: Tiradas Recientes -->
        <section class="lecturas-section">
          <div class="section-header">
            <h2 class="section-title italic-serif">Tiradas Recientes</h2>
          </div>
          
          <div class="tiradas-grid">
            <!-- Card 1 -->
            <div class="tirada-card large-card" :style="isReading ? 'opacity: 0.5' : ''">
              <div class="card-image-left woman-img"></div>
              <div class="card-info-right">
                <span class="card-badge gold">{{ currentCard.badge }}</span>
                <h3 class="card-main-title">{{ currentCard.title }}</h3>
                <p class="card-desc">{{ currentCard.desc }}</p>
              </div>
            </div>
            
            <!-- Card 2 -->
            <div class="tirada-card compact-card" @click="openRevisarModal" style="cursor: pointer;">
              <div class="card-internal-header">
                <span class="card-date-badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> AYER</span>
              </div>
              <h3 class="card-sub-title">Pasado, Presente y<br>Futuro</h3>
              <div class="tarot-spread-images">
                <div class="tarot-card-mini img-1"></div>
                <div class="tarot-card-mini img-2"></div>
                <div class="tarot-card-mini img-3"></div>
              </div>
              <button class="dark-outline-btn" @click.stop="openRevisarModal">REVISAR</button>
            </div>
          </div>
        </section>

        <!-- Section 2: Tu Mapa Astral -->
        <section class="lecturas-section map-section">
          <h2 class="section-title italic-serif">Tu Mapa Astral</h2>
          
          <div class="mapa-astral-container" :style="isReading ? 'opacity: 0.5; transition: opacity 0.5s' : 'transition: opacity 0.5s'">
            <div class="mapa-details">
              
              <div class="astral-item">
                <div class="astral-icon sun-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                </div>
                <div class="astral-text">
                  <h4>Sol en {{ currentAstral.sun.sign }}</h4>
                  <p>{{ currentAstral.sun.desc }}</p>
                </div>
              </div>
              
              <div class="astral-item">
                <div class="astral-icon moon-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </div>
                <div class="astral-text">
                  <h4>Luna en {{ currentAstral.moon.sign }}</h4>
                  <p>{{ currentAstral.moon.desc }}</p>
                </div>
              </div>
              
              <div class="astral-item">
                <div class="astral-icon asc-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
                <div class="astral-text">
                  <h4>Ascendente {{ currentAstral.asc.sign }}</h4>
                  <p>{{ currentAstral.asc.desc }}</p>
                </div>
              </div>
              
            </div>
            
            <div class="mapa-graphic">
              <div class="circular-zodiac-graphic lion-bg">
                <div class="floating-badge badge-top">{{ currentAstral.badge1 }}</div>
                <div class="floating-badge badge-left">{{ currentAstral.badge2 }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 3: Historial de Sabiduría -->
        <section class="lecturas-section history-section">
          <div class="history-header">
            <h2 class="section-title italic-serif-bold">Historial de Sabiduría</h2>
            <div class="history-filters">
              <button class="filter-btn" :class="activeFilter === 'Todos' ? 'gold-bg' : 'transparent-bg'" @click="activeFilter = 'Todos'">Todos</button>
              <button class="filter-btn" :class="activeFilter === 'Tarot' ? 'gold-bg' : 'transparent-bg'" @click="activeFilter = 'Tarot'">Tarot</button>
              <button class="filter-btn" :class="activeFilter === 'Carta Natal' ? 'gold-bg' : 'transparent-bg'" @click="activeFilter = 'Carta Natal'">Carta Natal</button>
              <button class="filter-btn" :class="activeFilter === 'Numerología' ? 'gold-bg' : 'transparent-bg'" @click="activeFilter = 'Numerología'">Numerología</button>
            </div>
          </div>
          
          <div class="history-list">
            <div class="history-row" v-for="item in filteredHistory" :key="item.id" @click="openHistoryDetails(item)" style="cursor: pointer; transition: transform 0.2s">
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
            
            <div v-if="filteredHistory.length === 0" style="padding: 2rem; text-align: center; color: rgba(255,255,255,0.5);">
              Los astros no registran lecturas de este tipo aún.
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="lecturas-footer">
          <p class="copyright"></p>
          <p class="tagline">Guiado por las estrellas, interpretado por el alma.</p>
        </footer>
      </main>
    </div>

    <!-- REVISAR MODAL -->
    <div v-if="showRevisarModal" class="modal-overlay" @click.self="closeRevisarModal">
      <div class="modal-content">
        <button class="close-modal-btn" @click="closeRevisarModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div v-if="revisarStep === 1" class="modal-step-fade">
          <h2 class="modal-title italic-serif">Conexión Astral</h2>
          <p class="modal-desc">Para canalizar la historia de tu Pasado, Presente y Futuro, necesitamos afinar tu resonancia cósmica.</p>
          
          <div class="form-group astral-form">
            <label>Tu Signo Zodiacal</label>
            <select v-model="selectedSign" class="astral-input">
              <option v-for="s in signs" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          
          <div class="form-group astral-form">
            <label>Fecha de Nacimiento</label>
            <input type="text" v-model="birthNumber" class="astral-input" placeholder="Ej. 20-05-2004" />
          </div>
          
          <button class="gold-block-btn mt-6" @click="generateHistory" :disabled="isGeneratingHistory || !birthNumber">
            {{ isGeneratingHistory ? 'Canalizando el flujo del tiempo...' : 'Revelar mi Historia' }}
          </button>
        </div>
        
        <div v-else-if="revisarStep === 2" class="modal-step-fade">
          <h2 class="modal-title italic-serif">Tu Lectura en el Tiempo</h2>
          <p class="modal-subtitle">Lectura proyectada para {{ userName }} ({{ selectedSign }}, Nacimiento: {{ birthNumber }})</p>
          
          <div class="history-reading">
            <div class="reading-section">
              <div class="reading-header">
                <span class="icon-phase">🌒</span> <h3>El Pasado</h3>
              </div>
              <p>{{ readingResult.past }}</p>
            </div>
            <div class="reading-section">
              <div class="reading-header">
                <span class="icon-phase">🌕</span> <h3>El Presente</h3>
              </div>
              <p>{{ readingResult.present }}</p>
            </div>
            <div class="reading-section">
              <div class="reading-header">
                <span class="icon-phase">🌘</span> <h3>El Futuro</h3>
              </div>
              <p>{{ readingResult.future }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- HISTORY DETAILS MODAL -->
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
              
              <p v-if="selectedHistoryItem.category === 'Tarot'">Las cartas arrojaron un diseño profundo centrado en la sabiduría interna. El elemento predominante te instó a la acción rápida y decisiva durante este período. Recuerda que la fuerza de voluntad fue tu mayor aliada.</p>
              
              <p v-else-if="selectedHistoryItem.category === 'Numerología'">La sumatoria de tus frecuencias en esta fecha apuntó fuertemente a una resolución de ciclos kármicos importantes. El universo te exigió introspección, soledad meditativa y búsqueda espiritual profunda.</p>
              
              <p v-else>El tránsito de los astros reveló una configuración altamente activa y dinámica. La posición predominante de signos forzó cambios estructurales en tu rutina y propósito de vida, iluminando tu mapa de oportunidades inesperadas.</p>
            </div>
          </div>
          
          <button class="gold-action-btn" style="margin-top: 2rem; width: 100%; display: flex; justify-content: center; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);" @click="closeHistoryDetails">
            COMPRENDIDO
          </button>
          
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getLibrary, saveToLibrary } from '../utils/historyManager';

const isReading = ref(false);
const showRevisarModal = ref(false);
const showHistoryModal = ref(false);
const revisarStep = ref(1);
const selectedSign = ref('Aries');
const birthNumber = ref('');
const isGeneratingHistory = ref(false);
const readingResult = ref({ past: '', present: '', future: '' });
import { useRouter } from 'vue-router';
import { showProfileMenu } from '../utils/userProfile.js';

const router = useRouter();
const userName = ref('Buscador de la Verdad');
const userRole = ref('');

const openProfileMenu = () => {
  showProfileMenu(router);
};
const activeFilter = ref('Todos');
const selectedHistoryItem = ref(null);

const openHistoryDetails = (item) => {
  selectedHistoryItem.value = item;
  showHistoryModal.value = true;
};

const closeHistoryDetails = () => {
  showHistoryModal.value = false;
  selectedHistoryItem.value = null;
};

const historyItems = ref(getLibrary());

const filteredHistory = computed(() => {
  if (activeFilter.value === 'Todos') return historyItems.value;
  return historyItems.value.filter(item => item.category === activeFilter.value);
});

const signs = ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'];

const pastTemplates = [
  "Las influencias cósmicas muestran que tu energía en {sign} atrajo lecciones kármicas profundas. Guiado por la vibración del número {num}, superaste bloqueos que te mantenían estancado.",
  "En ciclos anteriores, tu esencia de {sign} se enfocó en construir cimientos sólidos. La resonancia del {num} trajo consigo desafíos que fortalecieron tu espíritu."
];
const presentTemplates = [
  "Actualmente, la conjunción astral favorece tu naturaleza {sign}. Estás en un punto de inflexión donde el número maestro {num} te impulsa a tomar el control de tu destino.",
  "Sientes una tensión creativa porque las estrellas están alineando las características de {sign} con el poder constructivo del {num}, preparándote para un gran despertar."
];
const futureTemplates = [
  "El velo del cosmos revela que se abrirán puertas de abundancia. La fuerza magnética de {sign} junto al destino numérico del {num} te llevarán a una resolución pacífica y triunfal.",
  "Las constelaciones indican que alcanzarás la cumbre de tus metas. El aprendizaje profundo de {sign} se materializará de forma inesperada bajo la influencia directa del {num}."
];

onMounted(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) {
    userName.value = storedName;
  }
  userRole.value = localStorage.getItem('userRole') || 'usuario';
});

const openRevisarModal = () => {
  showRevisarModal.value = true;
  revisarStep.value = 1;
  birthNumber.value = '';
};

const closeRevisarModal = () => {
  showRevisarModal.value = false;
};

const calculateLifePath = (dateString) => {
  const digits = dateString.replace(/\D/g, '');
  if (!digits) return 7;
  let sum = 0;
  for (let char of digits) sum += parseInt(char);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    let temp = 0;
    const sumStr = sum.toString();
    for (let char of sumStr) temp += parseInt(char);
    sum = temp;
  }
  return sum;
};

const currentAstral = ref({
  sun: { sign: 'Escorpio', desc: 'Tu esencia es profunda, transformadora y apasionada. Buscas la verdad detrás de las sombras.' },
  moon: { sign: 'Piscis', desc: 'Tu mundo emocional es infinito y empático. Eres un canal para la intuición pura.' },
  asc: { sign: 'Leo', desc: 'Proyectas una presencia magnética y creativa. El mundo te ve como una fuente de luz.' },
  badge1: 'MARTE 14° CAP',
  badge2: 'VENUS 22° LIB'
});

const sunSigns = [
  { sign: 'Escorpio', desc: 'Tu esencia es profunda, transformadora y apasionada. Buscas la verdad detrás de las sombras.' },
  { sign: 'Aries', desc: 'Tu energía es pionera e impulsiva. Lideras con valor y siempre buscas nuevos comienzos.' },
  { sign: 'Tauro', desc: 'Buscas la estabilidad y disfrutas de los placeres sensoriales. Eres un pilar de fuerza.' },
  { sign: 'Géminis', desc: 'Tu mente es rápida y curiosa. Te adaptas a cualquier situación a través de la comunicación.'}
];

const moonSigns = [
  { sign: 'Piscis', desc: 'Tu mundo emocional es infinito y empático. Eres un canal para la intuición pura.' },
  { sign: 'Cáncer', desc: 'Tus emociones son tu brújula. Proteges a los tuyos con una empatía maternal.' },
  { sign: 'Acuario', desc: 'Procesas tus emociones de forma desapegada y muy intelectual. Buscas el bien colectivo.' },
  { sign: 'Sagitario', desc: 'Necesitas libertad emocional. Encuentras consuelo en la filosofía y los viajes mentales.'}
];

const ascSigns = [
  { sign: 'Leo', desc: 'Proyectas una presencia magnética y creativa. El mundo te ve como una fuente de luz.' },
  { sign: 'Virgo', desc: 'Te presentas al mundo con un enfoque analítico y servicial. Los detalles no se te escapan.' },
  { sign: 'Libra', desc: 'Irradias encanto y equilibrio. Tu carta de presentación es siempre la armonía y la belleza.' },
  { sign: 'Capricornio', desc: 'Te muestras serio, disciplinado y ambicioso. Inspiras gran respeto a primera vista.' }
];

const planets = ['MARTE', 'VENUS', 'JÚPITER', 'SATURNO', 'URANO', 'NEPTUNO', 'PLUTÓN', 'MERCURIO'];
const zods = ['ARI', 'TAU', 'GEM', 'CAN', 'LEO', 'VIR', 'LIB', 'ESC', 'SAG', 'CAP', 'ACU', 'PIS'];

const generateHistory = () => {
  if (!birthNumber.value) return;
  isGeneratingHistory.value = true;
  
  setTimeout(() => {
    const past = pastTemplates[Math.floor(Math.random() * pastTemplates.length)];
    const present = presentTemplates[Math.floor(Math.random() * presentTemplates.length)];
    const future = futureTemplates[Math.floor(Math.random() * futureTemplates.length)];
    
    const rootNum = calculateLifePath(birthNumber.value);
    
    readingResult.value = {
      past: past.replace(/{sign}/g, selectedSign.value).replace(/{num}/g, rootNum),
      present: present.replace(/{sign}/g, selectedSign.value).replace(/{num}/g, rootNum),
      future: future.replace(/{sign}/g, selectedSign.value).replace(/{num}/g, rootNum)
    };
    
    isGeneratingHistory.value = false;
    revisarStep.value = 2;
    
    // Save to library
    const newHistoryReading = {
      id: Date.now(),
      date: new Date().toISOString(),
      title: 'Lectura de Destino',
      desc: 'Historia Personalizada (' + selectedSign.value + ')',
      category: 'Numerología',
      iconClass: 'purple-bg',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
      metaLabel: 'NÚMERO GUÍA',
      metaValue: rootNum.toString(),
      metaGold: false
    };
    saveToLibrary(newHistoryReading);
    historyItems.value = getLibrary();
  }, 1500);
};

const currentCard = ref({
  title: 'La Estrella',
  desc: 'Hoy los astros te invitan a la renovación y la esperanza. Tus sueños están alineados con la energía cósmica actual. Es momento de confiar en tu intuición más pura.',
  badge: 'CARTA DEL DÍA'
});

const cards = [
  { title: 'El Sol', desc: 'El éxito y la vitalidad te acompañan. Es un momento excelente para expresarte y disfrutar de los frutos de tu esfuerzo.', badge: 'NUEVA LECTURA' },
  { title: 'El Mundo', desc: 'Un ciclo importante se completa. Has alcanzado una meta espiritual y estás listo para un nuevo comienzo lleno de posibilidades.', badge: 'LECTURA ESPECIAL' },
  { title: 'El Mago', desc: 'Tienes todas las herramientas necesarias a tu disposición. Es el momento de tomar acción y manifestar tus intenciones en la realidad.', badge: 'VISIÓN ACTIVA' },
  { title: 'La Emperatriz', desc: 'La abundancia y la creatividad fluyen hacia ti. Conecta con la naturaleza y nutre tus proyectos con amor y paciencia.', badge: 'REVELACIÓN' },
  { title: 'La Rueda de la Fortuna', desc: 'Los ciclos cambian a tu favor. Estate preparado para cambios positivos sorpresivos y nuevas oportunidades.', badge: 'DESTINO' }
];

const drawNewReading = () => {
  if (isReading.value) return;
  isReading.value = true;
  
  setTimeout(() => {
    // Generate new tarot card
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    currentCard.value = randomCard;
    
    // Generate new astral map
    currentAstral.value = {
      sun: sunSigns[Math.floor(Math.random() * sunSigns.length)],
      moon: moonSigns[Math.floor(Math.random() * moonSigns.length)],
      asc: ascSigns[Math.floor(Math.random() * ascSigns.length)],
      badge1: `${planets[Math.floor(Math.random() * planets.length)]} ${Math.floor(Math.random() * 30)}° ${zods[Math.floor(Math.random() * zods.length)]}`,
      badge2: `${planets[Math.floor(Math.random() * planets.length)]} ${Math.floor(Math.random() * 30)}° ${zods[Math.floor(Math.random() * zods.length)]}`
    };
    
    // Save to library
    const newCardReading = {
      id: Date.now(),
      date: new Date().toISOString(),
      title: currentCard.value.title,
      desc: 'Tirada de Tarot: ' + currentCard.value.desc.substring(0, 30) + '...',
      category: 'Tarot',
      iconClass: 'gold-bg-icon',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="2" width="18" height="20" rx="2" ry="2"></rect><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
      metaLabel: 'ARCANO',
      metaValue: currentCard.value.badge,
      metaGold: true
    };
    saveToLibrary(newCardReading);
    historyItems.value = getLibrary();
    
    isReading.value = false;
  }, 1500);
};
</script>

<style src="../styles/dashboard.css"></style>
<style src="../styles/mis-lecturas.css"></style>
