<script setup lang="ts">
import { toRefs } from 'vue'
import { getDayName, getSelectedMonthDay, getYear, getHourAMPMTable } from '../composables/useDayjs'
import { MeetingIcon1, MeetingIcon2 } from "./images"
const props = defineProps<{
  hour: Date
}>()
const { hour } = toRefs(props)

</script>

<template>
  <div class="meeting-badge">
    <p>Rachel Banta</p>
    <p class="meeting-badge-hour">15 Minutes Meeting</p>
    <table class="meeting-badge-table">
      <tbody>
        <tr>
          <td>
            <img :src="MeetingIcon1" alt="" width="16" height="16" loading="lazy">
          </td>
          <td>
            15 min
          </td>
        </tr>
        <tr>
          <td>
            <img :src="MeetingIcon2" alt="" width="16" height="17" loading="lazy">
          </td>
          <td>
            {{ getHourAMPMTable(hour) }} - {{ getHourAMPMTable(hour, 15) }} - {{ getDayName(hour).value }}, <br> {{ getSelectedMonthDay(hour).value }}, {{ getYear(hour).value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="sass">
  .meeting-badge
    margin: 20px 0
    p
      margin: 0 0 5px
      font-size: 15px
    .meeting-badge-hour
      font-size: 20px
      font-weight: bold
    .meeting-badge-table
      td
        color: #757575
        vertical-align: top
        padding: 5px 0
      td:nth-child(1)
        padding-right: 5px
</style>