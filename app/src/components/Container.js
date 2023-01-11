import Typography from "@mui/material/Typography";
import Content from "./Content";
import styled from "styled-components";

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
    </Wrapper>
  );
};

export default Container;
