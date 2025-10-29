<template>
  <div class="bg-white rounded-2xl shadow p-4">
    <h2 class="text-lg font-semibold mb-3">Mis Tareas</h2>
    <ul class="space-y-2">
      <li v-for="t in tasks" :key="t.id" class="flex items-center justify-between border rounded-lg px-3 py-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" :checked="t.completed" @change="toggle(t)" />
          <span :class="t.completed ? 'line-through text-gray-400' : ''">{{ t.title }}</span>
        </div>
        <div class="space-x-3">
          <button class="text-blue-600 hover:underline" @click="editPrompt(t)">Editar</button>
          <button class="text-red-600 hover:underline" @click="$emit('remove', t.id)">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({ tasks: { type: Array, default: () => [] } });
const emit = defineEmits(["update", "remove"]);
function toggle(t) { emit("update", { ...t, completed: !t.completed }); }
function editPrompt(t) { const title = prompt("Nuevo título", t.title); if (title && title !== t.title) emit("update", { ...t, title }); }
</script>
