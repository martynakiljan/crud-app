/** @format */
import styled from "styled-components";

export const FormLabel = styled.label`
  width: 100%;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
`;

export const Wrapper = styled.section`
  padding: 4em;
`;

export const Button = styled.button`
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

  &:disabled {
    background-color: dimgrey;
    color: #e8e8e8;
    cursor: default;
  }
`;

export const Error = styled.p`
  color: red;
  margin: 0;
`;

export const ToolbarInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dialog = styled.div`
  width: 80%;
  height: 50%;
`;
