<template>
  <form v-if="isForm" @submit.prevent="addNewRate">
    <h1>Змінити курс</h1>
    <label for="rate-input">
      {{ choosenRate.txt }} ({{ choosenRate.cc }})
    </label>
    <input
      v-model="newRate"
      ref="newRateRef"
      id="rate-input"
      type="text"
      :class="{ error: !isValid }"
      :placeholder="choosenRate.rate"
      name="rate"
      autocomplete="rate-off"
    >

    <button>Зберегти</button>
  </form>

  <VTable
    v-if="localRates.length"
    :items="localRates"
    :perPage="10"
  />
  <h2 v-else>Пусто</h2>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const { ratesData } = storeToRefs(useMainStore())
const { getRates } = useMainStore()
const route = useRoute()
const router = useRouter()

const newRateRef = ref({})
const isForm = ref(false)
const choosenRate = ref({})
const newRate = ref('')

onMounted(async () => {
  if (!ratesData.value.length) {
    const response = await getRates()
  }

  if (route.params.code) {
    getRateInfo()
    isForm.value = true
  }

  getChangedRates()
})

function getRateInfo() {
  choosenRate.value = ratesData.value.find(el => el.cc === route.params.code)
}

watch(route, val => {
  newRate.value = ''
  isForm.value = !!val.params.code
  if (val.params.code) {
    getRateInfo()
  }
})

const localRates = ref([])
function getChangedRates() {
  localRates.value = localStorage.getItem('changedRates') ? JSON.parse(localStorage.getItem('changedRates')) : []
}

const isValid = ref(true)
function addNewRate() {
  // Validate for empty value
  if (!newRate.value) {
    newRateRef.value.focus()
    return
  }

  // Validate type
  isValid.value = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(newRate.value)
  if (!isValid.value) return

  let savedRates = [...localRates.value]
  
  // Remove repeated value
  if (savedRates.length) {
    const index = savedRates.map(el => el.cc).indexOf(route.params.code)
    if (index >= 0) {
      savedRates.splice(index, 1)
    }
  }

  const newData = {
    ...choosenRate.value,
    rate: newRate.value
  }
  savedRates.unshift(newData)
  
  localStorage.setItem('changedRates', JSON.stringify(savedRates))
  localRates.value = savedRates
  isForm.value = false
  router.push({ name: 'changedRates' })
}
</script>

<style lang="sass" scoped>
h2
  text-align: center
</style>
