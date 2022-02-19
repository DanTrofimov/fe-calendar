import React, {FC, useState} from "react";
// import styles from "./styles.module.css";
import RequestEventForm from "../../molecules/RequestEventForm";
import ModalComponent from "../../molecules/ModalComponent";

type ItemListProps = {
  id: string;
  summary: string;
  date: string;
  end?: string;
  start?: string;
  description?: string;
  location?: string;
  allDay?: boolean;
  buttonTitle: string;
  isNeedModal?: boolean;
  handleButtonClick?: (id: string) => void;
  handleDeleteRequest?: (id: string) => void;
  handleApproveRequest?: (id: string) => void;
};

const ItemList: FC<ItemListProps> = ({
                                       summary,
                                       date,
                                       end,
                                       start,
                                       description,
                                       location,
                                       allDay,
                                       buttonTitle,
                                       handleButtonClick,
                                       id,
                                       handleDeleteRequest,
                                       handleApproveRequest,
                                       isNeedModal
                                     }) => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const handleClick = () => {
    if (handleButtonClick) {
      handleButtonClick(id as string);
    }
    if (isNeedModal) {
      setIsRequestOpen(true);
    }
  }

  return (
    <div>
      <p>{summary}</p>
      <span>{date}</span>
      <button type='button' onClick={handleClick}>{buttonTitle}</button>
      <ModalComponent
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      >
        <RequestEventForm
          onApprove={handleApproveRequest}
          onReject={handleDeleteRequest}
          onCancel={() => setIsRequestOpen(false)}
          summary={summary}
          location={location}
          start={start}
          end={end}
          description={description}
          allDay={allDay}
          readOnly
          id={id}
          setIsRequestOpen={setIsRequestOpen}
        />
      </ModalComponent>
    </div>
  )
}
export default ItemList;
