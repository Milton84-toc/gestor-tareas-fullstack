<template>
  <div class="space-y-6">
    <!-- Título -->
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold text-primary">Panel de Tareas</h2>
    </div>

    <!-- Formulario -->
    <TaskForm @created="crear" />

    <!-- Lista -->
    <div class="bg-white rounded-2xl shadow-md p-6">
      <h3 class="text-xl font-semibold mb-4">Mis Tareas</h3>
      <transition-group name="fade" tag="ul" class="space-y-3">
        <li
          v-for="t in tasks"
          :key="t.id"
          class="flex justify-between items-center border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition"
        >
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              v-model="t.completed"
              @change="actualizar(t)"
              class="w-5 h-5 accent-primary"
            />
            <span
              :class="[
                'text-lg',
                t.completed ? 'line-through text-gray-400' : 'text-gray-800',
              ]"
            >
              {{ t.title }}
            </span>
          </div>

          <div class="space-x-3">
            <button
              @click="abrirModal(t)"
              class="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Editar
            </button>
            <button
              @click="confirmarEliminar(t.id)"
              class="text-red-600 hover:text-red-800 font-medium transition"
            >
              Eliminar
            </button>
          </div>
        </li>
      </transition-group>

      <p v-if="tasks.length === 0" class="text-gray-400 text-center mt-4">
        Agrega una tarea
      </p>
    </div>

    <!-- Modal de edición -->
    <div
      v-if="modalAbierto"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fade-in"
      >
        <h3 class="text-xl font-semibold text-primary mb-4">
          Editar tarea
        </h3>
        <input
          v-model="tareaEdit.titulo"
          type="text"
          placeholder="Nuevo título..."
          class="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-primary"
        />
        <div class="flex justify-end space-x-3">
          <button
            @click="modalAbierto = false"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            @click="guardarEdicion"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import api from "@/services/api";
import { logout } from "@/stores/auth";
import { useRouter } from "vue-router";

const tasks = ref([]);
const router = useRouter();

// Modal
const modalAbierto = ref(false);
const tareaEdit = ref({ id: null, titulo: "" });

// Funciones principales
async function cargar() {
  const { data } = await api.get("/tasks");
  tasks.value = data;
}

async function crear(payload) {
  const { data } = await api.post("/tasks", payload);
  tasks.value.unshift(data);
}

async function actualizar(payload) {
  await api.put(`/tasks/${payload.id}`, payload);
}

async function confirmarEliminar(id) {
  if (confirm("¿Seguro que deseas eliminar esta tarea?")) {
    await api.delete(`/tasks/${id}`);
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }
}

// Modal
function abrirModal(t) {
  tareaEdit.value = { id: t.id, titulo: t.title };
  modalAbierto.value = true;
}

async function guardarEdicion() {
  if (!tareaEdit.value.titulo.trim()) return alert("El título no puede estar vacío");
  const { data } = await api.put(`/tasks/${tareaEdit.value.id}`, {
    title: tareaEdit.value.titulo,
  });
  const i = tasks.value.findIndex((t) => t.id === data.id);
  if (i !== -1) tasks.value[i] = data;
  modalAbierto.value = false;
}

function salir() {
  logout();
  router.push("/login");
}

onMounted(cargar);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.animate-fade-in {
  animation: fadeIn 0.3s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
