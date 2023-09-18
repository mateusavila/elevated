<script setup lang="ts">
import { ref, defineAsyncComponent, computed, DefineComponent } from 'vue'
import dayjs from 'dayjs'
import { getDayNames, getYearRange } from '../composables/useDayjs'
import Datepicker from '@vuepic/vue-datepicker'
import HourPicker from './HourPicker.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import MeetUsers from './MeetUsers.vue'
import Loading from './Loading.vue'
import TimezoneBlock from './TimezoneBlock.vue'
import type { ListEvents, MeetingForm } from './interfaces'
import CalendarEnding from './CalendarEnding.vue'
import mixpanel from 'mixpanel-browser'


const date = ref<Date>()
const loading = ref<boolean>(false)
const list = ref<ListEvents[]>([])
const userHasSelectedHour = ref<boolean>(false)
const userHasSentMeetingEmail = ref<boolean>(false)
const selectHour = ref<Date>()
const MonthYear = defineAsyncComponent(() => import('./MonthYearComponent.vue')) as unknown as DefineComponent
const monthYear = computed(() => MonthYear)
const updateHour = (date: Date) => { 
  selectHour.value = date 
  userHasSelectedHour.value = true
}
const updateDate = async (d: Date) => {
  loading.value = true
  const startDay = dayjs(d).hour(0).minute(0).second(0).toDate()
  const endDay = dayjs(d).hour(23).minute(59).second(59).toDate()
  return await fetch(`/google_calendar/list_events.json?timeMin=${startDay}&timeMax=${endDay}&timeZone=America/New_York`)
    .then((response: any) => response.json())
    .then((response: any)=> { list.value = response })
    .finally(() => loading.value = false)
}
const meetSent = ({ attendees, startTime, endTime, description, summary, timeZone }: MeetingForm) => {
  loading.value = false
  userHasSentMeetingEmail.value = true
  mixpanel.init(import.meta.env.PUBLIC_MIXPANEL, { debug: false })
  mixpanel.track('Talk to us!', {
    attendees,
    startTime: dayjs(startTime).toDate(),
    endTime: dayjs(endTime).toDate(),
    description,
    summary,
    timeZone,
    date: new Date()
  })
}
const processMeet = () => {
  loading.value = true
}
</script>

<template>
  <div class="calendar">
    <div class="container">
      <div class="calendar-area">
        <h2 :class="{ right: userHasSentMeetingEmail }">I’d like to meet you this day</h2>
        <div
          v-if="!userHasSentMeetingEmail"
          class="calendar-area-box">
          <h3>Select a day and a hour</h3>
          <Loading :status="loading" />
          <div
            v-if="!userHasSelectedHour"
            class="calendar-area-datepicker">
            <Datepicker 
              v-model="date" 
              inline 
              dark 
              :auto-apply="true"
              @update:modelValue="updateDate" 
              :month-year-component="monthYear"
              :month-change-on-scroll="false" 
              :min-date="new Date()"
              :week-start="0" 
              :year-range="getYearRange"
              :disabled-week-days="[0, 6]" 
              :select-text="''"
              :enable-time-picker="false" 
              :day-names="getDayNames"
              :month-picker="false" 
              :year-picker="false">
              <template #day="{ day }">
                <span class="dp__day">{{ day }}</span>
              </template>
            </Datepicker>
            <TimezoneBlock />
          </div>
          <div
            v-if="!userHasSelectedHour"
            class="calendar-area-hourpicker">
            <HourPicker v-if="date && list" :list="list" :date="date" @update-hour="updateHour" />
          </div>
          <div
            v-if="userHasSelectedHour && !userHasSentMeetingEmail"
            class="calendar-area-user-contact">
            <MeetUsers 
              v-if="selectHour"
              :hour="selectHour" 
              @meet-sent="meetSent"
              @process-meet="processMeet"
            />
          </div>
        </div>
        <CalendarEnding 
          v-if="selectHour && userHasSentMeetingEmail"  
          :hour="selectHour" />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  .dp__theme_dark
    --dp-background-color: #000000
    --dp-text-color: #ffffff
    --dp-hover-color: #484848
    --dp-hover-text-color: #ffffff
    --dp-hover-icon-color: #959595
    --dp-primary-color: #000
    --dp-primary-text-color: #ffffff
    --dp-secondary-color: #777
    --dp-border-color: #2d2d2d
    --dp-menu-border-color: #2d2d2d
    --dp-border-color-hover: #aaaeb7
    --dp-disabled-color: #737373
    --dp-scroll-bar-background: #212121
    --dp-scroll-bar-color: #484848
    --dp-success-color: #00701a
    --dp-success-color-disabled: #428f59
    --dp-icon-color: #959595
    --dp-danger-color: #e53935
    --dp-highlight-color: rgba(0, 92, 178, 0.2)
    --dp-cell-width: 50px
    --dp-cell-width-mobile: 35px
  .calendar
    .container
      width: calc(100% - 60px)
      max-width: 1330px
      margin: 0 auto
      padding-left: 80px
    h2, h3
      margin: 0 0 30px
      color: #fff
      font-family: var(--inter)
    h2
      font-size: 40px
      font-weight: 700
      &.right
        text-align: right
    h3
      width: 100%
      font-size: 24px
      text-align: center
      font-weight: 600
  .calendar-area-datepicker, .calendar-area-hourpicker
    width: 100%
    max-width: 450px
  .calendar-area-hourpicker
    max-width: calc(100% - 500px)
  .calendar-area
    max-width: 100%
  .calendar-area, .dp__menu
    width: 100%
  .dp__calendar_header, .dp__calendar_row
    grid-gap: 16px
  .dp__main, .dp__cell_inner, .dp__calendar_header_item, .calendar .container
    display: flex
  .dp__main, .calendar .container
    justify-content: flex-end
  .dp__menu
    border: none
  .dp__action_row
    display: none
  .dp__today
    border: 1px solid #aaa
  .dp__cell_inner, .dp__calendar_header_item
    width: var(--dp-cell-width)
    height: var(--dp-cell-width)
    margin: 1px
    font-family: var(--inter)
  .dp__calendar_item
    border-radius: 100%
  .dp__cell_inner, .dp__calendar_header_item
    align-items: center
    justify-content: center
  .dp__cell_inner, .dp__cell_inner:hover
    transition: all .2s ease-in-out
  .dp__cell_inner
    padding: 1px
    border: none
    border-radius: 100%
    background-size: cover
    background: linear-gradient(180deg, #7362FF 0%, #FF7B31 100%)
    &:hover
      background: linear-gradient(180deg, #7362FF 0%, #FF7B31 100%)
    .dp__day
      background: #000
    &.dp__cell_disabled
      background: transparent
    .dp__day
      width: 100%
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      border-radius: 100%
    &.dp__active_date
      .dp__day
        background: linear-gradient(180deg, #7362FF 0%, #FF7B31 100%)
    &.dp__today .dp__day
      background: #222
      color: #fff
      border: 1px solid #fff
  .dp__calendar_header_item
    font-weight: normal
    text-transform: uppercase
  .dp__calendar_header_separator, .calendar
    background: #000
  .calendar-area-box
    border: 0.5px solid #fff
    border-radius: 20px
    padding: 30px
    position: relative
    display: flex
    justify-content: space-between
    align-items: flex-start
    flex-wrap: wrap
    margin-bottom: 20px
  .calendar-area-user-contact
    width: 100%
  .dp__cell_disabled
    font-weight: 300
  @media all and (max-width: 1280px)
    .calendar
      .container
        padding-left: 0
    .calendar-area-box
        justify-content: space-between
  @media all and (max-width: 1024px)
    .calendar-area-hourpicker, .calendar-area-datepicker
      max-width: 100%
    .calendar-area-hourpicker
      margin-top: 40px
    .calendar
      h2
        font-size: clamp(24px, calc(1.5rem + ((1vw - 3.2px) * 2.2727)), 40px)
      h3
        font-size: clamp(18px, calc(1.125rem + ((1vw - 3.2px) * 0.8523)), 24px)
  @media all and (max-width: 680px)
    .dp__theme_dark
      --dp-cell-width: 35px
    .dp__cell_inner .dp__day
      font-size: 14px
    .dp__calendar_header, .dp__calendar_row
      grid-gap: 10px
  @media all and (max-width: 450px)
    .dp__theme_dark
      --dp-cell-width: 28px
    .dp__cell_inner .dp__day
      font-size: 12px
    .dp__calendar_header, .dp__calendar_row
      grid-gap: 8px
    .dp__calendar_row
      margin: 10px 0
    .dp__calendar_header_item
      font-size: 11px
    .calendar .container
      width: calc(100% - 30px)
    .calendar-area-box
      padding: 20px
</style>
