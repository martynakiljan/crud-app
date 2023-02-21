/** @format */
import FormControl from "@mui/joy/FormControl";
import { Error, FormLabel } from "../utilis/styledcomponents";
import { OutlinedInput } from "@mui/material";

const FormInput = ({ type, text, id, name, value, formErrors, onChange }) => {
  return (
    <FormControl sx={{ width: "55ch" }}>
      <FormLabel>
        {text}
        <OutlinedInput
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        />
      </FormLabel>
      {formErrors && <Error>{formErrors}</Error>}
    </FormControl>
  );
};
export default FormInput;
