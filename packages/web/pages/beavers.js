import EnhancedTable from "../components/EnhancedTable";
import EnhancedModal from "../components/EnhancedModal";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import * as React from "react";

function createData(id, name, lastName, grade, tailcolor) {
  return {
    id,
    name,
    lastName,
    grade,
    tailcolor,
  };
}

const rows = [
  createData(1, "Albert", "Bradley", 1, "green"),
  createData(2, "Alice", "Smith", 2, "red"),
  createData(3, "Alex", "Morris", 3, "blue"),
  createData(4, "Bob", "Bradley", 4, "green"),
  createData(5, "Kyle", "Bradley", 5, "purple"),
  createData(6, "Vlad", "Bradley", 6, "violet"),
  createData(7, "Anthony", "Bradley", 7, "yellow"),
  createData(8, "Emily", "Bradley", 8, "pink"),
  createData(9, "Amanda", "Bradley", 9, "blue"),
];

const headCells = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "grade",
    numeric: true,
    disablePadding: true,
    label: "Grade",
  },
  {
    id: "tail",
    numeric: false,
    disablePadding: true,
    label: "Tail Color",
  },
];

const headLabels = ["Name", "Grade", "Tail Color"];
export default function Beaver() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [grade, setGrade] = React.useState("");
  const [color, setColor] = React.useState("");

  React.useEffect(() => {}, [grade, color]);

  return (
    <>
      <div className={styles.background}>
        <Image src="/kid.jpg" alt="background" fill />
      </div>
      <div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#eb0b2b",
            margin: 4,
            position: "absolute",
            right: 10,
          }}
          onClick={handleOpen}
          endIcon={<PersonAdd />}
        >
          Add Beaver
        </Button>
      </div>
      <div>
        <FormControl sx={{ margin: 2, width: 150, backgroundColor: "#f5f5f5" }}>
          <InputLabel id="grade-select-label">Grade</InputLabel>
          <Select
            labelId="grade-select-label"
            id="grade-select"
            value={grade}
            label="Grade"
            name="grade"
            onChange={(event) => setGrade(event.target.value)}
          >
            <MenuItem value={"one"}>One</MenuItem>
            <MenuItem value={"two"}>Two</MenuItem>
            <MenuItem value={"three"}>Three</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ margin: 2, width: 150, backgroundColor: "#f5f5f5" }}>
          <InputLabel id="color-select-label">Tail Color</InputLabel>
          <Select
            labelId="color-select-label"
            id="color-select"
            value={color}
            label="color"
            name="color"
            onChange={(event) => setColor(event.target.value)}
          >
            <MenuItem value={"blue"}>Blue</MenuItem>
            <MenuItem value={"red"}>Red</MenuItem>
            <MenuItem value={"green"}>Green</MenuItem>
          </Select>
        </FormControl>
      </div>
      <EnhancedTable
        headCells={headCells}
        title="Beavers"
        rows={rows}
        headLabels={headLabels}
      />
      <EnhancedModal
        handleClose={handleClose}
        open={open}
        title="Create New Beaver"
        create
      />
    </>
  );
}
