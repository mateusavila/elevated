<script setup lang="ts">
import { ArrowHourActive, ArrowHourCanActive, ArrowHourInactive } from './images'
import dayjs from 'dayjs'
import { useFetch } from '@vueuse/core'
import { ref, watch } from 'vue'
import { getSelectedMonthDay, getUserTimeZone, getCurrentTimezone, getHourAMPM, convertToDate } from '../composables/useDayjs'
import type { ListEvents, TimezoneResponse, HoursList } from './interfaces'
const props = defineProps<{
  date: Date,
  list: ListEvents[]
}>()
const emits = defineEmits<{
  (e: 'updateHour', h: Date): void
}>()
  
const clientTimezoneUTC = getUserTimeZone()
const clientTimezone = ref<number>(0)
const rachelTimezone = ref<number>(0)
const difference = ref<number>(0)
const hoursList = ref<HoursList[]>([])

const { data: userData } = useFetch(`https://worldtimeapi.org/api/timezone/${clientTimezoneUTC}`).get().json()
const { data: rachelData } = useFetch(`https://worldtimeapi.org/api/timezone/America/New_York`).get().json()


watch(() => [userData.value, rachelData.value, props.list], ([user, rachel, list]) => {
  if (user) {
    clientTimezone.value = getCurrentTimezone((user as TimezoneResponse))
  }
  if (rachel) {
    rachelTimezone.value = getCurrentTimezone((rachel as TimezoneResponse))
  }
  if (rachel && user && list) {
    const listArr = JSON.parse(JSON.stringify(props.list))
    difference.value = clientTimezone.value - rachelTimezone.value
    const hoursListArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    hoursList.value = hoursListArr.map((hour: number) => {
      const clearDate = dayjs(props.date).hour(hour).minute(0).second(0) 
      const day = clearDate.toDate()
      const compareDay = clearDate.format('YYYY-MM-DD-HH')
      const status = listArr.find((el: any) => {
        const listDay = convertToDate(el.start.dateTime)
        return listDay === compareDay
      })
      return {
        day,
        status: !status ? true : false,
        userDay: dayjs(props.date).hour(hour + difference.value).minute(0).second(0).toDate(),
      }
    })
  }
})
let day = ref(getSelectedMonthDay(props.date))
watch(() =>  props.date, (d: Date) => {
  day.value = getSelectedMonthDay(d).value
}, {
  immediate: true
})
const hourString = ref<string>('')
const updateClick = (date: Date, hourStr: string) => {
  hourString.value = hourStr
  emits('updateHour', date)
}
  
</script>

<template>
  <div class="hour-picker">
    <div class="hour-picker-header">
      <p>{{day}}</p>
    </div>
    <div class="hour-picker-data">
      <div :key="index" v-for="(item, index) in hoursList"
        class="hour-picker-data-item">
        <button 
          v-if="item.status" 
          :class="{
            active: hourString === item.day.toString()
          }" 
          type="button"
          class="hour-picker-button can-active" 
          @click="updateClick(item.day, item.day.toString())">
          <span class="hour-picker-button-text">Your Time: {{ getHourAMPM(item.userDay) }}<br><small>Rachel Time: {{ getHourAMPM(item.day) }}</small></span>
          <img v-if="hourString !== item.day.toString()" :src="ArrowHourCanActive"
            :alt="`Pick ${item.day.toString()}`">
          <img v-if="hourString === item.day.toString()" :src="ArrowHourActive"
            :alt="`Pick ${item.day.toString()}`">
        </button>
        <button v-if="!item.status" class="hour-picker-button inactive" type="button">
          <span class="hour-picker-button-text">Your Time: {{ getHourAMPM(item.userDay) }} <br><small>Rachel Time: {{ getHourAMPM(item.day) }}</small></span>
          <img :src="ArrowHourInactive" :alt="`Pick ${item.day.toString()}`">
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  .hour-picker
    width: 100%
  .hour-picker-button-text
    text-align: left
    small
      font-size: 12px
  .hour-picker-header
    display: flex
    justify-content: space-between
    width: 100%
    align-items: center
    margin-bottom: 20px
    p
      margin: 0
  .hour-picker-data, .hour-picker-data button
    width: 100%
  .hour-picker-data
    button
      display: flex
      align-items: center
      justify-content: space-between
      background: #000
      border: 1px solid #fff
      border-radius: 17px
      margin-bottom: 5px
      padding: 10px
      color: #fff
      font-size: 16px
      font-family: var(--inter)
      &.active
        background: linear-gradient(180deg, #7362FF 0%, #FF7B31 100%)
      &.can-active
        cursor: pointer
        color: #fff
      &.inactive
        color: #434343
        cursor: normal
  @media all and (max-width: 1200px)
    .hour-picker
      max-width: 100%
      &-data
        button img
          max-width: 60px
  @media all and (max-width: 500px)
    .hour-picker-data 
      button
        font-size: 15px
        font-weight: bold
        small
          font-weight: normal
</style>