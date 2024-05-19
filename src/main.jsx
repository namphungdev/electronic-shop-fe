import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@/assets/sass/index.scss";
import store from "./stores";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OpenModalProvider } from "./hooks/useOpenModal";
import TranslateProvider from "./components/TranslateProvider";
import vi from "@/locales/vi.json";
import chi from "@/locales/chi.json";
import eng from "@/locales/eng.json";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <OpenModalProvider>
        <TranslateProvider
          translate={{
            vi,
            chi,
            eng,
          }}
          defaultLang={"eng"}
        >
          <App />
        </TranslateProvider>
      </OpenModalProvider>
      <ToastContainer
        style={{ fontSize: "16px" }}
        pauseOnHover={false}
        limit={3}
        containerId="toast-id"
        autoClose={2000}
      />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
