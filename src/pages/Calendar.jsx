import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import TimeComponent from "../components/TimeComponent";

moment.locale("fr-FR");
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  console.log("🚀 ~ CalendarPage ~ events:", events);
  const [eventTitle, setEventTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  console.log("🚀 ~ CalendarPage ~ selectedDate:", selectedDate);
  const [selectEvent, setSelectEvent] = useState(null);
  console.log("🚀 ~ CalendarPage ~ selectEvent:", selectEvent);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  // const handleClickOpen = () => {
  //   setShowModal(true);
  // };

  const handleSelectedEvent = (event) => {
    console.log("🚀 ~ handleSelectedEvent ~ event:", event);
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const handleClose = () => {
    setShowModal(false);
    setEventTitle("");
    setSelectEvent(null);
  };

  const deleteEvent = () => {
    console.log("deleteEvent");
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents([...updatedEvents]);
    }
    setEventTitle("");
    setShowModal(false);
  };

  return (
    <Box sx={{ height: "500px", ml: "200px" }}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
        // style={{ height: "100vh" }}
      />
      {showModal && (
        <Dialog
          open={showModal}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              // const formData = new FormData(event.currentTarget);
              // const formJson = Object.fromEntries(formData.entries());
              // console.log("🚀 ~ CalendarPage ~ formJson:", formJson);
              // const email = formJson.email;
              // console.log(email);
              if (selectEvent) {
                const updateEvent = {
                  ...selectEvent,
                  title: eventTitle,
                };
                const updatedEvents = events.map((event) => {
                  console.log("🚀 ~ CalendarPage ~ event:", event);
                  return event === selectEvent ? updateEvent : event;
                });

                setEvents(updatedEvents);
              } else {
                const newEvent = {
                  title: eventTitle,
                  start: selectedDate,
                  end: moment(selectedDate).add(1, "hours").toDate(),
                };
                setEvents([...events, newEvent]);
              }
              setShowModal(false);
              setEventTitle("");
              // handleClose();
              setSelectEvent(null);
            },
          }}
        >
          <DialogTitle textAlign="center">
            {selectEvent
              ? "Modifier une disponibilité"
              : "Ajouter une disponibilité"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="eventTitle"
              label="Event title"
              type="text"
              fullWidth
              variant="standard"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <TimeComponent />
          </DialogContent>
          <DialogActions>
            {selectEvent ? (
              <>
                <Button onClick={deleteEvent} variant="contained" color="error">
                  Suprimmer
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleClose}>Annuler</Button>
              </>
            )}
            <Button type="submit" variant="contained">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
export default CalendarPage;
