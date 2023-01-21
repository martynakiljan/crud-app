import React from "react";

const ContextModal = React.createContext({
  open: false,
  setOpen: () => {},
});

export default ContextModal;
