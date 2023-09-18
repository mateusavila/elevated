import { ref, Ref } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import type { TimezoneResponse } from '../components/interfaces'

// by convention, composable function names start with "use"
export const useDayjs = (): Ref<string> => {
  const zone = ref<string>("America/New_York")
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const hour = ref(dayjs().tz(zone.value).format('HH:mm'))
  return hour
}

export const getUserTimeZone = (): string => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  return dayjs.tz.guess()
}

export const getDayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getMonthNames: string[] = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"]

export const getYearRange: number[] = [2022, 2100]

export const injectUTC = (date: Date) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  return dayjs(date)
}

export const adjustTimezone = (date: Date) => {
  const zone = ref<string>("America/New_York")
  return injectUTC(date).tz(zone.value)
}

export const getSelectedMonthDay = (date: Date) => {
  return ref(adjustTimezone(date).format('MMMM DD'))
}

export const convertToDate = (date: Date) => {
  return adjustTimezone(date).minute(0).second(0).format('YYYY-MM-DD-HH')
}

export const getHourAMPM = (date: Date) => {
  return dayjs(date).format('h A')
}

export const getHourAMPMTable = (date: Date, minute?: number) => {
  return minute ? dayjs(date).format('hh:[' + minute + '] A') : dayjs(date).format('hh:[00] A')
}

export const getDayName = (date: Date) => {
  return ref(adjustTimezone(date).format('dddd'))
}

export const getYear = (date: Date) => {
  return ref(adjustTimezone(date).format('YYYY'))
}

export const getCurrentTimezone = ({ raw_offset, dst, dst_offset }: TimezoneResponse) => {
  const calculateTime = dst ? raw_offset + dst_offset : raw_offset
  const transformToHours = calculateTime / 3600
  return transformToHours
}
