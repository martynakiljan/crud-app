/** @format */

import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "./Modal";

const ModalAlert = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Typography
        id="fade-modal-dialog-title"
        component="h2"
        level="inherit"
        fontSize="18px"
        mb="0.25em"
        color="secondary"
        text-align="center"
        width="100%"
      >
        unfortunately you can't edit users with id 1-12
      </Typography>
    </Modal>
  );
};

export default ModalAlert;
