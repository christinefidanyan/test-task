import { FC } from "react";
import { OvalIcon } from "../../images";
import { TCardItemProps } from "./types";

import styles from "./CardItem.module.scss";

const CardItem: FC<TCardItemProps> = ({ card }) => {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.wrapper__image}
        src={card.img}
        srcSet={`${card.img_2x}`}
      />
      <p className={styles.wrapper__tag}>{card.tags}</p>
      <p className={styles.wrapper__title}>{card.title}</p>
      <div className={styles.wrapper__info}>
        <p className={styles.wrapper__info__author}>{card.autor}</p>
        <OvalIcon />
        <p className={styles.wrapper__info__text}>{card.date}</p>
        <OvalIcon />
        <p className={styles.wrapper__info__text}>{card.views} Views</p>
      </div>
      <p className={styles.wrapper__description}>{card.text}</p>
    </div>
  );
};

export default CardItem;
