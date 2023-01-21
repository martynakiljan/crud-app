import * as React from "react";
import { Transition } from "react-transition-group";
import { Modal, ModalDialog } from "@mui/joy";
import Typography from "@mui/material/Typography";
import Form from "./Form";

const FadeModalDialog = ({ open, setOpen }) => {
  return (
    <>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpen(false)}
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
              <Typography
                id="fade-modal-dialog-title"
                component="h2"
                level="inherit"
                fontSize="24px"
                mb="0.25em"
                color="secondary"
                text-align="center"
                width="100%"
              >
                Edit User:
              </Typography>

              <Form />
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </>
  );
};

export default FadeModalDialog;
