import EnhancedTable from "../components/EnhancedTable";
import Image from "next/image";
import styles from "../styles/Home.module.css";
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
  return (
    <>
      <div className={styles.background}>
        <Image src="/kid.jpg" alt="background" fill />
      </div>
      <EnhancedTable
        headCells={headCells}
        title="Beavers"
        rows={rows}
        headLabels={headLabels}
      />
      );
    </>
  );
}
