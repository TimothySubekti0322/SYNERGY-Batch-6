import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DropdownProps {
  value: string | number;
  handleChange: (event: SelectChangeEvent) => void;
  data: number[];
}
const Dropdown: React.FC<DropdownProps> = ({ value, handleChange, data }) => {
  return (
    <FormControl fullWidth sx={{ width: 1 }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value.toString()}
        onChange={handleChange}
      >
        {data.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
