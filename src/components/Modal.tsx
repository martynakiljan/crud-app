/** @format */

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";

type FormPropsType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: any;
};

const style = {
  bgcolor: "background.paper",
  boxShadow: 1,
  borderRadius: 2,
  p: 2,
  minWidth: 300,
};

const FadeModalDialog = ({ isOpen, setIsOpen, children }: FormPropsType) => {
  return (
    <>
      <Dialog onClose={() => setIsOpen(false)} open={isOpen} className="modal">
        <DialogContent>
          <Box
            sx={{
              ...style,
            }}
          >
            {children}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FadeModalDialog;
