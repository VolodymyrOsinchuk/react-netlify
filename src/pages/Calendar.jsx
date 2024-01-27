import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import eventsData from "../components/events";
const localizer = momentLocalizer(moment);
// console.log("🚀 ~ localizer:", localizer);

const CalendarPage = () => {
  const [events, setEvents] = useState(eventsData);

  return (
    <Calendar
      localizer={localizer}
      defaultDate={new Date()}
      defaultView="month"
      events={events}
      style={{ height: "100vh" }}
    />
  );
};
export default CalendarPage;
