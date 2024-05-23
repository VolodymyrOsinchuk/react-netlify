import { useState } from "react";
import { Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const EventCalendar = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  console.log("🚀 ~ EventCalendar ~ selectedTime:", {
    selectedTime: selectedTime && new Date(selectedTime).toLocaleTimeString(),
  });

  return (
    <Box sx={{ ml: "20rem", height: "600px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Basic time picker"
            ampm={false}
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};
export default EventCalendar;
