import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const override = {
  breakpoints: createBreakpoints({
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "818px": "818px",
  }),
};

export default extendTheme(override);
