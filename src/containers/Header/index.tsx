import { BaseSyntheticEvent, useState } from "react";
import styles from "./Header.module.scss";
import { useAppDispatch } from "../../store";
import { getData } from "../../store/reducers";

const Header = () => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>("");
  const [activeValue, setActiveValue] = useState<string>("fahrenheit");

  const handleChange = (event: BaseSyntheticEvent) =>
    setInputValue(event?.target.value);

  const handleClick = () => {
    inputValue.trim() && dispatch(getData(inputValue));
    setInputValue("");
  };

  const changeDegreeValue = (value: string) => setActiveValue(value);

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <div className={styles.container__content__search}>
          <input
            placeholder="City"
            value={inputValue}
            onChange={handleChange}
            className={styles.container__content__search__input}
          />
          <button
            className={styles.container__content__search__save}
            onClick={handleClick}
          >
            Search city
          </button>
        </div>
        <div className={styles.container__content__degree}>
          <div className={styles.container__content__degree__item}>
            <div
              role="button"
              className={styles.container__content__degree__item__circle}
              style={{
                backgroundColor:
                  activeValue === "celsius" ? "rgb(3, 3, 112)" : "#fff",
              }}
              onClick={() => changeDegreeValue("celsius")}
            />
            <p className={styles.container__content__degree__item__value}>°C</p>
          </div>
          <div className={styles.container__content__degree__item}>
            <div
              role="button"
              className={styles.container__content__degree__item__circle}
              style={{
                backgroundColor:
                  activeValue === "fahrenheit" ? "rgb(3, 3, 112)" : "#fff",
              }}
              onClick={() => changeDegreeValue("fahrenheit")}
            />
            <p className={styles.container__content__degree__item__value}>°F</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
