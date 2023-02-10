/** @format */

import { CircularProgress } from "@mui/material";
import React, { useState, useContext } from "react";
import createNewUsers from "../API/createNewUsers";
import FormInput from "./FormInput";
import Context from "../utilis/context";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateUserName,
} from "../utilis/validateInput";
import { Button } from "../utilis/styledcomponents";
import { inputs } from "../utilis/inputsArray";
import updateUser from "../API/updateUser";

const defaultFormData = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
};

const Form = ({ setIsOpen, updateUserResponseID, userData }) => {
  const [formData, setFormData] = useState(userData || defaultFormData);
  const [createResponse, setCreateResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const { formErrors, setFormErrorsWrapper } = useContext(Context);

  console.log(userData);
  
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
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const updateUserFun = async () => {
    try {
      setLoading(true);
      const response = await updateUser(
        formData.firstName,
        formData.lastName,
        formData.userName,
        formData.email,
        updateUserResponseID
      );
      setCreateResponse(response);
      return response;
    } catch {
      setLoading(false);
    }
  };

  const isValidForm = () => {
    return Object.values(formErrors).every(
      (currentValue) => currentValue === ""
    );
  };

  const isEmptyForm = () => {
    return Object.values(formData).every((currentValue) => currentValue === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValidForm()) {
      addNewUser();
    }

    if (updateUserResponseID) {
      updateUserFun();
    }
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "firstName":
        validateFirstName(value, setFormErrorsWrapper);
        break;
      case "lastName":
        validateLastName(value, setFormErrorsWrapper);
        break;
      case "userName":
        validateUserName(value, setFormErrorsWrapper);
        break;
      case "email":
        validateEmail(value, setFormErrorsWrapper);
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
      {inputs.map(({ id, text, name }) => (
        <FormInput
          key={id}
          text={text}
          name={name}
          value={formData.name}
          formErrors={formErrors[name]}
          onChange={(event) => handleEdit(name, event.target.value)}
        />
      ))}
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Button
          onClick={handleSubmit}
          variant="contained"
          type="button"
          color="secondary"
          disabled={!isValidForm() || isEmptyForm()}
        >
          submit
        </Button>
      )}
    </form>
  ) : (
    <>
      <p> {createResponse.message}</p>
      <Button onClick={closeModal} variant="contained" color="secondary">
        OK
      </Button>
    </>
  );
};
export default Form;
