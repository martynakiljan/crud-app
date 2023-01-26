/** @format */

import Context from "../utilis/context";

import React, { useState } from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  CircularProgress,
  Avatar,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteUsers from "../API/deleteUsers";

const TableContent = () => {
  const users = React.useContext(Context);

  const renderMedia = (avatar) => {
    return <Avatar justify="center" src={avatar} />;
  };

  const getID = (e) => {
    const tableRow = e.currentTarget.parentElement.parentElement.parentElement;
    const id = tableRow.querySelector(".table-row-id").innerHTML;
    deleteUsers(id);

    getResponseFromAPI();
  };

  const [messageFromDeleteUserAPI, setMessageFromDataUserAPI] = useState(null);

  const getResponseFromAPI = async () => {
    const response = await deleteUsers();
    setMessageFromDataUserAPI(response.message);
    refreshPage();
    return response;
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const renderButtons = (e) => {
    return (
      <div>
        <Button variant="text" color="secondary">
          EDIT
        </Button>
        <IconButton aria-label="delete" size="large" onClick={(e) => getID(e)}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    );
  };

  return users ? (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>First</TableCell>
              <TableCell>Last</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map(({ id, avatar, fname, lname, username }) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="table-row-id">
                  {id}
                </TableCell>
                <TableCell align="right">{renderMedia(avatar)}</TableCell>
                <TableCell align="left">{fname}</TableCell>
                <TableCell align="left">{lname}</TableCell>
                <TableCell align="left">{username}</TableCell>
                <TableCell align="left">{renderButtons(id)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default TableContent;
