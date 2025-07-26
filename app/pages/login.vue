<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <form @submit.prevent="handleSubmit" class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center">{{ isSignUp ? 'Sign Up' : 'Login' }}</h1>
      <input v-model="email" type="email" placeholder="Email" class="mb-4 w-full p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="mb-4 w-full p-2 border rounded" required />
      <input 
        v-if="isSignUp" 
        v-model="confirmPassword" 
        type="password" 
        placeholder="Confirm Password" 
        class="mb-4 w-full p-2 border rounded" 
        required 
      />
      <button type="submit" class="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 mb-4">
        {{ isSignUp ? 'Sign Up' : 'Sign In' }}
      </button>
      <div v-if="error" class="text-red-500 mt-2 text-center mb-4">{{ error }}</div>
      <div v-if="success" class="text-green-500 mt-2 text-center mb-4">{{ success }}</div>
      <div class="text-center">
        <button 
          type="button" 
          @click="isSignUp = !isSignUp" 
          class="text-primary-600 hover:text-primary-700 underline"
        >
          {{ isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up' }}
        </button>
      </div>
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
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const isSignUp = ref(false)

watchEffect(() => {
  if (user.value) {
    router.replace('/')
  }
})

const handleSubmit = async () => {
  console.log('Form submitted, isSignUp:', isSignUp.value)
  if (isSignUp.value) {
    await signUp()
  } else {
    await signIn()
  }
}

const signIn = async () => {
  console.log('SignIn called')
  error.value = ''
  success.value = ''
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (signInError) {
    error.value = signInError.message
  }
}

const signUp = async () => {
  console.log('SignUp called')
  error.value = ''
  success.value = ''
  
  console.log('Starting sign up process...')
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  
  console.log('Passwords match, calling Supabase signUp...')
  
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  
  console.log('SignUp response:', { data, error: signUpError })
  
  if (signUpError) {
    error.value = signUpError.message
    console.error('SignUp error:', signUpError)
  } else {
    success.value = 'Check your email for a confirmation link!'
    console.log('SignUp successful, data:', data)
    // Clear form after successful sign up
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  }
}
</script> 