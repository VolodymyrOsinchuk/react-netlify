import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import * as moment from "moment";
import "moment/locale/uk";
import TimeComponent from "../components/TimeComponent";
import CloseIcon from "@mui/icons-material/Close";

const localizer = momentLocalizer(moment);

const culture = ["uk-UA"];

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [startTimeValue, setStartTimeValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEvent, setSelectEvent] = useState(null);
  console.log("🚀 ~ CalendarPage ~ selectEvent:", selectEvent);

  const handleSelectSlot = (slotInfo) => {
    console.log("🚀 ~ handleSelectSlot ~ slotInfo:", slotInfo);
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    console.log("🚀 ~ handleSelectedEvent ~ event:", event);
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
    setStartTimeValue(event.start);
  };

  const handleClose = () => {
    setShowModal(false);
    setEventTitle("");
    setSelectEvent(null);
    setStartTimeValue(null);
  };

  const deleteEvent = () => {
    console.log("deleteEvent");
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents([...updatedEvents]);
    }
    setEventTitle("");
    setStartTimeValue(null);
    setShowModal(false);
  };

  return (
    <Box sx={{ height: "500px", ml: "200px" }}>
      <Calendar
        localizer={localizer}
        culture={culture}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
        showMultiDayTimes
        dayLayoutAlgorithm="overlap"
        // style={{ margin: "50px" }}
        messages={{
          next: "Наступний",
          previous: "Попередній",
          today: "Сьогодні",
          month: "Місяць",
          week: "Тиждень",
          day: "День",
          agenda: "Календар",
        }}
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
                  start: startTimeValue,
                };
                const updatedEvents = events.map((event) => {
                  console.log("🚀 ~ CalendarPage ~ event:", event);
                  return event === selectEvent ? updateEvent : event;
                });

                setEvents(updatedEvents);
              } else {
                const newEvent = {
                  start: startTimeValue,
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
          <DialogTitle textAlign="left">
            {selectEvent ? "Змінити доступність" : "Додати доступність"}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 10,
              color: (theme) => theme.palette.error.dark,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <DialogContentText>
              <Typography variant="p" textTransform="uppercase">
                {moment(selectedDate).format("dddd Do MMMM YYYY")}
              </Typography>
            </DialogContentText>
            {/* <TextField
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
            /> */}
            <TimeComponent
              title="Початок"
              timeValue={startTimeValue}
              onChange={(newValue) => setStartTimeValue(newValue)}
            />
            <TimeComponent title="Кінець" />
          </DialogContent>
          <DialogActions>
            {selectEvent ? (
              <>
                <Button onClick={deleteEvent} variant="contained" color="error">
                  Видалити
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleClose} color="warning">
                  Скасувати
                </Button>
              </>
            )}
            <Button type="submit" variant="contained" color="success">
              Зберегти
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
export default CalendarPage;
