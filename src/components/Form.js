/** @format */

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import React from "react";
import createNewUsers from "../API/createNewUsers";
import FormInput from "./FormInput";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateUserName,
  errors,
} from "../utilis/validateInput";
import { Button } from "../utilis/styledcomponents";
import { inputs } from "../utilis/inputsArray";

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
  const [disabled, setIsDisabled] = useState(true);

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
      setIsDisabled(false);
      addNewUser();
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
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          text={input.text}
          {...input}
          errors={errors[input.id]}
          name={input.name}
          value={formData.name}
          formDataErrors={formDataErrors[input.name]}
          onChange={(event) => handleEdit(input.name, event.target.value)}
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
