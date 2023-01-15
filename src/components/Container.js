import Typography from "@mui/material/Typography";
import Table from "./Table";
import styled from "styled-components";
import Modal from "../components/Modal";

const Wrapper = styled.section`
  padding: 4em;
`;

const Container = () => {
  return (
    <Wrapper>
      <Typography variant="h4" component="h4">
        Users
      </Typography>
      <Table />
      <Modal />
    </Wrapper>
  );
};

export default Container;
