import { FC, useState } from "react";
import CardItem from "../../components/CardItem";
import { TCardsProps, TSelectedCardInfo } from "./types";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

import styles from "./Cards.module.scss";

const Cards: FC<TCardsProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCardInfo, setSelectedCardInfo] = useState<TSelectedCardInfo>();

  const handleClick = (title: string, text: string) => {
    setIsOpen(true);
    setSelectedCardInfo({ title, description: text });
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCardInfo({ title: "", description: "" });
  };

  useLockBodyScroll(isOpen);

  const renderCards = data.map((card) => (
    <div
      key={card.title}
      onClick={() => handleClick(card.title, card.text)}
      role="button"
    >
      <CardItem card={card} />
    </div>
  ));

  return (
    <div className={styles.container}>
      {renderCards}
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <p className={styles.modal__content__title}>
              {selectedCardInfo?.title}
            </p>
            <p className={styles.modal__content__description}>
              {selectedCardInfo?.description}
            </p>
            <div className={styles.modal__content__close}>
              <button
                className={styles.modal__content__close__action}
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
