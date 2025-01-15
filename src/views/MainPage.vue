<template>
  <h1>Офіційний курс гривні щодо іноземних валют на поточний день</h1>

  <VTable
    :items="rates"
    :perPage="10"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const { ratesData } = storeToRefs(useMainStore())
const { getRates } = useMainStore()

const rates = ref([])

onMounted(async () => {
  if (!ratesData.value.length) {
    const response = await getRates()
    rates.value = response
  } else {
    rates.value = ratesData.value
  }
})
</script>
