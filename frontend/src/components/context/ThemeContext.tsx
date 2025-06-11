import { GlobalStyle } from "@/style/global";
import { theme } from "@/style/theme";
import { createContext, ReactNode } from "react";
import { ThemeProvider } from "styled-components";

export const state = {};

export const ThemeContext = createContext(state);

export const StockSimulatorThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};
