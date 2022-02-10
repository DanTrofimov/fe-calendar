import React, { FC, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
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

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit.action(email, password);
  };

  return (
    <form onSubmit={onSubmit} className={styles.authForm}>
      <TextField
        size="small"
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        size="small"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
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
