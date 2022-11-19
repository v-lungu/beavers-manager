import EnhancedTable from "../components/EnhancedTable";
import EnhancedModal from "../components/EnhancedModal";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import * as React from "react";

function createData(name, grade, tailcolor) {
  return {
    name,
    grade,
    tailcolor,
  };
}

const rows = [
  createData("Albert", 1, "green"),
  createData("Alice", 2, "red"),
  createData("Alex", 3, "blue"),
  createData("Bob", 4, "green"),
  createData("Kyle", 5, "purple"),
  createData("Vlad", 6, "violet"),
  createData("Anthony", 7, "yellow"),
  createData("Emily", 8, "pink"),
  createData("Amanda", 9, "blue"),
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
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
      />
    </>
  );
}
