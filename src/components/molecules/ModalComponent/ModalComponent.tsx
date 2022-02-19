import React, { ReactNode, FC } from "react";
import { Modal, Fade, Backdrop, Box, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.css";
import boxStyles from './boxStyles';

type ModalComponentProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
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
      <Box sx={boxStyles}>
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
