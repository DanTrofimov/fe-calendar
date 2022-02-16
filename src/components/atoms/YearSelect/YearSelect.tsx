import React, { FC } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import styles from "./styles.module.css";

type YearSelectProps = {
  value: string;
  label: string;
  options: string[];
  setValue: Function;
};

const YearSelect: FC<YearSelectProps> = ({
  label,
  options,
  value,
  setValue
}) => {
  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles["select-wrapper"]}>
      <div className={styles.label}>{label}</div>
      <Select className={styles.select} value={value} size="small" onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default YearSelect;
