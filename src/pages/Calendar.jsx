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
  Grid,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/uk";
import TimeComponent from "../components/TimeComponent";
import CloseIcon from "@mui/icons-material/Close";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [startTimeValue, setStartTimeValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEvent, setSelectEvent] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
    setShowModal(true);
  };

  const handleSelectedEvent = (event) => {
    setSelectEvent(event);
    setEventTitle(event.title);
    setStartTimeValue(event.start);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEventTitle("");
    setSelectEvent(null);
    setStartTimeValue(null);
  };

  const deleteEvent = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      handleClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectEvent) {
      const updateEvent = {
        ...selectEvent,
        title: eventTitle,
        start: startTimeValue,
        end: moment(startTimeValue).add(1, "hours").toDate(),
      };
      const updatedEvents = events.map((event) =>
        event === selectEvent ? updateEvent : event
      );
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        title: eventTitle,
        start: startTimeValue,
        end: moment(startTimeValue).add(1, "hours").toDate(),
      };
      setEvents([...events, newEvent]);
    }

    resetForm();
    setShowModal(false);
  };

  return (
    <Box sx={{ p: 2, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom>
        Календар
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Calendar
            localizer={localizer}
            events={events}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectedEvent}
            defaultDate={new Date()}
            defaultView="month"
            views={["month", "week", "day", "agenda"]}
            style={{ height: "70vh" }} // Responsive height
            messages={{
              today: "Сьогодні",
              month: "Місяць",
              week: "Тиждень",
              day: "День",
              agenda: "Календар",
              next: "Наступний",
              previous: "Попередній",
            }}
          />
        </Grid>
      </Grid>

      {showModal && (
        <Dialog open={showModal} onClose={handleClose}>
          <DialogTitle textAlign="left">
            {selectEvent ? "Змінити доступність" : "Додати доступність"}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 10,
                color: (theme) => theme.palette.error.main,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="subtitle1">
                {moment(selectedDate).format("dddd, Do MMMM YYYY")}
              </Typography>
            </DialogContentText>
            <TimeComponent
              title="Початок"
              timeValue={startTimeValue}
              onChange={(newValue) => setStartTimeValue(newValue)}
            />
            <TimeComponent title="Кінець" />
          </DialogContent>
          <DialogActions>
            {selectEvent ? (
              <Button onClick={deleteEvent} variant="contained" color="error">
                Видалити
              </Button>
            ) : (
              <Button onClick={handleClose} color="warning">
                Скасувати
              </Button>
            )}
            <Button onClick={handleSubmit} variant="contained" color="success">
              Зберегти
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CalendarPage;
