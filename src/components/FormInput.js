/** @format */
import FormControl from "@mui/joy/FormControl";
import { Error, FormLabel } from "../utilis/styledcomponents";
import { OutlinedInput } from "@mui/material";

const FormInput = ({
  type,
  id,
  name,
  value,
  formDataErrors,
  errors,
  text,
  onChange,
}) => {
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
      {formDataErrors && <Error>{formDataErrors}</Error>}
      <Error>{errors}</Error>
    </FormControl>
  );
};
export default FormInput;
