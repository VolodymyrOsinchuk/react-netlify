import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { useState } from "react";

const TimeComponent = ({ title, timeValue, onChange }) => {
  console.log("🚀 ~ TimeComponent ~ onChange :", onChange);
  console.log("🚀 ~ TimeComponent ~ timeValue:", timeValue);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          label={title}
          value={timeValue}
          onChange={onChange}
          ampm={false}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
export default TimeComponent;
