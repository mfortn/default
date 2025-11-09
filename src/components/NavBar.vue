<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
const router = useRouter()

async function doLogout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <nav class="p-4 bg-white shadow flex items-center justify-between">
    <div class="flex items-center gap-4">
      <RouterLink to="/" class="text-blue-600 font-semibold">الرئيسية</RouterLink>
      <RouterLink to="/profile" class="text-blue-600">الملف</RouterLink>
    </div>

    <div v-if="auth.isAuthenticated" class="flex items-center gap-3">
      <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
        {{ (auth.user?.name || auth.user?.email || '?').slice(0,1).toUpperCase() }}
      </div>
      <span class="text-sm">{{ auth.user?.name || auth.user?.email }}</span>
      <button @click="doLogout" class="px-3 py-1.5 bg-gray-800 text-white rounded">خروج</button>
    </div>

    <div v-else class="flex items-center gap-2">
      <RouterLink to="/login" class="px-3 py-1.5 bg-blue-600 text-white rounded">دخول</RouterLink>
      <RouterLink to="/register" class="px-3 py-1.5 border rounded">تسجيل</RouterLink>
    </div>
  </nav>
</template>
