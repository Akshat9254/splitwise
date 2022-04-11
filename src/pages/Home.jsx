import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import SplitWise from "./SplitWise";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const addUser = () => {
    setUsers((prev) => [...prev, name]);
    setName("");
  };

  const deleteUser = (userToDelete) => {
    setUsers((prev) => prev.filter((user) => user !== userToDelete));
  };

  const handleSubmit = () => {
    if (users.length < 2) {
      alert("Enter atleast two users");
      return;
    }

    setShow(true);
    document.getElementById("initialTransactions").scrollIntoView();
  };

  return (
    <>
      <Grid
        container
        direction={"column"}
        justifyContent="center"
        spacing={5}
        padding={4}
      >
        <Grid item>
          <Typography variant="h3" align="center" gutterBottom>
            Welcome to SplitWise App
          </Typography>
        </Grid>

        <Grid item>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              label="Add User"
              variant="standard"
              value={name}
              // (e) => this.setState({...this.state, comment: e.target.value})
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant={"contained"} onClick={addUser}>
              Add
            </Button>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <List dense={false}>
              {users.map((user) => (
                <ListItem
                  key={user}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteUser(user)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant={"contained"}
              endIcon={<SendIcon />}
              size={"large"}
              onClick={handleSubmit}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>

      {show && <SplitWise users={users} />}
    </>
  );
};

export default Home;
