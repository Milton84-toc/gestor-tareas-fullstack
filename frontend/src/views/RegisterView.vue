<template>
  <section class="min-h-[70vh] grid place-items-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold text-center mb-6 text-primary">Registro</h1>
      <form @submit.prevent="onRegister" class="space-y-3">
        <div>
          <label class="block text-sm mb-1">Nombre</label>
          <input v-model="name" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm mb-1">Correo</label>
          <input v-model="email" type="email" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm mb-1">Contraseña</label>
          <input v-model="password" type="password" required class="w-full border rounded-lg px-3 py-2" />
        </div>
        <button class="w-full bg-primary text-white py-2 rounded-lg">Crear cuenta</button>
        <p class="text-xs text-gray-500 text-center">
          ¿Ya tienes cuenta? <RouterLink to="/login" class="underline">Inicia sesión</RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { register } from "@/stores/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const name = ref(""); const email = ref(""); const password = ref("");
async function onRegister() {
  try { await register(name.value, email.value, password.value); alert("Registro exitoso, inicia sesión"); router.push("/login"); }
  catch (e) { alert(e?.response?.data?.message || "Error al registrar"); }
}
</script>
