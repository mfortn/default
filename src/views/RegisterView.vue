<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const auth = useAuthStore()
const router = useRouter()

async function submit() {
  const ok = await auth.register({ name: name.value, email: email.value, password: password.value, password_confirmation: password_confirmation.value })
  if (ok) router.push({ name: 'profile' })
}
</script>

<template>
  <div class="max-w-sm mx-auto bg-white shadow rounded-2xl p-6">
    <h1 class="text-xl font-bold mb-4 text-center">إنشاء حساب</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">الاسم</label>
        <input v-model="name" required class="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block text-sm mb-1">البريد الإلكتروني</label>
        <input v-model="email" type="email" required class="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block text-sm mb-1">كلمة المرور</label>
        <input v-model="password" type="password" required class="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block text-sm mb-1">تأكيد كلمة المرور</label>
        <input v-model="password_confirmation" type="password" required class="w-full border rounded px-3 py-2" />
      </div>
      <button :disabled="auth.loading" class="w-full bg-blue-600 text-white rounded py-2">
        {{ auth.loading ? 'جارٍ الإنشاء...' : 'إنشاء الحساب' }}
      </button>
      <p v-if="auth.error" class="text-red-600 text-sm text-center">{{ auth.error }}</p>
    </form>
  </div>
</template>
