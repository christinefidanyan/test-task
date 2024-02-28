import { useState } from "react";
import { buttonLabels } from "./utils";

import styles from "./Calculator.module.scss";

const Calculator = () => {
  const [result, setResult] = useState("");

  const onClickHandler = (btnValue: string | number) => {
    switch (btnValue) {
      case "C":
        setResult(result.slice(0, -1));
        break;
      case "AC":
        setResult("");
        break;
      case "=":
        try {
          setResult(eval(result).toString());
        } catch (error) {
          setResult("Error");
        }
        break;
      default:
        setResult(result + btnValue);
        break;
    }
  };

  const renderButton = (btnValue: string | number, className: string) => (
    <button className={className} onClick={() => onClickHandler(btnValue)}>
      {btnValue}
    </button>
  );

  const renderItems = buttonLabels.map((row) =>
    renderButton(row, styles.container__items__button)
  );

  return (
    <div className={styles.container}>
      <div className={styles.container__result}>{result}</div>
      <div className={styles.container__items}>{renderItems}</div>
    </div>
  );
};

export default Calculator;
