import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import * as React from "react";

import styles from "../styles/Home.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #17316d",
  boxShadow: 24,
  p: 4,
};

export default function FilterModal(props) {
  const { handleClose, open, columns, onColumnSelected, onFiltered } = props;
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      selectedColumns: [],
      column: "",
      operator: "",
      value: "",
    }
  );

  React.useEffect(() => {
    setFormInput({ selectedColumns: columns });
  }, [columns.length]);

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleColumnSelected = (column, isChecked) => {
    let selectedColumns;
    if (isChecked) {
      selectedColumns = formInput.selectedColumns.filter(
        (col) => col !== column
      );
    } else {
      selectedColumns = [...formInput.selectedColumns, column];
    }

    setFormInput({ selectedColumns });
    onColumnSelected?.(selectedColumns);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onFiltered?.(formInput);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" noValidate sx={style} onSubmit={handleSubmit}>
        {onColumnSelected && (
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select Columns
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormGroup>
                {columns.map((column) => {
                  const isChecked = formInput.selectedColumns.includes(column);
                  return (
                    <FormControlLabel
                      key={column}
                      control={
                        <Checkbox
                          key={column}
                          checked={isChecked}
                          onChange={() =>
                            handleColumnSelected(column, isChecked)
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={column}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </div>
        )}

        {onFiltered && (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Filter Columns
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="grade-select-label">Column</InputLabel>
              <Select
                labelId="column-select-label"
                id="column-select"
                value={formInput.column}
                label="Column"
                name="column"
                onChange={handleInput}
              >
                {columns.map((column) => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="operator-select-label">Operator</InputLabel>
              <Select
                labelId="operator-select-label"
                id="operator-select"
                value={formInput.operator}
                label="Operator"
                name="operator"
                onChange={handleInput}
              >
                <MenuItem value="equals">equals</MenuItem>
                <MenuItem value="notEquals">not equals</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="name-guardian"
                label="Value"
                sx={{ mb: 2 }}
                name="value"
                onChange={handleInput}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#eb0b2b",
              }}
            >
              Filter <FilterList sx={{ width: 20, paddingLeft: 1 }} />
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
