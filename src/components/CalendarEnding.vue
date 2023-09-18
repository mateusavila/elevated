<script setup lang="ts">
import { MeetingIcon1, MeetingIcon2 } from "./images"
import { getSelectedMonthDay, getYear, getHourAMPMTable, getDayName } from '../composables/useDayjs'
import { toRefs } from 'vue'
import TimezoneBlock from './TimezoneBlock.vue'
const props = defineProps<{
  hour: Date
}>()
const { hour } = toRefs(props)
</script>

<template>
  <div class="calendar-ending">
    <div class="calendar-ending-header">
      <h2>Confirmed</h2>
      <p class="calendar-ending-text">You are scheduled with <br>Rachel Banta</p>
    </div>
    <div class="calendar-ending-content">
      <table class="calendar-ending-table">
        <tbody>
          <tr>
            <td>
              <div class="highlight-ball"></div>
            </td>
            <td>
              <span class="highlight-text">15 Minutes Meeting</span>
            </td>
          </tr>
          <tr>
            <td>
              <img :src="MeetingIcon1" alt="" width="36" height="36" loading="lazy">
            </td>
            <td>
              15 min
            </td>
          </tr>
          <tr>
            <td>
              <img :src="MeetingIcon2" alt="" width="36" height="36" loading="lazy">
            </td>
            <td>
              {{ getHourAMPMTable(hour) }} -{{ getHourAMPMTable(hour, 15) }} {{ getDayName(hour).value }}, <br> {{ getSelectedMonthDay(hour).value }},
              {{ getYear(hour).value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="calendar-ending-footer">
      <p class="calendar-ending-text">A calendar invitation has been sent <br/> to your email address</p>
      <TimezoneBlock />
    </div>
  </div>
</template>

<style lang="sass">
  .calendar-ending 
    max-width: 815px
    padding: 40px
    border-radius: 20px
    border: 1px solid #fff
    float: right
    &-header, &-footer
      .calendar-ending-text
        line-height: 150%
        font-size: 30px
        margin: 0
    &-header
      width: 100%
      text-align: center
      padding-bottom: 20px
      margin-bottom: 20px
      border-bottom: 1px solid #fff
      h2
        margin: 0 0 40px
        background: linear-gradient(97.11deg, #FFFFFF 7.53%, #FF7B31 7.53%, #6E49FF 91.29%)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
        background-clip: text
        text-fill-color: transparent
    &-footer
      margin-top: 20px
      padding-top: 20px
      border-top: 1px solid #fff
      text-align: center
  .highlight-ball
    width: 40px
    height: 40px
    border-radius: 100%
    display: inline-block
    background: linear-gradient(329.34deg, #6E49FF -8.63%, #FF7B31 111.22%)
  .highlight-text
    color: #fff
    font-size: 40px
    font-weight: bold
  .calendar-ending-table
    td
      color: #757575
      vertical-align: center
      padding: 5px
      font-size: 30px
      line-height: 150%
    td:nth-child(1)
      padding-right: 10px
    tr:nth-child(3)
      td:nth-child(1)
        vertical-align: top
  @media all and (max-width: 830px)
    .calendar-ending
      width: 100%
      padding: 20px
    .highlight-ball
      width: 20px
      height: 20px
    .calendar-ending-header, .calendar-ending-footer 
      .calendar-ending-text
        line-height: 150%
        font-size: clamp(18px, calc(1.125rem + ((1vw - 3.2px) * 2.5)), 30px)
        br
          display: none
    .calendar-ending-table td
        font-size: clamp(16px, calc(1rem + ((1vw - 3.2px) * 2.9167)), 30px)
        img
          width: 20px
          height: 20px
    .highlight-text
        line-height: 150%
        font-size: clamp(20px, calc(1.25rem + ((1vw - 3.2px) * 4.1667)), 40px)
</style>