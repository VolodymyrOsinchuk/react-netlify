import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import * as moment from "moment";
import "moment/locale/uk";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedTimeStart, setSelectedTimeStart] = useState(null);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);

  const handleSelect = ({ start, end }) => {
    console.log("🚀 ~ handleSelect ~ end:", end);
    console.log("🚀 ~ handleSelect ~ start:", start);
    setOpenDialog(true);
    setSelectedTimeStart(new Date(selectedTimeStart));
    setSelectedEvent(null);
    setEvents([...events, title, start, end]);
  };

  const handleSelectEvent = (event) => {
    console.log("handleSelectEvent", event);
    setOpenDialog(true);
    setSelectedEvent(event);
    setTitle(event.title);
    setSelectedTimeStart();
  };

  const handleDialogClose = () => {
    console.log("handleDialogClose");
    setOpenDialog(false);
    setSelectedEvent(null);
    setTitle("");
    setSelectedTimeStart(null);
    setSelectedTimeEnd(null);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      const updateEvent = { ...selectedEvent };
      console.log("🚀 ~ handleSaveEvent ~ updateEvent:", updateEvent);
      // update existing event
      const updatedEvents = events.map((event) => {
        return event === selectedEvent ? updateEvent : event;
      });
      setEvents(updatedEvents);
    } else {
      // add new event
      const data = {
        title,
        start: new Date(selectedTimeStart),
        end: new Date(selectedTimeEnd),
      };
      setEvents([...events, data]);
    }
    handleDialogClose();
    setTitle("");
    setSelectedTimeStart(null);
    setSelectedTimeEnd(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEvent.id)
      );
    }
    handleDialogClose();
  };

  return (
    <Box sx={{ ml: "200px", height: "600px" }}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        defaultDate={new Date()}
        endAccessor="end"
        selectable
        events={events}
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        messages={{
          next: "Наступний",
          previous: "Попередній",
          today: "Сьогодні",
          month: "Місяць",
          week: "Тиждень",
          day: "День",
          agenda: "Календар",
        }}
        // onSelectSlot={(data) =>
        //   console.log("Select Slot: " + JSON.stringify(data))
        // }
        // onSelectEvent={(data) => console.log("Select Event: " + data)}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle textAlign="left">
          {selectedEvent ? "Змінити доступність" : "Додати доступність"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
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
              {moment(selectedTimeStart).format("dddd Do MMMM YYYY")}
            </Typography>
          </DialogContentText>
          <TextField
            label="title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker, TimePicker"]}>
              <Box mb={2} mt={5}>
                <TimePicker
                  label="debut"
                  value={selectedTimeStart}
                  onChange={(time) => setSelectedTimeStart(time)}
                  ampm={false}
                  // minutesStep={5}
                />
              </Box>
              <TimePicker
                label="Fin"
                value={selectedTimeEnd}
                onChange={(time) => setSelectedTimeEnd(time)}
                ampm={false}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          {selectedEvent ? (
            <Button
              onClick={handleDeleteEvent}
              variant="contained"
              color="error"
            >
              Видалити
            </Button>
          ) : (
            <Button onClick={handleDialogClose} color="warning">
              Скасувати
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSaveEvent}
          >
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default BigCalendar;
