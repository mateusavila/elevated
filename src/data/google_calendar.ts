import { google } from "googleapis";

const credentials = JSON.parse(
  import.meta.env.VITE_GCALENDAR_SERVICE_ACCOUNT_CREDENTIAL
)

export const CALENDAR_ID = "rachel@weareelevated.co";

export const DEFAULT_TIME_ZONE = "America/New_York";

export const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/calendar"],
  clientOptions: {
    subject: CALENDAR_ID,
  },
});
