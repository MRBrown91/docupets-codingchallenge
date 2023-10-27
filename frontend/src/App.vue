<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar align-items-stretch navbar-white navbar-expand-lg">
      <div class="d-flex w-100 justify-content-center">
        <router-link to="/" class="navbar-brand mr-lg-2 align-self-center">
          <img src="@/assets/logo.png" alt="DocuPet" height="36" class="flex-wrap">
        </router-link>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>