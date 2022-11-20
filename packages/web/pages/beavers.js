import EnhancedTable from "../components/EnhancedTable";
import EnhancedModal from "../components/EnhancedModal";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import * as React from "react";

function createData(name, lastName, grade, tailcolor) {
  return {
    name,
    lastName,
    grade,
    tailcolor,
  };
}

const rows = [
  createData("Albert", "Bradley", 1, "green"),
  createData("Alice", "Smith", 2, "red"),
  createData("Alex", "Morris", 3, "blue"),
  createData("Bob", "Bradley", 4, "green"),
  createData("Kyle", "Bradley", 5, "purple"),
  createData("Vlad", "Bradley", 6, "violet"),
  createData("Anthony", "Bradley", 7, "yellow"),
  createData("Emily", "Bradley", 8, "pink"),
  createData("Amanda", "Bradley", 9, "blue"),
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
        create
      />
    </>
  );
}
