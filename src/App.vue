<template>
  <header>
    <RouterLink :to="{ name: 'main' }">Головна</RouterLink>
    <RouterLink :to="{ name: 'changedRates' }">Змінені курси</RouterLink>
    <RouterLink :to="{ name: 'search' }">Пошук</RouterLink>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<style lang="sass" scoped>
header
  margin-bottom: 20px
  padding-bottom: 12px
  border-bottom: 1px solid rgba(0, 0, 0, 0.12)
</style>
