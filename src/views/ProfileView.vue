<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div class="max-w-md mx-auto bg-white shadow rounded-2xl p-6 space-y-2">
    <h1 class="text-xl font-bold">الملف الشخصي</h1>
    <p><b>الاسم:</b> {{ auth.user?.name }}</p>
    <p><b>البريد:</b> {{ auth.user?.email }}</p>
  </div>
</template>
