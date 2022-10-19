import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

export default function Dropdown({ placeholder, items }) {
  const [selectValue, setSelectValue] = useState("");
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(true);
    setSelectValue(event.target.value);
  };

  return (
    <FormControl hiddenLabel className="dropdown" sx={{ minWidth: 80 }}>
      <InputLabel
        shrink={false}
        sx={{
          fontSize: "0.9rem",
          "&.Mui-focused": {
            color: "var(--Font-primary)",
          },
          color: "var(--Font-primary)",
          ".MuiSvgIcon-root ": {
            fill: "white !important",
          },
        }}
      >
        {selected === "" && placeholder}
      </InputLabel>
      <Select
        onChange={handleChange}
        value={selectValue}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          fontSize: "0.9rem",
          "& fieldset": { border: "none" },
        }}
      >
        {items.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
