import EnhancedTable from "../components/EnhancedTable";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as React from "react";

function createData(id, name, eventType, eventName) {
  return {
    id,
    name,
    eventType,
    eventName,
  };
}

const rows = [
  createData(1, "Albert", "Song", "Twinkle Twinkle", "abc@gmail.com"),
  createData(2, "Vlad", "Skit", "Skit #1", "abc@gmail.com"),
  createData(3, "Kyle", "Badge", "Forest", "abc@gmail.com"),
];

const headCells = [
  {
    id: "beaverName",
    numeric: false,
    disablePadding: true,
    label: "Beaver Name",
  },
  {
    id: "eventType",
    numeric: false,
    disablePadding: true,
    label: "Event Type",
  },
  {
    id: "eventName",
    numeric: false,
    disablePadding: true,
    label: "Event Name",
  },
];

export default function Logs() {
  return (
    <>
      <div className={styles.background}>
        <Image src="/logs.jpg" alt="background" fill />
      </div>
      <EnhancedTable headCells={headCells} title="Logs" rows={rows} />
    </>
  );
}
