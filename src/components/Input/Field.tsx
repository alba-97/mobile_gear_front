import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormikContext } from "formik";

interface IFieldProps {
  value: string;
  label: string;
  type: string;
  isRequired?: boolean;
  step?: string;
}

const Field = (props: IFieldProps) => {
  const { isRequired, label, value, ...rest } = props;

  const { values, errors, touched, setFieldValue, setFieldTouched } =
    useFormikContext<Record<string, string>>();

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label ?? ""}</FormLabel>
      <Input
        onChange={(e) => setFieldValue(value, e.target.value)}
        value={values[value] === null ? "" : values[value]}
        onBlur={() => {
          setFieldTouched(value, true);
        }}
        {...rest}
      />
      {errors[value] && touched[value] && (
        <p style={{ color: "red" }}>{errors[value]}</p>
      )}
    </FormControl>
  );
};

export default Field;
