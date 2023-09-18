import type { APIRoute } from 'astro';

import { auth, DEFAULT_TIME_ZONE, CALENDAR_ID } from "../../data/google_calendar";

import { google } from "googleapis";
const calendar = google.calendar("v3");

export const post: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { summary, description, startTime, endTime, timeZone, attendees } =
      await request.json();

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // https://developers.google.com/calendar/api/v3/reference/events/insert#parameters
    return calendar.events
      .insert({
        calendarId: CALENDAR_ID,
        sendUpdates: "all",
        requestBody: {
          summary,
          description,
          start: {
            dateTime: startTime,
            timeZone: timeZone || DEFAULT_TIME_ZONE,
          },
          end: {
            dateTime: endTime,
            timeZone: timeZone || DEFAULT_TIME_ZONE,
          },
          attendees,
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
            },
          },
        },
      })
      .then(() => {
        return new Response(JSON.stringify({
          status: 200,
          message: 'event created'
        }), {
          status: 200,
          statusText: "Event created",
        });
      })
      .catch((err: any) => {
        return new Response(JSON.stringify({
          err
        }), {
          status: 400,
          statusText: "Error creating event",
        });
      });
  } else {
    return new Response(JSON.stringify({
      status: 400,
      statusText: "Invalid content-type",
    }), {
      status: 400,
      statusText: "Invalid content-type",
    });
  }
};
