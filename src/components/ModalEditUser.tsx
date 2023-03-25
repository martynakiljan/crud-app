/** @format */

import React from "react";
import Typography from "@mui/material/Typography";
import Form from "./Form";
import Modal from "./Modal";
import { FormPropsModalType} from "./Form"

const ModalEditUser = ({ isOpen, setIsOpen, userData }: FormPropsModalType) => {
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
        Edit User:
      </Typography>
      <Form isOpen={isOpen} setIsOpen={setIsOpen} userData={userData} />
    </Modal>
  );
};

export default ModalEditUser;
