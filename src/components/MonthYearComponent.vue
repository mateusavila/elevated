<script lang="ts" setup>
import ArrowButtons from './ArrowButtons.vue'
import { getMonthNames } from '../composables/useDayjs'
const emits = defineEmits(['update-month-year'])
const pickMonthName = (month: number) => getMonthNames[month]
const props = defineProps({
  months: { type: Array, default: () => [] },
  years: { type: Array, default: () => [] },
  filters: { type: Object, default: null },
  monthPicker: { type: Boolean, default: false },
  month: { type: Number, default: 0 },
  year: { type: Number, default: 0 },
  customProps: { type: Object, default: null }
})
const updateMonthYear = (month: number, year: number) => emits('update-month-year', { instance: 0, month, year })

const onNext = () => {
  let month = props.month
  let year = props.year
  if (props.month === 11) {
    month = 0
    year = props.year + 1
  } else {
    month += 1
  }
  updateMonthYear(month, year)
}

const onPrev = () => {
  let month = props.month
  let year = props.year
  if (props.month === 0) {
    month = 11
    year = props.year - 1
  } else {
    month -= 1
  }
  updateMonthYear(month, year)
}
</script>

<template>
  <div class="month-year-wrapper">
    <div class="custom-month-year-component">
      <p>{{pickMonthName(month)}} - {{year}}</p>
    </div>
    <ArrowButtons 
      @on-next="onNext"
      @on-prev="onPrev"
    />
  </div>
</template>

<style lang="sass">
.custom-month-year-component
  width: calc(100% - 50px)
.month-year-wrapper, .custom-month-year-component
  display: flex
.month-year-wrapper, .custom-month-year-component
  align-items: center
.month-year-wrapper
  justify-content: center
.custom-month-year-component
  justify-content: flex-start
</style>
