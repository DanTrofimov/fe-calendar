import React, { ReactNode, FC } from "react";
import { Modal, Fade, Backdrop, Box, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.css";

type ModalComponentProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "20px",
  transform: "translate(-50%, -50%)",
  maxWidth: "350px",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3
};

const ModalComponent: FC<ModalComponentProps> = ({
  children,
  isOpen,
  onClose
}) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500
    }}
  >
    <Fade in={isOpen}>
      <Box sx={style}>
        <div className={styles.wrapper}>
          <IconButton onClick={onClose} className={styles["close-icon"]}>
            <ClearIcon />
          </IconButton>
          {children}
        </div>
      </Box>
    </Fade>
  </Modal>
);

export default ModalComponent;
