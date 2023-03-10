/** @format */

import Context from "../utilis/context";

import React, { useState, useContext } from "react";
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
import ModalRemoveUser from "./ModalRemoveUser";
import ModalEditUser from "./ModalEditUser";

const TableContent = () => {
  const { users } = useContext(Context);

  const [deleteUserResponse, setDeleteUserResponse] = useState(null);
  const [updateUserResponseID, setUpdateUserResponseID] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const renderMedia = (avatar) => {
    return <Avatar justify="center" src={avatar} />;
  };

  const deleteUser = (id) => {
    console.log(id);
    getResponseFromAPI(id);
  };

  const getResponseFromAPI = async (id) => {
    const response = await deleteUsers(id);
    setDeleteUserResponse(response);
    setIsOpen(true);
  };

  const updateUser = (id) => {
    setUpdateUserResponseID(id);
    setIsOpen(true);
  };

  const renderButtons = (id) => {
    console.log(id);
    return (
      <div>
        <Button variant="text" color="secondary" onClick={(e) => updateUser(e)}>
          EDIT
        </Button>
        <IconButton aria-label="delete" size="large" onClick={(e) => deleteUser(e)}>
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
      {deleteUserResponse && (
        <ModalRemoveUser
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          response={deleteUserResponse}
        />
      )}
      <ModalEditUser
        updateUserResponseID={updateUserResponseID}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        response={deleteUserResponse}
      />
    </>
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default TableContent;
