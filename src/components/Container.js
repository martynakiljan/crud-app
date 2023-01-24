/** @format */

import Table from "./Table";
import React from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import { Stack, Typography, Button } from "@mui/material";

const Wrapper = styled.section`
  padding: 4em;
`;

const Container = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Wrapper>
      <Typography variant="h4" component="h4">
        Users
      </Typography>
      <Stack direction="row" justifyContent="end">
        <Button
          color="secondary"
          variant="outlined"
          size="medium"
          sx={{ mb: 7 }}
          onClick={() => setOpen(true)}
        >
          CREATE NEW USER
        </Button>
        <Modal open={open} setOpen={setOpen} />
      </Stack>
      <Table />
    </Wrapper>
  );
};

export default Container;
