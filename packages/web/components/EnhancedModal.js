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
  Icon,
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
  const { handleClose, open, title } = props;

  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      grade: "",
      tail: "",
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
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          *Fill in beaver information*
        </Typography>
        <div className={styles.textContainer}>
          <TextField
            required
            id="first-name-required"
            label="First Name"
            name="firstName"
            sx={{ mb: 2 }}
            onChange={handleInput}
          />
          <TextField id="last-name" label="Last Name" />
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
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="tail-select-label">Tail Color</InputLabel>
          <Select
            labelId="tail-select-label"
            id="tail-select"
            value={formInput.tailColor}
            label="Tail Color"
            name="tail"
            onChange={handleInput}
          >
            <MenuItem value={"red"}>Red</MenuItem>
            <MenuItem value={"green"}>Green</MenuItem>
            <MenuItem value={"blue"}>Blue</MenuItem>
          </Select>
        </FormControl>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          *Fill in guardian information*
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
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#eb0b2b",
          }}
        >
          Add <SendIcon sx={{ width: 20, paddingLeft: 1 }} />
        </Button>
      </Box>
    </Modal>
  );
}
