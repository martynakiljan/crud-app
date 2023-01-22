import FormControl from "@mui/joy/FormControl";
import { OutlinedInput } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import React, { useContext } from "react";
import createNewUsers from "../API/createNewUsers";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateUserName,
  errors,
} from "../validate";
import ContextModal from "../contextModal";
import SnackBar from "./Snackbar";
const FormLabel = styled.label`
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const Button = styled.button`
  width: 100%;
  font-size: 1.5rem;
  color: #9c27b0;
  background: transparent;
  padding: 5px 0;
  border: 1px solid #9c27b0;
  cursor: pointer;

  &:hover {
    background-color: #9c27b0;
    color: white;
  }
`;

const Message = styled.p`
  color: red;
`;

const defaultFormData = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
};

const Form = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isValidForm, isSetValidForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { open, setOpen } = useContext(ContextModal);

  const handleEdit = (name, value) => {
    validateForm();
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    validateForm();
  }

  const validateForm = () => {
    const isFirstNameValid = validateFirstName(formData.firstName);
    const isLastNameValid = validateLastName(formData.lastName);
    const isEmailValid = validateEmail(formData.email);
    const isUserNameValid = validateUserName(formData.userName);

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isUserNameValid
    ) {
      createNewUsers(
        formData.firstName,
        formData.lastName,
        formData.userName,
        formData.email
      );
      isSetValidForm(true);
      setFormData(defaultFormData);
      setOpenSnackbar(true);
      setOpen(false); // tutaj mi nie dodaje false, czemu? jest ciagle true, jak to nadpisac?
    } else {
      isSetValidForm(false);
    }
  };

  return (
    <form>
      <SnackBar setOpenSnackbar={setOpenSnackbar} openSnackbar={openSnackbar} />
      <FormControl sx={{ width: "55ch" }}>
        <FormLabel>
          First name:
          <OutlinedInput
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(event) => handleEdit("firstName", event.target.value)}
          />
        </FormLabel>
        <Message>{errors.firstNameError} </Message>
      </FormControl>
      <FormControl>
        <FormLabel>
          Last name:
          <OutlinedInput
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(event) => handleEdit("lastName", event.target.value)}
          />
        </FormLabel>
        <Message>{errors.lastNameError} </Message>
      </FormControl>
      <FormControl>
        <FormLabel>
          Username:
          <OutlinedInput
            type="text"
            id="userName"
            value={formData.userName}
            onChange={(event) => handleEdit("userName", event.target.value)}
          />
        </FormLabel>
        <Message>{errors.userNameError} </Message>
      </FormControl>
      <FormControl>
        <FormLabel>
          Email:
          <OutlinedInput
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={(event) => handleEdit("email", event.target.value)}
          />
        </FormLabel>
        <Message>{errors.emailError} </Message>
      </FormControl>
      {isValidForm ? (
        <p> form completed correctly!</p>
      ) : (
        <p>all fields must be filled out correctly</p>
      )}
      <Button
        variant="contained"
        type="submit"
        color="secondary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
