import FormControl from "@mui/joy/FormControl";
import { OutlinedInput } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import createNewUsers from "../API/createNewUsers";

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

const Error = styled.p`
  color: red;
`;

const Message = styled.p`
  color: green;
`;

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

const Form = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [formDataErrors, setFormDataErrors] = useState(defaultFormDataErrors);
  const [message, setMessage] = useState(false);

  const validate = (name, value) => {
    if (value === "") {
      setFormDataErrors((prevState) => ({
        ...prevState,
        [name]: "Field is required.",
      }));
    } else {
      setFormDataErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  function addNewUser() {
    createNewUsers(
      formData.firstName,
      formData.lastName,
      formData.userName,
      formData.email
    );

    setTimeout(() => {
      setFormData(defaultFormData);
      setMessage(false);
    }, 1000);
    //tu nie wiedzialam jak to ugryzc inaczej, bo resetowalo mi inputy i 
    //dlatego odrazu setMessage nie wyswietlalo imienia i nazwiska bo puste stringi byly
  }

  const handleEdit = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    validate(name, value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    for (const [key, value] of Object.entries(formData)) {
      validate(key, value);
    }

    Object.values(formData).every((value) => {
      if (value !== "") {
        setMessage(true);
        return addNewUser();
      }
    });

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
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
      </FormControl>
      <FormControl>
        <FormLabel>
          Email:
          <OutlinedInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(event) => handleEdit("email", event.target.value)}
          />
        </FormLabel>
        {formDataErrors.email && <Error>{formDataErrors.email}</Error>}
      </FormControl>
      {message ? (
        <Message>
          successfully added user with firstname: {formData.firstName} and
          lastname : {formData.lastName}
        </Message>
      ) : null}
      <Button variant="contained" type="submit" color="secondary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
