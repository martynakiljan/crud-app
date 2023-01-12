import Typography from "@mui/material/Typography";
import Content from "./Content";
import styled from "styled-components";
import Modal from "../components/Modal";

const Container = () => {
  const Wrapper = styled.section`
    padding: 4em;
  `;

  return (
    <Wrapper>
      <Typography variant="h4" component="h4">
        Users
      </Typography>
      <Content />
      <Modal />
    </Wrapper>
  );
};

export default Container;
