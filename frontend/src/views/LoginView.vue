<template>
  <section class="min-h-[70vh] grid place-items-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold text-center mb-6 text-primary">Iniciar Sesión</h1>
      <form @submit.prevent="onLogin" class="space-y-3">
        <div>
          <label class="block text-sm mb-1">Correo</label>
          <input v-model="email" type="email" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm mb-1">Contraseña</label>
          <input v-model="password" type="password" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <button type="submit" class="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90">Entrar</button>
        <p class="text-xs text-gray-500 text-center">
          ¿No tienes cuenta? <RouterLink to="/register" class="underline">Crear una</RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { login } from "@/stores/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const email = ref("");
const password = ref("");
async function onLogin() {
  try { await login(email.value, password.value); router.push("/dashboard"); }
  catch (e) { alert(e?.response?.data?.message || "Error al iniciar sesión"); }
}
</script>
