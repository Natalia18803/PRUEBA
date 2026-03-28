<template>
  <div class="dashboard-layout">
    <!-- Top Navbar -->
    <header class="top-nav">
      <div class="logo">AETHERIC ORACLE - ADMIN</div>
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
          <h2>Celestial Archives</h2>
          <p>ADMINISTRATIVE PANEL</p>
        </div>
        <nav class="sidebar-nav">
          <router-link to="/dashboard" class="nav-item">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Volver al Portal
          </router-link>
          <a href="#" class="nav-item active">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            Gestión Central
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="content-area">
        <div class="admin-container">
          <div class="admin-header">
            <h1 class="admin-title">Panel de Control Celestial</h1>
            <div class="search-bar">
              <input type="text" v-model="searchQuery" placeholder="Buscar buscador..." class="search-input" />
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-value">{{ filteredUsers.length }}</span>
              <span class="stat-label">Buscadores Totales</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">${{ totalRevenue }}</span>
              <span class="stat-label">Ofrendas Totales (Ingresos)</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ activeSubscriptionsCount }}</span>
              <span class="stat-label">Suscripciones Activas</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ recentReadingsCount }}</span>
              <span class="stat-label">Lecturas Generadas</span>
            </div>
          </div>

          <!-- Tabs -->
          <div class="admin-tabs">
            <button class="tab-btn" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">Buscadores</button>
            <button class="tab-btn" :class="{ active: activeTab === 'payments' }" @click="activeTab = 'payments'">Pagos e Ingresos</button>
            <button class="tab-btn" :class="{ active: activeTab === 'readings' }" @click="activeTab = 'readings'">Registros de Lecturas</button>
            <button class="tab-btn" :class="{ active: activeTab === 'addAdmin' }" @click="activeTab = 'addAdmin'">Agregar Admin</button>
          </div>

          <!-- Tab: Users -->
          <div v-if="activeTab === 'users'" class="cosmic-table-container">
            <table class="cosmic-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Suscripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user._id">
                  <td>{{ user.nombre }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.rol }}</td>
                  <td>
                    <span :class="['status-badge', user.isSubscribed ? 'status-active' : 'status-inactive']">
                      {{ user.isSubscribed ? 'Activa' : 'Sin Suscripción' }}
                    </span>
                  </td>
                  <td>
                    <span :class="['status-badge', user.estado === 'activo' ? 'status-active' : 'status-inactive']">
                      {{ user.estado }}
                    </span>
                  </td>
                  <td class="action-btns">
                    <button class="admin-action-btn" @click="toggleUserStatus(user)" title="Cambiar Estado">
                      🔄
                    </button>
                    <button class="admin-action-btn" @click="promoteToAdmin(user)" v-if="user.rol !== 'admin'" title="Hacer Admin">
                      👑
                    </button>
                    <button class="admin-action-btn btn-danger" @click="deleteUser(user)" title="Eliminar">
                      🗑️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Tab: Payments -->
          <div v-if="activeTab === 'payments'" class="cosmic-table-container">
             <table class="cosmic-table">
              <thead>
                <tr>
                  <th>ID Usuario</th>
                  <th>Monto</th>
                  <th>Método</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="payment in payments" :key="payment._id">
                  <td>{{ payment.usuario_id }}</td>
                  <td>${{ payment.monto }}</td>
                  <td>{{ payment.metodo }}</td>
                  <td>{{ new Date(payment.fecha_pago).toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Tab: Readings -->
          <div v-if="activeTab === 'readings'" class="cosmic-table-container">
             <table class="cosmic-table">
              <thead>
                <tr>
                  <th>Usuario ID</th>
                  <th>Tipo</th>
                  <th>Contenido</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reading in readings" :key="reading._id">
                  <td>{{ reading.usuario_id }}</td>
                  <td>{{ reading.tipo }}</td>
                  <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ reading.contenido }}</td>
                  <td>{{ new Date(reading.fecha_lectura).toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Tab: Add Admin -->
          <div v-if="activeTab === 'addAdmin'" class="add-admin-form">
            <h2 class="cosmic-label" style="font-size: 1.2rem; margin-bottom: 2rem; text-align: center;">Registrar Nuevo Administrador</h2>
            <form @submit.prevent="registerAdmin" novalidate>
              <div class="cosmic-input-group">
                <label class="cosmic-label">Nombre Completo</label>
                <input type="text" v-model="newAdmin.nombre" class="cosmic-input" />
              </div>
              <div class="cosmic-input-group">
                <label class="cosmic-label">Email Celestial</label>
                <input type="email" v-model="newAdmin.email" class="cosmic-input" />
              </div>
              <div class="cosmic-input-group">
                <label class="cosmic-label">Llama Cósmica (Password)</label>
                <input type="password" v-model="newAdmin.password" class="cosmic-input" />
              </div>
               <div class="cosmic-input-group">
                <label class="cosmic-label">Fecha de Nacimiento</label>
                <input type="date" v-model="newAdmin.fecha_nacimiento" class="cosmic-input" />
              </div>
              <button type="submit" class="primary-btn" style="width: 100%; margin-top: 1rem;">CREAR ADMINISTRADOR</button>
            </form>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import Swal from 'sweetalert2';
import { showProfileMenu } from '../utils/userProfile.js';

const router = useRouter();
const users = ref([]);
const payments = ref([]);
const readings = ref([]);
const activeTab = ref('users');
const searchQuery = ref('');
const newAdmin = ref({ nombre: '', email: '', password: '', fecha_nacimiento: '' });
const todayDate = new Date().toISOString().split('T')[0];

const openProfileMenu = () => {
  showProfileMenu(router);
};

const fetchData = async () => {
    try {
        const [usersRes, paymentsRes, readingsRes] = await Promise.all([
            api.get('/api/usuarios'),
            api.get('/api/pagos'),
            api.get('/api/lecturas')
        ]);
        users.value = usersRes.data.usuarios || [];
        payments.value = Array.isArray(paymentsRes.data) ? paymentsRes.data : [];
        readings.value = readingsRes.data.lecturas || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'No se pudieron cargar los registros celestiales', 'error');
    }
};

const filteredUsers = computed(() => {
    return users.value.filter(u => 
        u.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const totalRevenue = computed(() => {
    return payments.value.reduce((acc, p) => acc + (p.monto || 0), 0).toFixed(2);
});

const activeSubscriptionsCount = computed(() => {
    return users.value.filter(u => u.isSubscribed).length;
});

const recentReadingsCount = computed(() => {
    return readings.value.length;
});

const toggleUserStatus = async (user) => {
    const nuevoEstado = user.estado === 'activo' ? 'inactivo' : 'activo';
    try {
        await api.patch(`/api/usuarios/${user._id}/estado`, { estado: nuevoEstado });
        user.estado = nuevoEstado;
        Swal.fire({
            title: 'Estado Actualizado',
            text: `El buscador ahora está ${nuevoEstado}.`,
            icon: 'success',
            background: '#0a0b1e',
            color: '#fff'
        });
    } catch (error) {
        Swal.fire('Error', 'No se pudo alterar el flujo del estado', 'error');
    }
};

const promoteToAdmin = async (user) => {
    try {
        await api.put(`/api/usuarios/${user._id}`, { rol: 'admin' });
        user.rol = 'admin';
        Swal.fire('Éxito', `${user.nombre} ahora es Administrador Celestial`, 'success');
    } catch (error) {
        Swal.fire('Error', 'No se pudo otorgar el rol administrativo', 'error');
    }
};

const deleteUser = async (user) => {
    const result = await Swal.fire({
        title: '¿Eliminar Buscador?',
        text: 'Esta acción borrará al usuario de los registros eternos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4757',
        confirmButtonText: 'Sí, eliminar',
        background: '#0a0b1e',
        color: '#fff'
    });

    if (result.isConfirmed) {
        try {
            await api.delete(`/api/usuarios/${user._id}`);
            users.value = users.value.filter(u => u._id !== user._id);
            Swal.fire('Eliminado', 'Buscador eliminado correctamente', 'success');
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar al usuario', 'error');
        }
    }
};

const registerAdmin = async () => {
    if (!newAdmin.value.nombre || !newAdmin.value.email || !newAdmin.value.password || !newAdmin.value.fecha_nacimiento) {
        return Swal.fire({
            title: 'Campos Incompletos',
            text: 'Todos los campos son obligatorios para crear un nuevo administrador.',
            icon: 'warning',
            background: '#0a0b1e',
            color: '#fff',
            confirmButtonColor: '#dbc065'
        });
    }

    if (newAdmin.value.fecha_nacimiento > todayDate) {
        return Swal.fire({
            title: 'Línea de tiempo inválida',
            text: 'La fecha de nacimiento no puede ser futura.',
            icon: 'warning',
            background: '#0a0b1e',
            color: '#fff',
            confirmButtonColor: '#dbc065'
        });
    }

    try {
        await api.post('/api/auth/registro', {
            ...newAdmin.value,
            rol: 'admin' // El backend debería manejar esto o darnos error si no lo soporta directamente en el registro
        });
        
        // Como el registro por defecto crea usuarios normales, lo promocionamos inmediatamente
        // Esto es un workaround si el controlador de registro no acepta el campo 'rol'
        Swal.fire('Solicitado', 'Nuevo administrador registrado. Recargando lista...', 'success');
        fetchData();
        activeTab.value = 'users';
        newAdmin.value = { nombre: '', email: '', password: '', fecha_nacimiento: '' };
    } catch (error) {
        const errorMsg = error.response?.data?.mensaje || error.response?.data?.error || 'No se pudo crear el nuevo administrador';
        Swal.fire('Error', errorMsg, 'error');
    }
};

onMounted(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
        router.push('/dashboard');
        return;
    }
    fetchData();
});
</script>

<style src="../styles/dashboard.css"></style>
<style src="../styles/admin.css"></style>
