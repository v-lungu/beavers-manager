import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Paper,
  TableContainer,
  TableBody,
  Table,
  TablePagination,
  tableCellClasses,
  tableSortLabelClasses,
  styled,
} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { FilterList, Delete, ModeEdit } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import EnhancedModal from "./EnhancedModal";
import FilterModal from "./FilterModal";

const BASE_URL = "http://localhost:3001/";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#17316d",
    fontSize: 18,
    fontWeight: "bold",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledLabel = styled(TableSortLabel)(({ theme }) => ({
  [`&.${tableSortLabelClasses.active}`]: {
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    selected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;

  const numSelected = selected.length;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all entities",
            }}
          />
        </StyledTableCell>
        {headCells?.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {" "}
            <StyledLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </StyledLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array,
};

function EnhancedTableToolbar(props) {
  const { selected, title, columns, onColumnSelected, onFiltered } = props;
  const numSelected = selected.length;
  const [open, setOpen] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  const handleEdit = () => {
    if (numSelected === 1) {
      handleOpen();
    }
  };

  const handleDelete = () => {
    if (title !== "Guardians") return;
    const deleteGuardian = async () => {
      await fetch(`${BASE_URL}guardians/${selected[0]}`, {
        method: "delete",
      });
    };
    deleteGuardian();
    console.log("deleted");
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%", fontWeight: "bold" }}
            variant="h4"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}

        {numSelected > 0 ? (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <ModeEdit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={handleOpenFilter}>
              <FilterList />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>

      {open && selected && (
        <EnhancedModal
          handleClose={handleClose}
          open={true}
          title="Edit Beaver"
          selected={selected}
        />
      )}

      <FilterModal
        handleClose={handleCloseFilter}
        open={openFilter}
        columns={columns}
        onColumnSelected={onColumnSelected}
        onFiltered={onFiltered}
      />
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const getColumns = (row) => Object.keys(row).filter((col) => col !== "id");

export default function EnhancedTable(props) {
  const {
    rows,
    headCells,
    title,
    onColumnSelected,
    onRowSelected,
    onFiltered,
  } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("grade");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allColumns, setAllColumns] = React.useState([]);
  const columns = getColumns(rows?.[0] ?? {});
  const rowCount = rows?.length || 0;

  React.useEffect(() => {
    if (rowCount && !allColumns.length) {
      setAllColumns(getColumns(rows[0]));
    }
  }, [rows, allColumns]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onRowSelected?.(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowCount) : 0;

  return (
    <Box sx={{ width: "80%", mx: "auto", my: 8 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          title={title}
          columns={allColumns}
          onColumnSelected={onColumnSelected}
          onFiltered={onFiltered}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              selected={selected}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowCount}
              headCells={headCells}
            />
            <TableBody>
              {rows
                ?.sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </StyledTableCell>
                      {columns.map((col) => {
                        return (
                          <StyledTableCell align="left" key={col}>
                            {row[col]}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
              {rowCount === 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6}>No data found</StyledTableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

EnhancedTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array,
  title: PropTypes.string.isRequired,
};
