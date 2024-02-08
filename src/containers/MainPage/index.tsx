import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { weatherData, weatherInitialData } from "../../store/selectors";

import styles from "./MainPage.module.scss";
import { getInitialData } from "../../store/reducers";
import { ListItem } from "../../store/types";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(weatherData);
  const initialData = useAppSelector(weatherInitialData);

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const todayDate = `${year}-${month}-${day}`;

  const [selectedDate, setSelectedDate] = useState<string>(todayDate);

  const groupItemsByDate = (items: ListItem[]) => {
    const groupedItems: { [date: string]: ListItem[] } = {};
    items?.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!groupedItems[date]) {
        groupedItems[date] = [];
      }
      groupedItems[date].push(item);
    });
    return groupedItems;
  };

  const groupedItems = initialData?.list && groupItemsByDate(initialData?.list);

  useEffect(() => {
    dispatch(getInitialData(String(data[0]?.lat), String(data[0]?.lon)));
  }, [data[0]]);

  const renderTodaysWeather =
    groupedItems &&
    Object.entries(groupedItems).map(
      ([date, items]) =>
        date === selectedDate && (
          <div key={date} className={styles.container__list}>
            {items.map((item, index) => (
              <div key={index} className={styles.container__list__item}>
                {item.dt_txt.split(" ")[1]} {item.main.temp}°F
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                />
              </div>
            ))}
          </div>
        )
    );

  const renderDays =
    groupedItems &&
    Object.entries(groupedItems).map(([date, items]) => (
      <div
        key={date}
        className={styles.wrapper__days__item}
        onClick={() => setSelectedDate(date)}
      >
        <p className={styles.wrapper__days__item__title}>{date}</p>
        <div className={styles.wrapper__days__item__info}>
          <p>{items[0].main.temp}°F</p>
          <img
            src={`http://openweathermap.org/img/w/${items[0].weather[0].icon}.png`}
          />
        </div>
      </div>
    ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.container__info}>
          <p>{data[0]?.name}</p>
          <p>{groupedItems?.[selectedDate][0].main.temp}°F</p>
          <img
            src={`http://openweathermap.org/img/w/${groupedItems?.[selectedDate][0].weather[0].icon}.png`}
          />
          <p>{groupedItems?.[selectedDate][0].weather[0].main}</p>
        </div>
        {renderTodaysWeather}
      </div>
      <div className={styles.wrapper__days}>{renderDays}</div>
    </div>
  );
};

export default MainPage;
