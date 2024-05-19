import { createContext, useContext, useState } from "react";

const Context = createContext();

const OpenModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    document.body.classList.add("hide");
    setOpen(true);
  };

  const onCloseModal = () => {
    document.body.classList.remove("hide");
    setOpen(false);
  };
  const values = {
    open,
    onOpenModal,
    onCloseModal,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

const useOpenModal = () => {
  const context = useContext(Context);

  if (typeof context === "undefined")
    throw new Error("The Component must be consumped within OpenModalProvider");

  return context;
};

export { OpenModalProvider, useOpenModal };
