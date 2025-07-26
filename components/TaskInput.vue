<template>
  <div class="flex gap-2">
    <input
      v-model="inputValue"
      @keyup.enter="handleSubmit"
      type="text"
      placeholder="Enter a new task..."
      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    />
    <button
      @click="handleSubmit"
      class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      Add
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  'submit': [value: string]
}>()

const inputValue = ref('')

const handleSubmit = () => {
  if (inputValue.value.trim()) {
    emit('submit', inputValue.value.trim())
    inputValue.value = ''
  }
}
</script> 