<script setup lang="ts">
import { Loading } from './images'
const props = defineProps<{
  status: boolean
}>()

</script>

<template>
  <div class="loading" :class="{ active: props.status }">
    <img :src="Loading" alt="loading" loading="lazy" width="200" height="200">
  </div>
</template>

<style lang="sass">
  .loading
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #000
    display: flex
    justify-content: center
    align-items: center
    z-index: 10
    border-radius: 20px
    visibility: hidden
    opacity: 0
    transition: all .2s ease-in-out
    &.active
      visibility: visible
      opacity: 1
      transition: all .2s ease-in-out
</style>