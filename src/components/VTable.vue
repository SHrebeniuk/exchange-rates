<template>
  <input
    v-model="search"
    class="search"
    type="text"
    placeholder="Введіть назву валюти для пошуку"
  >

  <table class="table table-hover" aria-labelledby="exportTitle date-full">
    <thead>
      <tr>
        <th>Код цифровий</th>
        <th>Код літерний</th>
        <th>Назва валюти</th>
        <th>Офіційний курс</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rate in viewItems" :key="rate.r030">
        <td>{{ rate.r030 }}</td>
        <td>{{ rate.cc }}</td>
        <td>{{ rate.txt }}</td>
        <td>{{ rate.rate }}</td>
        <td>
          <RouterLink :to="{ name: 'changeRate', params: { code: rate.cc } }">
            Змінити
          </RouterLink>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination
    v-if="filteredItems.length > perPage"
    :itemsCount="filteredItems.length"
    :perPage="perPage"
    @change-page="paginate"
  />
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'
import Pagination from '@/components/Pagination.vue'

const props = defineProps({
  items: { type: Array, default: () => ([]) },
  perPage: { type: Number, default: 10 }
})

const viewItems = ref([])
const search = ref()
const filteredItems = ref([])

onMounted(() => {
  if (props.items) updateList()
})

watch(() => props.items, val => updateList())

watch(search, val => {
  filteredItems.value = val ? props.items.filter(el => el.txt.includes(val)) : props.items
  paginate()
})

function updateList() {
  filteredItems.value = props.items
  paginate()
}

function paginate(page = 1) {
  const startIndex = page * props.perPage - props.perPage
  const endIndex = page * props.perPage
  viewItems.value = [...filteredItems.value.slice(startIndex, endIndex)]
}
</script>

<style lang="sass" scoped>
.search
  width: 100%
</style>
