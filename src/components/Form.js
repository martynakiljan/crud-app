/** @format */

import { CircularProgress, OutlinedInput } from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import { FormLabel, Error } from "../utilis/styledcomponents";
import React, { useState, useContext, useEffect, useRef } from "react";
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
  id: null,
  avatar: "",
};

const Form = ({ setIsOpen, userData }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [createResponse, setCreateResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCompleteFormState, setIsCompleteFormState] = useState(false);

  const { formErrors, setFormErrorsWrapper } = useContext(Context);

  useEffect(() => {
    if (userData) {
      const { fname, lname, username, email, id, avatar } = userData;
      const editedData = {
        firstName: fname,
        lastName: lname,
        userName: username,
        email: email,
        id: id,
        avatar: avatar,
      };
      setFormData(editedData);
    }
  }, [userData]);

  const addNewUser = async () => {
    try {
      setLoading(true);
      const response = await createNewUsers(
        formData.firstName,
        formData.lastName,
        formData.userName,
        formData.email,
        formData.avatar
      );
      setCreateResponse(response);
      return response;
    } catch {
      setLoading(false);
    }
  };

  const handleEdit = (name, value) => {
    console.log(name, value);
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
        formData.id,
        formData.avatar
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

  const isEmptyForm = () =>
    Object.entries(formData)
      .filter(([k, v]) => k !== "id" && k !== "avatar")
      .every(([k, v]) => v === "");

  const isCompleteForm = () => {
    const completedForm = Object.entries(formData)
      .filter(([k, v]) => k !== "id")
      .every(([k, v]) => v !== "");

    if (completedForm) {
      setIsCompleteFormState(true);
    }
    return completedForm;
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValidForm() && isCompleteForm()) {
      if (formData.id) {
        updateUserFun();
      } else {
        addNewUser();
      }
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
  const inputRef = useRef();

  return !createResponse ? (
    <form>
      {inputs.map(({ id, text, name, type }) => (
        <FormInput
          key={id}
          text={text}
          name={name}
          type={type}
          value={formData[name]}
          formErrors={formErrors[name]}
          onChange={(event) => handleEdit(name, event.target.value)}
        />
      ))}
      <FormControl sx={{ width: "55ch" }}>
        <FormLabel>
          {" "}
          Upload avatar
          <input
            type="file"
            id="input"
            name="avatar"
            onChange={() =>
              handleEdit(
                "avatar",
                URL.createObjectURL(inputRef.current.files[0])
              )
            }
            ref={inputRef}
          />
        </FormLabel>
      </FormControl>
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
      {!isCompleteFormState ? (
        <Error>you must complete all fields</Error>
      ) : null}
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
