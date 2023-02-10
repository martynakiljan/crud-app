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
import ModalAlert from "./ModalAlert";

const TableContent = () => {
  const { users } = useContext(Context);

  const [deleteUserResponse, setDeleteUserResponse] = useState(null);
  const [updateUserResponseID, setUpdateUserResponseID] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenAlert, setIsOpenAlert] = React.useState(false);
  const [userData, setUserData] = React.useState();

  const renderMedia = (avatar) => {
    return <Avatar justify="center" src={avatar} />;
  };

  const deleteUser = (id) => {
    getResponseFromAPI(id);
  };

  const getResponseFromAPI = async (id) => {
    const response = await deleteUsers(id);
    setDeleteUserResponse(response);
    setIsOpen(true);
  };

  const updateUser = (id, fname, lname, username) => {
    setUserData({ fname, lname, username });
    if (id < 12) {
      setIsOpenAlert(true);
    } else {
      setUpdateUserResponseID(id);
      setIsOpen(true);
    }
  };

  const renderButtons = (id, avatar, fname, lname, email, username) => {
    return (
      <div>
        <Button
          variant="text"
          color="secondary"
          onClick={() => updateUser(id, avatar, fname, lname, email, username)}
        >
          EDIT
        </Button>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => deleteUser()}
        >
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
                <TableCell align="left">
                  {renderButtons(id, fname, lname, username)}
                </TableCell>
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
        userData={userData}
      />
      <ModalAlert isOpen={isOpenAlert} setIsOpen={setIsOpenAlert} />
    </>
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default TableContent;
