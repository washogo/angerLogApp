"use client";

import { Box, Button, FormControl, Select, MenuItem } from "@mui/material";

const DataSelector: React.FC = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Button
      variant="contained"
      color="inherit"
      sx={{ bgcolor: "black", color: "white" }}
    >
      日次
    </Button>
    <FormControl>
      <Select defaultValue="2024" size="small">
        <MenuItem value="2024">2024</MenuItem>
      </Select>
    </FormControl>
    <FormControl>
      <Select defaultValue="12" size="small">
        <MenuItem value="12">12</MenuItem>
      </Select>
    </FormControl>
    <FormControl>
      <Select defaultValue="03" size="small">
        <MenuItem value="03">03</MenuItem>
      </Select>
    </FormControl>
    <Button variant="contained" color="success">
      表示
    </Button>
  </Box>
);

export default DataSelector;
