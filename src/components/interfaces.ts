export interface HourInterface {
  hour: string
  number: number
  ampm: string
  status?: boolean,
  clientHour?: string
}

export interface GuestInterface {
  displayName: string
  email: string
}

export interface ListEvents{
  start: Date
  end: Date
  timeZone: string
}

export interface TimezoneList {
  name: string
  offset: number
}

export interface TimezoneResponse {
  abbreviation:	string
  client_ip:	string
  datetime: string
  day_of_week: number
  day_of_year: number
  dst: boolean
  dst_from: string
  dst_offset: number
  dst_until: string
  raw_offset: number
  timezone: string
  unixtime: number
  utc_datetime: string
  utc_offset: string
  week_number: number
}

export interface HoursList {
  day: Date
  status: boolean
  userDay: Date
}


export interface AttendeesInterface {
  displayName: string
  email: string
}
export interface MeetingForm {
  summary: string
  description: string | undefined
  startTime: Date,
  endTime: Date,
  timeZone: string
  attendees: AttendeesInterface[]
}