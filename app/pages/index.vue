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
                    <p class="text-gray-600">You are logged in as: <span class="font-semibold">{{ user?.email }}</span>
                    </p>
                </div>

                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h2 class="text-lg font-semibold text-blue-900 mb-2">Getting Started</h2>
                    <p class="text-blue-800">This is your dashboard. You can start building your todo app features here!
                    </p>
                </div>

                <TaskInput @submit="addTask" />

                <draggable 
                    v-model="localTasks" 
                    item-key="uuid"
                    class="space-y-4 mt-6"
                    ghost-class="opacity-50"
                    @end="handleReorder"
                >
                    <template #item="{ element: task }">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 cursor-move">
                            <div class="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    :checked="task.isDone" 
                                    @change="toggleTask(task.uuid, !task.isDone)"
                                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                />
                                <h2 class="text-lg font-semibold text-blue-900 flex-1" :class="{ 'line-through': task.isDone }">{{ task.title }}</h2>
                                <button @click="deleteTask(task.uuid)" class="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full transition-colors duration-200">
                                    <TrashIcon class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import { Task } from '~~/models/task';
import { useTaskStore } from '../../stores/taskStore';
import TaskInput from '~~/components/TaskInput.vue';
import draggable from 'vuedraggable'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const todoStore = useTaskStore()

onMounted(() => {
  todoStore.requestTasks()
})

// Use computed property for better reactivity
const localTasks = computed({
  get: () => todoStore.tasks,
  set: (newTasks) => {
    todoStore.reorderTasks(newTasks)
  }
})

const addTask = (title: string) => {
  todoStore.createTask(title)
}

const deleteTask = (uuid: string) => {
  todoStore.deleteTask(uuid)
}

const toggleTask = (uuid: string, isDone: boolean) => {
  todoStore.toggleTask(uuid, isDone)
}

const handleReorder = () => {
  // The computed setter will handle updating the store
  // No need to do anything here since the draggable will call the setter
}

const signOut = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

const formatTime = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
</script>