import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";

interface ISelectProps {
  options: string[];
  value: string;
  label: string;
}

const Select = (props: ISelectProps) => {
  const { label, value, options, ...rest } = props;
  const { setFieldValue } = useFormikContext<Record<string, string>>();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <ChakraSelect
        id={value}
        onChange={(e) => setFieldValue(value, e.target.value)}
        value={value === null ? "" : value}
        {...rest}
      >
        {options.map((value: string, i: number) => {
          return (
            <option value={i} id={`${i}`}>
              {value}
            </option>
          );
        })}
      </ChakraSelect>
    </FormControl>
  );
};

export default Select;
