import Context from "../context";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Content = () => {
  const users = React.useContext(Context);

  const renderMedia = (avatar) => {
    return <Avatar justify="center" src={avatar} />;
  };

  const removeElement = (e) => {
    const elementToRemove = e.currentTarget.parentElement.parentElement;
    elementToRemove.remove();
  };

  const renderButtons = (e) => {
    return (
      <div>
        <Button variant="text" color="secondary">
          EDIT
        </Button>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={(e) => removeElement(e)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    );
  };

  return users ? (
    <>
      <Stack direction="row" justifyContent="end">
        <Button
          color="secondary"
          variant="outlined"
          size="medium"
          sx={{ mb: 7 }}
        >
          CREATE NEW USER
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="ight">Avatar</TableCell>
              <TableCell align="ight">First</TableCell>
              <TableCell align="ight">Last</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, avatar, fname, lname, username }) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{renderMedia(avatar)}</TableCell>
                <TableCell align="left">{fname}</TableCell>
                <TableCell align="left">{lname}</TableCell>
                <TableCell align="left">{username}</TableCell>
                <TableCell align="left">{renderButtons()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <Stack sx={{ display: "flex" }} alignItems="center">
      <CircularProgress color="secondary" />
    </Stack>
  );
};

export default Content;
