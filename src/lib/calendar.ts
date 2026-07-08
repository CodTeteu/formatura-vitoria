function encode(value: string) {
  return encodeURIComponent(value);
}

export function buildGoogleCalendarUrl(event: {
  title: string;
  details: string;
  location: string;
  startsAt: string;
}) {
  const date = new Date(event.startsAt);
  const startStr = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const endDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);
  const endStr = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encode(
    event.title,
  )}&details=${encode(event.details)}&location=${encode(
    event.location,
  )}&dates=${startStr}/${endStr}`;
}
