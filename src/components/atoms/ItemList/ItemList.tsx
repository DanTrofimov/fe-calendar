import React, { FC } from "react";
import styles from "./styles.module.css";

type ItemListProps = {
  id: string;
  summary: string;
  date: string;
  buttonTitle: string;
  cancelButtonFunction: (id: string) => void;
};

const ItemList: FC<ItemListProps> = ({ summary, date, buttonTitle, cancelButtonFunction, id}) => {
  const handleClick = () => {
    cancelButtonFunction(id as string);
  }

  return (
    <div>
      <p>{summary}</p>
      <span>{date}</span>
      <button type='button' onClick={handleClick}>{buttonTitle}</button>
    </div>
  )
}
export default ItemList;