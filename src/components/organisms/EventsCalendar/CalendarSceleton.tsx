import React, { FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import "./styles.css";

const CalendarSceleton: FC = () => {
  const itemSize = 200;
  const sceletonItems = [];
  for (let i = 0; i < 12; i += 1) {
    sceletonItems.push(
      <Skeleton key={i} variant="rectangular" width={itemSize} height={itemSize} />
    );
  }

  return <div className="sceleton-container">{sceletonItems}</div>;
};

export default CalendarSceleton;
