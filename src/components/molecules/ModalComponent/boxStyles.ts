const boxStyles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "20px",
  transform: "translate(-50%, -50%)",
  maxWidth: "300px",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "10px 30px 30px 30px",
  '@media (max-width: 500px)': {
    width: '70%',
    fontSize: "14px",
  }
};

export default boxStyles;
