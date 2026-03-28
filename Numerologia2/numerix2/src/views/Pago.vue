<template>
  <div class="pago-layout fade-in">
    
    <div class="pago-header">
      <router-link to="/planes" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Volver a Planes
      </router-link>
    </div>

    <div class="pago-container">
      
      <!-- Left Column: Summary -->
      <div class="pago-left">
        <h1 class="pago-title">Finaliza tu Alineación</h1>
        <p class="pago-desc">Para acceder a los manuscritos más profundos de las estrellas, realiza tu ofrenda. Tu conexión con la red celestial está cifrada y es sagrada.</p>
        
        <div class="plan-summary-card">
          <div class="summary-header">
            <span class="summary-label">PLAN SELECCIONADO</span>
            <select v-model="selectedCurrency" class="currency-select">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="COP">COP</option>
              <option value="MXN">MXN</option>
            </select>
          </div>
          <div class="summary-price-box">
            <div class="summary-price">
              <span class="summary-price-amount">{{ displayedPrice }}</span>
              <span class="summary-price-period">/ Ciclo Lunar</span>
            </div>
          </div>
          <h2 class="summary-plan-name">{{ planName }}</h2>
          
          <ul class="summary-features">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4" fill="#15161d"></circle></svg>
              Lecturas Celestiales Ilimitadas
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4" fill="#15161d"></circle></svg>
              Análisis Predictivo Prioritario
            </li>
          </ul>
          
          <div class="summary-divider"></div>
          
          <div class="summary-total">
            <span class="summary-total-label">Ofrenda Total</span>
            <span class="summary-total-amount">{{ displayedPrice }}</span>
          </div>
        </div>
        
        <div class="encryption-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          CIFRADO SEGURO DE 256 BITS ACTIVO
        </div>
      </div>
      
      <!-- Right Column: Payment Form -->
      <div class="pago-right">
        <div class="payment-card">
          <h2 class="payment-title">Método de Pago</h2>
          
          <form @submit.prevent="handlePayment">
            <div class="form-group">
              <label class="form-label">NOMBRE EN LA TARJeta</label>
              <input type="text" class="form-input" placeholder="ALEJANDRO CELESTIAL" required>
            </div>
            
            <div class="form-group">
              <label class="form-label">NÚMERO DE TARJETA</label>
              <input type="text" class="form-input" placeholder="0000 0000 0000 0000" maxlength="19" required>
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">FECHA DE EXPIRACIÓN</label>
                <input type="text" class="form-input" placeholder="MM/YY" maxlength="5" required>
              </div>
              <div class="form-group">
                <label class="form-label">CÓDIGO DE SEGURIDAD</label>
                <input type="password" class="form-input" placeholder="***" maxlength="4" required>
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              </div>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isProcessing">
              {{ isProcessing ? 'CONECTANDO...' : 'CONFIRMAR OFRENDA' }}
              <svg v-if="!isProcessing" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </button>
            <p class="terms-text">Al confirmar, aceptas los Términos Universales y la Política de Privacidad Celestial.</p>
          </form>
          
          <div class="payment-brands">
            <div class="brand-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg></div>
            <div class="brand-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg></div>
            <div class="brand-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
            <div class="brand-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg></div>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="gateway-footer">
      <div class="gateway-links">
        <a href="#">PRIVACIDAD</a>
        <a href="#">TÉRMINOS</a>
        <a href="#">CONTACTO</a>
      </div>
      <p class="gateway-copy">© 2024 ANCIENT GEOMETRY. TODOS LOS DERECHOS RESERVADOS.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import '../styles/pago.css';

const route = useRoute();
const router = useRouter();

const planName = ref('Sacerdote Max');
const planPriceUSD = ref(49);
const isProcessing = ref(false);
const selectedCurrency = ref('USD');

const rates = {
  USD: 1,
  EUR: 0.92,
  COP: 3850,
  MXN: 16.5
};

const currencySymbols = {
  USD: '$',
  EUR: '€',
  COP: '$',
  MXN: '$'
};

const displayedPrice = computed(() => {
  const rate = rates[selectedCurrency.value];
  const converted = planPriceUSD.value * rate;
  const symbol = currencySymbols[selectedCurrency.value];
  
  if (selectedCurrency.value === 'COP') {
    return `${symbol} ${converted.toLocaleString('es-CO')}`;
  }
  return `${symbol}${converted.toFixed(2)}`;
});

onMounted(() => {
  if (route.query.plan) {
    planName.value = route.query.plan;
    planPriceUSD.value = Number(route.query.price) || 49;
  }
});

const handlePayment = () => {
  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
    Swal.fire({
      title: '¡Ofrenda Recibida!',
      text: `Se ha confirmado tu aporte de ${displayedPrice.value}. Ya formas parte del colectivo cósmico.`,
      icon: 'success',
      background: '#15161d',
      color: '#ffffff',
      confirmButtonColor: '#dbc065',
      confirmButtonText: 'Acceder al Santuario',
      customClass: {
        popup: 'cosmic-swal'
      }
    }).then(() => {
      router.push('/dashboard');
    });
  }, 2000);
};
</script>
