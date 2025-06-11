import { RouterProvider } from "react-router-dom";
import { StockSimulatorThemeProvider } from "./components/context/ThemeContext";
import Router from "@/Router";

function App() {
  return (
    <StockSimulatorThemeProvider>
      <RouterProvider router={Router} />
    </StockSimulatorThemeProvider>
  );
}

export default App;
