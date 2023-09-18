<script setup lang="ts">
import { ref } from "vue";
import { Earth } from './images'
import { useIntervalFn } from '@vueuse/core'
import { useDayjs } from '../composables/useDayjs'
const tenSeconds = ref<number>(1000 * 10)
useIntervalFn(() => {
  hour.value = useDayjs().value
}, tenSeconds)
let hour = useDayjs()
</script>

<template>
  <div class="calendar-earth">
    <img :src="Earth" alt="planet Earth" width="24" height="24" loading="lazy">
    <p>Easter Time - US &amp; Canada ({{hour}})</p>
  </div>
</template>

<style lang="sass">
  .calendar-earth
    margin-top: 20px
    padding: 10px 0
    display: flex
    justify-content: flex-start
    align-items: center
    p
      margin: 0 0 0 10px
      font-size: 14px
      font-weight: 300
  @media all and (max-width: 400px)
    .calendar-earth
      p
        font-size: 12px
</style>