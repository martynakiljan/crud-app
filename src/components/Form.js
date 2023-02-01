/** @format */

import FormControl from "@mui/joy/FormControl";
import { OutlinedInput, CircularProgress } from "@mui/material";
import { useState } from "react";
import React from "react";
import createNewUsers from "../API/createNewUsers";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateUserName,
  errors,
} from "../utilis/validateInput";
import { Error, Button, FormLabel } from "../utilis/styledcomponents";

const defaultFormData = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
};

const defaultFormDataErrors = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
};

const Form = ({ setIsOpen }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [formDataErrors, setFormDataErrors] = useState(defaultFormDataErrors);
  const [createResponse, setCreateResponse] = useState(null);
  const [isValidForm, isSetValidForm] = useState(false);
  const [isValidInputForm, isSetValidInputForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setIsDisabled] = useState(false);

  const validateWholeForm = (name, value) => {
    if (value === "") {
      setFormDataErrors((prevState) => ({
        ...prevState,
        [name]: "Field is required.",
      }));
      isSetValidForm(false);
    } else {
      setFormDataErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      isSetValidForm(true);
    }
  };

  const addNewUser = async () => {
    try {
      setLoading(true);
      const response = await createNewUsers(
        formData.firstName,
        formData.lastName,
        formData.userName,
        formData.email
      );
      setCreateResponse(response);
      return response;
    } catch {
      setLoading(false);
    }
    setFormData(defaultFormData);
  };

  const handleEdit = (name, value) => {
    validateInput(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormDataErrors(defaultFormDataErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    for (const [key, value] of Object.entries(formData)) {
      validateWholeForm(key, value);
    }

    Object.values(errors).every((value) => {
      if (value.length === 0) {
        isSetValidInputForm(true);
        setIsDisabled(false);
      } else {
        isSetValidInputForm(false);
        setIsDisabled(true);
      }
    });

    console.log(isValidForm, isValidInputForm);

    if (isValidForm && isValidInputForm) {
      addNewUser();
      setIsDisabled(false);
    }
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "firstName":
        validateFirstName(value);
        break;
      case "lastName":
        validateLastName(value);
        break;
      case "userName":
        validateUserName(value);
        break;
      case "email":
        validateEmail(value);
        break;
      default:
        break;
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const closeModal = () => {
    setIsOpen(false);
    reloadPage();
  };

  return !createResponse ? (
    <form>
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
        {formDataErrors.firstName && <Error>{formDataErrors.firstName}</Error>}
        <Error>{errors.firstNameError}</Error>
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
        {formDataErrors.lastName && <Error>{formDataErrors.lastName}</Error>}
        <Error>{errors.lastNameError}</Error>
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
        {formDataErrors.userName && <Error>{formDataErrors.userName}</Error>}
        <Error>{errors.userNameError}</Error>
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
        {formDataErrors.email && <Error>{formDataErrors.email}</Error>}
        <Error>{errors.emailError}</Error>
      </FormControl>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Button
          onClick={handleSubmit}
          variant="contained"
          type="button"
          color="secondary"
          // disabled={true}
        >
          submit
        </Button>
      )}
    </form>
  ) : (
    <>
      <p> {createResponse.message}</p>
      <Button
        onClick={closeModal}
        variant="contained"
        type="button"
        color="secondary"
      >
        OK
      </Button>
    </>
  );
};
export default Form;
