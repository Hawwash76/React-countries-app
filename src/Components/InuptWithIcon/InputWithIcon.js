import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function Input({ children, placeholder, setInput }) {
  return (
    <>
      <TextField
        onChange={(event) => setInput(event.target.value.trim())}
        color="primary"
        sx={{
          input: {
            "&::placeholder": {
              color: "var(--Font-secondary)",
            },
            color: "var(--Font-primary)",
          },
          "& fieldset": { border: "none" },
          ":focus": { border: "2px solid black" },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              border: "2px solid rgb(110, 186, 236)",
            },
          },
        }}
        className="input rounded-border box-shadow"
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{children}</InputAdornment>
          ),
        }}
      />
    </>
  );
}
