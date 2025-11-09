<!-- src/App.vue -->
<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <NavBar />
    <router-view />
  </div>
</template>
