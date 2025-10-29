<template>
  <div class="min-h-screen">
    <!-- Navbar solo visible si el usuario está autenticado -->
    <header v-if="auth" class="bg-white shadow">
      <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl md:text-2xl font-bold text-primary">Gestor de Tareas</h1>
        <button
          @click="cerrarSesion"
          class="text-red-600 hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="mx-auto max-w-5xl p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { isAuthenticated, logout } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const auth = ref(isAuthenticated());

// Detectar cambios de ruta o autenticación
watch(route, () => {
  auth.value = isAuthenticated();
});

// Cerrar sesión
function cerrarSesion() {
  logout();
  auth.value = false;
  router.push("/login");
}
</script>

<style scoped>
header {
  transition: all 0.3s ease;
}
</style>
