import { FC } from "react";
import styles from "./Modal.module.scss";
import { TWarningModalProps } from "./types";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const WarningModal: FC<TWarningModalProps> = ({ onClose }) => {
  const ref = useOnClickOutside<HTMLDivElement>(onClose);

  return (
    <div className={styles.container}>
      <div className={styles.container__content} ref={ref}>
        <p className={styles.container__content__text}>No results found</p>
        <button className={styles.container__content__close} onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
