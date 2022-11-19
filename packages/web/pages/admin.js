import EnhancedTable from "../components/EnhancedTable";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as React from "react";

function createData(name, eventType, eventName) {
  return {
    name,
    eventType,
    eventName,
  };
}

const rows = [
  createData("Albert", "Song", "Twinkle Twinkle", "abc@gmail.com"),
  createData("Vlad", "Skit", "Skit #1", "abc@gmail.com"),
  createData("Kyle", "Badge", "Forest", "abc@gmail.com"),
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

export default function Admin() {
  return (
    <>
      <div className={styles.background}>
        <Image src="/admin.jpg" alt="background" fill />
      </div>
      <EnhancedTable headCells={headCells} title="Admin" rows={rows} />
    </>
  );
}
