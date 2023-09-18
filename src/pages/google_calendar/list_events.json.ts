import type { APIRoute } from 'astro';
import { google } from "googleapis";

import { auth, DEFAULT_TIME_ZONE } from "../../data/google_calendar";

const calendar = google.calendar("v3");

export const get: APIRoute = async ({ request, params }) => {
  const { url } = request;
  const parsedUrl = new URL(url);
  let timeMin = new Date(parsedUrl.searchParams.get("timeMin") as string);
  let timeMax = new Date(parsedUrl.searchParams.get("timeMax") as string);
  let timeZone = parsedUrl.searchParams.get("timeZone");

  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  // https://developers.google.com/calendar/api/v3/reference/events/list#parameters
  const apiCallParams = {
    calendarId: "primary",
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    timeZone: timeZone || DEFAULT_TIME_ZONE,
    singleEvents: true,
    maxResults: 30,
    orderBy: "startTime",
  };

  return calendar.events
    .list(apiCallParams)
    .then(({ data }: any) => {
      const events = data.items;
      let response: { start: any; end: any; }[] = [];

      if (events && events.length > 0) {
        response = events.map((event: any) => {
          return {
            start: event.start,
            end: event.end,
          };
        });
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        statusText: "Event created",
      });
    })
    .catch((err: any) => {
      return new Response(null, {
        status: 400,
        statusText: "Error listing events",
      });
    });
};
