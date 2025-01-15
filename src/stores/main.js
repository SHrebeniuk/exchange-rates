import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const ratesData = ref([])

  async function getRates(date = null) {
    const searchDate = date || new Date().toJSON().slice(0, 10).replaceAll('-', '')
    return await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${ searchDate }&json`)
      .then(response => response.json())
      .then(response => {
        ratesData.value = response
        return response
      })
  }

  return { ratesData, getRates }
})
