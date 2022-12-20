import { ThemeOptions } from "@mui/material/styles/createTheme";

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        desktop: true;
        fullsize: true;
    }
}

export const themeOptions: ThemeOptions = {
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 854,
            desktop: 1154,
            fullsize: 1536
        }
    },
    typography: {
        fontFamily: "Comic Sans MS"
    }
};