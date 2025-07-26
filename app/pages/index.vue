<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-gray-900">Welcome to Todo App</h1>
          <button @click="signOut" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Sign Out
          </button>
        </div>
        
        <div class="mb-4">
          <p class="text-gray-600">You are logged in as: <span class="font-semibold">{{ user?.email }}</span></p>
        </div>
        
        <div v-for="task in tasks" :key="task.uuid" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 class="text-lg font-semibold text-blue-900 mb-2">{{ task.title }}</h2>
          <p class="text-blue-800">{{ task.createdAt }}</p>
        </div>

        <TaskInput @submit="addTask" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from '~~/models/task';
import { useTaskStore } from '../../stores/taskStore';
import TaskInput from '~~/components/TaskInput.vue';

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const signOut = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

const tasks = computed<Task[]>(() => useTaskStore().tasks);

onMounted(() => {
  useTaskStore().requestTasks();
})

const addTask = (title: string) => {
  useTaskStore().addTask(title);
}
</script> 