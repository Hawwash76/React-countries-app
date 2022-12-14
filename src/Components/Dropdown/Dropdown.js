import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function Dropdown({
  placeholder,
  dropdownItems,
  setDropdownValue,
  dropdownValue,
}) {
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
        {dropdownValue === "" && placeholder}
      </InputLabel>
      <Select
        onChange={(event) => setDropdownValue(event.target.value)}
        value={dropdownValue}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          fontSize: "0.9rem",
          "& fieldset": { border: "none" },
        }}
      >
        {dropdownItems.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
