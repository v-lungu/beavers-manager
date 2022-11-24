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
  Divider,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import * as React from "react";

const BASE_URL = "http://localhost:3001/";
function getHeadCells(beavers) {
  if (!beavers.length) return;
  const cols = Object.keys(beavers[0]);
  return cols.map((col) => ({
    id: col,
    numeric: false,
    disablePadding: true,
    label: `${col[0].toUpperCase()}${col.slice(1)}`,
  }));
}

function parseBeavers(beavers) {
  if (!beavers.length) return;
  return beavers.map((beaver, idx) => ({
    id: `${beaver.name}-${beaver.email}`,
    ...beaver,
  }));
}

function parseGuardians(guardians) {
  if (!guardians.length) return;
  return guardians.map((guardian) => ({
    id: guardian.email,
    ...guardian,
  }));
}

const fetchJson = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

export default function Beaver() {
  const [beaverRows, setBeaverRows] = React.useState([]);
  const [headCells, setHeadCells] = React.useState([]);
  const [headGuardianCells, setHeadGuardianCells] = React.useState([]);
  const [guardianRows, setGuardianRows] = React.useState([]);
  const [beaverDetails, setBeaverDetails] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [grade, setGrade] = React.useState("");
  const [color, setColor] = React.useState("");

  const fetchBeavers = async (queryParams) => {
    const baseUrl = `${BASE_URL}beavers`;
    const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
    const beavers = await fetchJson(url);
    const parsedBeavers = parseBeavers(beavers);
    setBeaverRows(parsedBeavers);
    const parsedHeadCells = getHeadCells(beavers);
    setHeadCells(parsedHeadCells);
  };

  const fetchGuardian = async (queryParams) => {
    const baseUrl = `${BASE_URL}guardians`;
    const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
    const guardians = await fetchJson(url);
    const parsedGuardians = parseGuardians(guardians);
    setGuardianRows(parsedGuardians);
    setHeadGuardianCells(getHeadCells(guardians));
  };

  const fetchBeaverDetails = async (email, name) => {};

  React.useEffect(() => {
    fetchBeavers();
    fetchGuardian();
  }, []);

  const handleBeaverColumnSelected = (columns) => {
    fetchBeavers(`columns=${columns.join(",")}`);
  };

  const handleBeaverSelected = (beaver) => {
    console.log(beaver);
  };

  const handleGuardianColumnSelected = (columns) => {
    fetchGuardian(`columns=${columns.join(",")}`);
  };

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
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="green">Green</MenuItem>
          </Select>
        </FormControl>
      </div>
      <EnhancedTable
        headCells={headCells}
        title="Beavers"
        rows={beaverRows}
        onColumnSelected={handleBeaverColumnSelected}
        onRowSelected={handleBeaverSelected}
      />
      <Divider />
      <EnhancedTable
        headCells={headGuardianCells}
        title="Guardians"
        rows={guardianRows}
        onColumnSelected={handleGuardianColumnSelected}
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
