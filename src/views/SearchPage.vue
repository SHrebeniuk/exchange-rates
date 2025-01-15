<template>
  <div class="mb-1">Оберіть дату для пошуку</div>
  <VueDatePicker
    v-model="date"
    :max-date="new Date()"
    :enable-time-picker="false"
    auto-apply
    class="mb-4"
  />

  <template v-if="rates.length && date">
    <VTable
      :items="rates"
      :perPage="10"
    />
  </template>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { useMainStore } from '@/stores/main'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const { getRates } = useMainStore()

const rates = ref([])
const date = ref()

watch(date, async val => {
  if (!val) return

  const formattedDate = val.toJSON().slice(0, 10).replaceAll('-', '')
  const response = await getRates(formattedDate)
  rates.value = response
})
</script>
