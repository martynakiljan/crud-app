/** @format */

import React from "react";
import { Transition } from "react-transition-group";
import { Modal, ModalDialog } from "@mui/joy";

const FadeModalDialog = ({ isOpen, setIsOpen, children }) => {
  return (
    <>
      <Transition in={isOpen} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setIsOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              aria-labelledby="fade-modal-dialog-title"
              aria-describedby="fade-modal-dialog-description"
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              {children}
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </>
  );
};

export default FadeModalDialog;
