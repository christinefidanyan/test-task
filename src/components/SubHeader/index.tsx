import { useState } from "react";
import { ArrowLogo } from "../../images";
import { dropdownItems, menuItems } from "./utils";

import styles from "./SubHeader.module.scss";

const SubHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleDropdownMouseEnter = () => {
    if (activeDropdown !== null) {
      setActiveDropdown(activeDropdown);
    }
  };

  const handleDropdownMouseLeave = () => {
    setActiveDropdown(null);
  };

  const renderDropdownItems = dropdownItems.map((item, index) => (
    <div key={index} className={styles.container__dropdown__item}>
      <p className={styles.container__dropdown__item__text}>{item}</p>
      <ArrowLogo />
    </div>
  ));

  const renderItems = menuItems.map((el, index) => (
    <div
      key={el.id}
      className={styles.container__item}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      {el.title}
      {el.Icon && <el.Icon />}
      {activeDropdown === index && (
        <div
          className={styles.container__dropdown}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          {renderDropdownItems}
        </div>
      )}
    </div>
  ));

  return <div className={styles.container}>{renderItems}</div>;
};

export default SubHeader;
