import EnhancedTable from "../components/EnhancedTable";
import EnhancedModal from "../components/EnhancedModal";
import CompactTable from "../components/CompactTable";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import {
  Button,
  Divider,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { PersonAdd, Insights } from "@mui/icons-material";
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
  const [gradeStatistics, setGradeStatistics] = React.useState(null);
  const [overworkedGuardians, setOverworkedGuardians] = React.useState(null);
  const [guardiansWithEagerBeavers, setGuardiansWithEagerBeavers] =
    React.useState(null);
  const [completionistBeavers, setCompletionistBeavers] = React.useState(null);

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

  const fetchBeaverDetails = async (id) => {
    const url = `${BASE_URL}beavers/${id}`;
    const beavers = await fetchJson(url);
    const parsedBeavers = parseBeavers(beavers);
    setBeaverDetails(parsedBeavers[0]);
  };

  const fetchGradeStatistics = async () => {
    const statistics = await fetchJson(`${BASE_URL}grade-statistics`);
    setGradeStatistics(statistics);
  };

  const fetchOverworkedGuardians = async () => {
    const overworkedGuardians = await fetchJson(
      `${BASE_URL}overworked-guardians`
    );
    setOverworkedGuardians(overworkedGuardians);
  };

  const fetchGuardiansWithEagerBeavers = async () => {
    const guardiansWithEagerBeavers = await fetchJson(
      `${BASE_URL}eager-beaver-guardians`
    );
    setGuardiansWithEagerBeavers(guardiansWithEagerBeavers);
  };

  const fetchCompletionistBeavers = async () => {
    const completionistBeavers = await fetchJson(`${BASE_URL}completionists`);
    setCompletionistBeavers(completionistBeavers);
  };

  React.useEffect(() => {
    fetchBeavers();
    fetchGuardian();
  }, []);

  const handleBeaverColumnSelected = (columns) => {
    fetchBeavers(`columns=${columns.join(",")}`);
  };

  const handleBeaverSelected = (beaver) => {
    if (beaver.length) {
      fetchBeaverDetails(beaver[0]);
    } else {
      setBeaverDetails(null);
    }
  };

  const handleGuardianColumnSelected = (columns) => {
    fetchGuardian(`columns=${columns.join(",")}`);
  };

  const handleBeaverFiltered = ({ column, operator, value }) => {
    fetchBeavers(`column=${column}&operator=${operator}&value=${value}`);
  };

  const handleCreateBeaver = () => {
    handleClose();
    fetchBeavers();
    fetchGuardian();
  };

  return (
    <>
      <div className={styles.background}>
        <Image src="/kid.jpg" alt="background" fill />
      </div>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#a6bc8",
          }}
          onClick={fetchOverworkedGuardians}
          endIcon={<Insights />}
        >
          Get Overworked Guardians
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#a6bc8",
          }}
          onClick={fetchGuardiansWithEagerBeavers}
          endIcon={<Insights />}
        >
          Get Guardians of Eager Beavers
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#a6bc8",
          }}
          onClick={fetchCompletionistBeavers}
          endIcon={<Insights />}
        >
          Get Completionist Beavers
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#a6bc8",
          }}
          onClick={fetchGradeStatistics}
          endIcon={<Insights />}
        >
          Get Grade Statistics
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#eb0b2b",
          }}
          onClick={handleOpen}
          endIcon={<PersonAdd />}
        >
          Add Beaver
        </Button>
      </Stack>

      {gradeStatistics && (
        <CompactTable title="Grade Statistics" data={gradeStatistics} />
      )}

      {overworkedGuardians && (
        <CompactTable title="Overworked Guardians" data={overworkedGuardians} />
      )}

      {guardiansWithEagerBeavers && (
        <CompactTable
          title="Guardians With Eager Beavers"
          data={guardiansWithEagerBeavers}
        />
      )}

      {completionistBeavers && (
        <CompactTable
          title="Completionist Beavers"
          data={completionistBeavers}
        />
      )}

      <EnhancedTable
        headCells={headCells}
        title="Beavers"
        rows={beaverRows}
        onColumnSelected={handleBeaverColumnSelected}
        onRowSelected={handleBeaverSelected}
        onFiltered={handleBeaverFiltered}
      />

      {beaverDetails && (
        <Box sx={{ width: "80%", mx: 16, mb: 16, mt: -12 }}>
          <Card>
            <CardContent>
              <Typography variant="h5">Guardian</Typography>
              <Typography sx={{ mb: 1.5 }}>
                {beaverDetails.guardianname} ({beaverDetails.phone_number})
              </Typography>
              <Typography variant="h5">Tail Colour</Typography>
              <Typography>{beaverDetails.tail_color}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      <Divider />

      <EnhancedTable
        headCells={headGuardianCells}
        title="Guardians"
        rows={guardianRows}
        onColumnSelected={handleGuardianColumnSelected}
      />

      {open && (
        <EnhancedModal
          handleClose={handleCreateBeaver}
          open={true}
          title="Create New Beaver"
          create
        />
      )}
    </>
  );
}
