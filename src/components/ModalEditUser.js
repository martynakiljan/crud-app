/** @format */

import React from "react";
import Typography from "@mui/material/Typography";
import Form from "./Form";
import Modal from "./Modal";

const ModalAddUser = ({ isOpen, setIsOpen, updateUserResponseID }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Typography
        id="fade-modal-dialog-title"
        component="h2"
        level="inherit"
        fontSize="24px"
        mb="0.25em"
        color="secondary"
        text-align="center"
        width="100%"
      >
        Edit User:
      </Typography>
      <Form
        updateUserResponseID={updateUserResponseID}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Modal>
  );
};

export default ModalAddUser;
