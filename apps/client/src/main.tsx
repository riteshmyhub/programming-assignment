import { createRoot } from "react-dom/client";
import "./assets/styles/style.css";
import App from "./app/app";
import { BrowserRouter } from "react-router";
import ReduxProvider from "./api/store";

createRoot(document.getElementById("root")!).render(
   <ReduxProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </ReduxProvider>
);
