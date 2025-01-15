<template>
  <button class="pagination-btn pagination-btn__prev" @click="backPage">Попередня</button>
  <button
    v-for="item in totalPages"
    :key="item"
    class="pagination-btn"
    :class="{ active: page === item }"
    @click="goToPage(item)"
  >
    {{ item }}
  </button>
  <button class="pagination-btn pagination-btn__next" @click="nextPage">Наступна</button>
</template>

<script setup>
import { ref, computed, watch } from "vue"

const props = defineProps({
  itemsCount: { type: Number, default: 0 },
  perPage: { type: Number, default: 10 }
})

const emit = defineEmits(['changePage'])

let page = ref(1)

watch(page, val => {
  emit('changePage', val)
})

const totalPages = computed(() => {
  return Math.ceil(props.itemsCount / props.perPage)
})

const nextPage = () => {
  if (page.value !== totalPages.value) {
    page.value += 1
  }
}

const backPage = () => {
  if (page.value !== 1) {
    page.value -= 1
  }
}

const goToPage = numPage => {
  page.value = numPage
}
</script>

<style lang="sass" scoped>
.pagination-btn
  margin: 0 2px
  background-color: #fff
  color: #000
  text-transform: capitalize
  &__prev
    margin-right: 2px
    margin-left: 0
  &__next
    margin-left: 2px
    margin-right: 0
  &:hover,
  &.active
    background-color: #057c48
    color: #fff
  
</style>
