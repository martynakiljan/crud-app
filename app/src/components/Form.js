import FormControl from "@mui/joy/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import styled from "styled-components";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorFirstName, setHasErrorFirstName] = useState(false);
  const [errorLastName, setHasErrorLastName] = useState(false);
  const [errorEmail, setHasErrorEmail] = useState(false);

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
  `;

  const Error = styled.p`
    color: #9c27b0;
  `;
  const handleSubmit = (event) => {
    event.preventDefault();

    // setEmail("");
    // setFirstName("");
    // setLastName("");

    // if (firstName === "") {
    //   setHasErrorFirstName(true);
    // } else {
    //   setHasErrorFirstName(false);
    // }
  };

  return (
    <FormControl sx={{ width: "55ch" }} onSubmit={handleSubmit}>
      <FormLabel>
        First name:
        <OutlinedInput
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </FormLabel>
      {errorFirstName ? <Error>Wpisz imie</Error> : null}
      <FormLabel>
        Last name:
        <OutlinedInput
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </FormLabel>
      {errorLastName ? <Error>Wpisz nazwisko</Error> : null}
      <FormLabel>
        Email:
        <OutlinedInput
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormLabel>
      {errorEmail ? <Error>Wpisz email</Error> : null}
      <Button
        variant="contained"
        type="submit"
        color="secondary"
        onSubmit={handleSubmit}
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default Form;
