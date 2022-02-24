import React, { FC, useState, useCallback } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl
} from "@mui/material";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./styles.module.css";

type AuthFormProps = {
  link: {
    text: string;
    href: string;
  };
  submit: {
    text: string;
    action: (email: string, password: string) => void;
  };
};

const AuthForm: FC<AuthFormProps> = ({ link, submit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      submit.action(email, password);
    },
    [email, password, submit]
  );

  const changePassVisibility = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  );

  return (
    <form onSubmit={onSubmit} className={styles.authForm}>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={changePassVisibility}
                onMouseDown={changePassVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <div className={styles.buttonsContainer}>
        <Link to={link.href}>{link.text}</Link>
        <Button size="small" variant="contained" type="submit">
          {submit.text}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
