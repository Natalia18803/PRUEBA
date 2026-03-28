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
          <router-link to="/predicciones" class="nav-item active">
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
        
        <div v-if="!showPrediction" class="prediction-form-container fade-in">
          <div class="content-header-lecturas">
            <div class="header-text-block">
              <h1 class="page-title-lecturas">Predicciones Cósmicas</h1>
              <p class="page-desc-lecturas">Alinea tu energía con los astros para recibir una<br/>visión de tu futuro a corto y mediano plazo.</p>
            </div>
          </div>

          <div class="prediction-card">
            <h2 class="section-title italic-serif">Configuración de Canalización</h2>
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 2rem;">Ingresa tus datos terrenales para triangular tu posición exacta en el tejido del destino.</p>
            
            <div class="predicciones-grid">
              <div class="form-group astral-form">
                <label>Tu Nombre Completo</label>
                <input type="text" v-model="formName" class="astral-input" placeholder="Ej. Elias V." />
              </div>
              
              <div class="form-group astral-form">
                <label>Tu Signo Zodiacal</label>
                <select v-model="formSign" class="astral-input">
                  <option v-for="s in signs" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>

              <div class="form-group astral-form" style="grid-column: 1 / -1;">
                <label>Tu Fecha de Nacimiento</label>
                <input type="text" v-model="formDate" class="astral-input" placeholder="Ej. 20-05-2004" />
              </div>
            </div>

            <button class="gold-block-btn mt-6" @click="generatePrediction" :disabled="isGenerating || !formName || !formDate">
              {{ isGenerating ? 'Analizando Constelaciones...' : 'Revelar mi Futuro' }}
            </button>
          </div>
        </div>

        <div v-else class="prediction-result-container fade-in">
          <div class="content-header-lecturas" style="margin-bottom: 2rem;">
            <div class="header-text-block">
              <h1 class="page-title-lecturas">El Velo se ha Levantado</h1>
              <p class="page-desc-lecturas">Lectura proyectada para <strong>{{ formName }}</strong><br/>Signo: {{ formSign }} | Nacimiento: {{ formDate }}</p>
            </div>
            <button class="dark-outline-btn" @click="showPrediction = false" style="height: fit-content; padding: 0.8rem 1.5rem;">
              Nueva Consulta
            </button>
          </div>

          <div class="prediction-reading-card">
            <div class="reading-header-box">
              <div class="astral-icon sun-icon" style="width: 48px; height: 48px; margin-bottom: 1rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              </div>
              <h2 class="italic-serif-bold" style="color: var(--accent-gold); font-size: 2rem; margin-bottom: 0.5rem;">Predicción Real de tu Destino</h2>
              <p style="color: rgba(255,255,255,0.7);">Calculado bajo la vibración {{ lifePathNumber }} de tu fecha astral.</p>
            </div>

            <div class="history-reading" style="margin-top: 2rem;">
              <div class="reading-section">
                <div class="reading-header">
                  <span class="icon-phase">💫</span> <h3 style="color: var(--accent-gold);">Visión a Corto Plazo: Finanzas y Propósito</h3>
                </div>
                <p>{{ predictionData.shortTerm }}</p>
              </div>
              <div class="reading-section">
                <div class="reading-header">
                  <span class="icon-phase">🫀</span> <h3 style="color: var(--accent-gold);">Ciclo Relacional: Vínculos y Amor</h3>
                </div>
                <p>{{ predictionData.love }}</p>
              </div>
              <div class="reading-section">
                <div class="reading-header">
                  <span class="icon-phase">🌌</span> <h3 style="color: var(--accent-gold);">Karma Mayor: Evolución Espiritual</h3>
                </div>
                <p>{{ predictionData.spiritual }}</p>
              </div>
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
import { saveToLibrary } from '../utils/historyManager';

import { useRouter } from 'vue-router';
import { showProfileMenu } from '../utils/userProfile.js';

const router = useRouter();
const userName = ref('Buscador de la Verdad');

const openProfileMenu = () => {
  showProfileMenu(router);
};
const showPrediction = ref(false);
const isGenerating = ref(false);

const formName = ref('');
const formSign = ref('Aries');
const formDate = ref('');
const lifePathNumber = ref(null);

const signs = ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'];

const predictionData = ref({ shortTerm: '', love: '', spiritual: '' });

onMounted(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) {
    userName.value = storedName;
    formName.value = storedName;
  }
});

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

const templates = {
  shortTerm: [
    "La actual conjunción planetaria sugiere que, como {sign}, enfrentarás una decisión importante en tu vida profesional en los próximos 15 días. La influencia de tu número guía {num} indica que si priorizas la honestidad brutal sobre la comodidad, los ingresos fluirán de fuentes inesperadas.",
    "Para aquellos nacidos bajo {sign}, el tránsito rápido de Mercurio augura la llegada de un contrato, acuerdo o mensaje muy esperado. Tu energía base de {num} te permitirá estructurarlo con solidez. Estás a muy pocos pasos de consolidar un gran triunfo material."
  ],
  love: [
    "En el plano afectivo, la resonancia cósmica pide que rompas patrones defensivos. Ya que compartes la vibración {num}, la sinceridad magnética de {sign} atraerá a una persona del pasado para un cierre definitivo, o abrirá la puerta a un nuevo nivel de intimidad con tu pareja.",
    "Los astros te ven brillando, {sign}. Durante la próxima lunación, notarás cómo tu campo electromagnético atrae situaciones y personas muy leales. Aprovecha el poder multiplicador del {num} para ser claro en tus límites y demandas afectivas."
  ],
  spiritual: [
    "A nivel almico, tu esencia {sign} está madurando rápidamente. Un bloqueo pesado o tristeza inexplicable que arrastraste meses atrás está por disolverse, empujado por la fuerte limpieza kármica de tu frecuencia {num}. Tu mayor lección ahora es no resistirte al cambio.",
    "La rueda del Darma está girando a tu favor, {sign}. Tu destino a mediano plazo, dictaminado por los astros y anclado en la vibración del {num}, requerirá que enseñes o compartides tu sabiduría interior. Confía en tu intuición: tus presentimientos recientes son cien por ciento reales y acertados."
  ]
};

const generatePrediction = () => {
  if (!formName.value || !formDate.value) return;
  isGenerating.value = true;
  
  setTimeout(() => {
    lifePathNumber.value = calculateLifePath(formDate.value);
    
    const randomShortTerm = templates.shortTerm[Math.floor(Math.random() * templates.shortTerm.length)];
    const randomLove = templates.love[Math.floor(Math.random() * templates.love.length)];
    const randomSpiritual = templates.spiritual[Math.floor(Math.random() * templates.spiritual.length)];
    
    predictionData.value = {
      shortTerm: randomShortTerm.replace(/{sign}/g, formSign.value).replace(/{num}/g, lifePathNumber.value),
      love: randomLove.replace(/{sign}/g, formSign.value).replace(/{num}/g, lifePathNumber.value),
      spiritual: randomSpiritual.replace(/{sign}/g, formSign.value).replace(/{num}/g, lifePathNumber.value)
    };
    
    // Save to library
    const newPred = {
      id: Date.now(),
      date: new Date().toISOString(),
      title: 'Predicción Personalizada',
      desc: 'Lectura destinal para ' + formName.value,
      category: 'Predicción',
      iconClass: 'purple-bg',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><line x1="2" y1="12" x2="22" y2="12"></line></svg>',
      metaLabel: 'CICLO',
      metaValue: 'Activo',
      metaGold: true
    };
    saveToLibrary(newPred);
    
    isGenerating.value = false;
    showPrediction.value = true;
  }, 2000);
};

</script>

<style src="../styles/dashboard.css"></style>
<style src="../styles/mis-lecturas.css"></style>
<style scoped>
.prediction-form-container, .prediction-result-container {
  max-width: 800px;
  margin: 0 auto;
}

.prediction-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 3rem;
  margin-top: 2rem;
}

.predicciones-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.prediction-reading-card {
  background: linear-gradient(145deg, #181922, #111218);
  border: 1px solid rgba(219, 192, 101, 0.2);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.reading-header-box {
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2rem;
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
