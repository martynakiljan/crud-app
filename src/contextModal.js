import React from "react";

const ContextModal = React.createContext({
  open: true,
  setOpen: () => {},
});

export default ContextModal;
