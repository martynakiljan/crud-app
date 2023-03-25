/** @format */

import React from "react";
import { Typography, Button } from "@mui/material";
import Modal from "./Modal";

type DefaultResponseType = {
  status: string;
  message: string;
};

type ModalRemoveUserType = {
  isOpen: boolean;
  response: DefaultResponseType;
  setIsOpen: (open: boolean) => void;
};

const ModalRemoveUser = ({
  isOpen,
  setIsOpen,
  response,
}: ModalRemoveUserType) => {
  const { status, message } = response;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Typography
        component="h2"
        fontSize="24px"
        mb="0.25em"
        color="secondary"
        text-align="center"
        width="100%"
      >
        Remove User:
      </Typography>
      <p>
        {status}: {message}
      </p>
      <Button
        onClick={() => window.location.reload()}
        variant="contained"
        type="button"
        color="secondary"
      >
        OK
      </Button>
    </Modal>
  );
};

export default ModalRemoveUser;
