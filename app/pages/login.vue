<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <form @submit.prevent="signIn" class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <input v-model="email" type="email" placeholder="Email" class="mb-4 w-full p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="mb-4 w-full p-2 border rounded" required />
      <button type="submit" class="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">Sign In</button>
      <div v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

watchEffect(() => {
  if (user.value) {
    router.replace('/')
  }
})

const signIn = async () => {
  error.value = ''
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (signInError) {
    error.value = signInError.message
  }
}
</script> 