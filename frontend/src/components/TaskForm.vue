<template>
  <form @submit.prevent="submit" class="bg-white p-4 rounded-2xl shadow flex gap-2 items-center">
    <input v-model.trim="title" type="text" placeholder="Nueva tarea..." class="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary" required />
    <button class="bg-primary text-white px-4 py-2 rounded-lg">Agregar</button>
  </form>
</template>
<script setup>
import { ref } from "vue";
const emit = defineEmits(["created"]);
const title = ref("");
function submit() { if (!title.value) return; emit("created", { title: title.value }); title.value = ""; }
</script>
