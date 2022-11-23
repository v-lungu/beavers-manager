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
import SendIcon from "@mui/icons-material/Send";
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

export default function EnhancedModal(props) {
  const { handleClose, open, title, create = false } = props;
  const buttonText = create ? "Add" : "Edit";

  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      grade: "",
      guardianName: "",
      email: "",
      phone: "",
    }
  );

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const createBeaver = async () => {
      await fetch("http://localhost:3001/beavers", {
        method: "post",
        body: JSON.stringify(formInput),
        headers: { "Content-Type": "application/json" },
      });
    };

    createBeaver();
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
          {title}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Fill in beaver information
        </Typography>
        <div className={styles.textContainer}>
          <TextField
            required
            id="first-name-required"
            label="Name"
            name="name"
            sx={{ mb: 2 }}
            onChange={handleInput}
          />
        </div>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="grade-select-label">Grade</InputLabel>
          <Select
            labelId="grade-select-label"
            id="grade-select"
            value={formInput.grade}
            label="Grade"
            name="grade"
            onChange={handleInput}
          >
            <MenuItem value={"SK"}>SK</MenuItem>
            <MenuItem value={"JK"}>JK</MenuItem>
            <MenuItem value={"01"}>01</MenuItem>
            <MenuItem value={"02"}>02</MenuItem>
            <MenuItem value={"02"}>02</MenuItem>
          </Select>
        </FormControl>

        {create && (
          <>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              Fill in guardian information
            </Typography>
            <div className={styles.textContainer}>
              <TextField
                id="name-guardian"
                label="Name"
                sx={{ mb: 2 }}
                name="guardianName"
                onChange={handleInput}
              />
              <TextField
                id="phone"
                label="Phone"
                sx={{ mb: 2 }}
                name="phone"
                onChange={handleInput}
              />
              <TextField
                required
                id="email"
                label="Email"
                name="email"
                onChange={handleInput}
              />
            </div>{" "}
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#eb0b2b",
            marginTop: 2,
          }}
        >
          {buttonText} <SendIcon sx={{ width: 20, paddingLeft: 1 }} />
        </Button>
      </Box>
    </Modal>
  );
}
