<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const remember = ref(false)

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function submit() {
  const ok = await auth.login({ email: email.value, password: password.value, remember: remember.value })
  if (ok) {
    router.push(route.query.redirect || { name: 'profile' })
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto bg-white shadow rounded-2xl p-6">
    <h1 class="text-xl font-bold mb-4 text-center">تسجيل الدخول</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">البريد الإلكتروني</label>
        <input v-model="email" type="email" required class="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block text-sm mb-1">كلمة المرور</label>
        <input v-model="password" type="password" required class="w-full border rounded px-3 py-2" />
      </div>
      <label class="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" v-model="remember" /> تذكّرني
      </label>
      <button :disabled="auth.loading" class="w-full bg-blue-600 text-white rounded py-2">
        {{ auth.loading ? 'جارٍ الدخول...' : 'دخول' }}
      </button>
      <p v-if="auth.error" class="text-red-600 text-sm text-center">{{ auth.error }}</p>
    </form>
  </div>
</template>
