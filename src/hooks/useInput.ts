import { useState } from "react";

const useInput = (val?: string) => {
  const [value, setValue] = useState(val || "");

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { onChange, value, setValue, reset };
};
export default useInput;
