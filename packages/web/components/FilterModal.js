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
  const { handleClose, open } = props;

  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      column: "",
      operator: "",
      value: "",
    }
  );

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let data = { formInput };
    console.log(data);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" noValidate sx={style} onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Filter Beaver List
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
            <MenuItem value={"name"}>Name</MenuItem>
            <MenuItem value={"grade"}>Grade</MenuItem>
            <MenuItem value={"tailColor"}>Tail Color</MenuItem>
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
            <MenuItem value={"equals"}>equals</MenuItem>
            <MenuItem value={"notEquals"}>not equals</MenuItem>
            <MenuItem value={"greaterThan"}>greater than</MenuItem>
            <MenuItem value={"lessThan"}>less than</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.textContainer}>
          <TextField
            id="name-guardian"
            label="Value"
            sx={{ mb: 2 }}
            name="value"
            onChange={handleInput}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#eb0b2b",
            marginTop: 2,
          }}
        >
          Filter <FilterList sx={{ width: 20, paddingLeft: 1 }} />
        </Button>
      </Box>
    </Modal>
  );
}
