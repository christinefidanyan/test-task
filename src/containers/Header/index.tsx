import {
  FC,
  useState,
  useEffect,
  SyntheticEvent,
  BaseSyntheticEvent,
  useRef,
} from "react";
import { THeaderProps } from "./types";
import SubHeader from "../../components/SubHeader";
import useWindowSize from "../../hooks/useWindowSize";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { CloseIcon, HamburgerIcon, LogoImage, SearchLogo } from "../../images";

import styles from "./Header.module.scss";

const Header: FC<THeaderProps> = ({ originalData, setFilteredData }) => {
  const { width } = useWindowSize();
  const ref = useRef<HTMLDivElement | null>(null);

  const [isSticky, setIsSticky] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showSubHeader, setShowSubHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      width >= 768 && setIsSticky(scrollTop < 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchClick = () => setShowSearch(!showSearch);

  const handleSearchInputChange = (e: BaseSyntheticEvent) =>
    setSearchValue(e.target.value);

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const searchTerms = searchValue.trim().toLowerCase().split(/\s+/);

    const filteredData =
      searchTerms.length === 0
        ? originalData
        : originalData.filter((item) =>
            searchTerms.some((term) => item.title.toLowerCase().includes(term))
          );

    setFilteredData(filteredData);
  };

  const handleHamburgerClick = () =>
    width <= 768 && setShowSubHeader(!showSubHeader);

  useOnClickOutside(ref, handleHamburgerClick);

  const containerClassName = isSticky
    ? `${styles.container} ${styles.sticky}`
    : styles.container;

  return (
    <div className={containerClassName}>
      <div className={styles.container__logo}>
        {!showSubHeader && (
          <div>
            <HamburgerIcon
              onClick={handleHamburgerClick}
              className={styles.container__logo__burger}
            />
          </div>
        )}
        <LogoImage />
        {showSubHeader && width <= 768 && (
          <CloseIcon onClick={handleHamburgerClick} />
        )}
        <div className={styles.container__search}>
          {showSearch && (
            <form
              className={styles.container__search__form}
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchInputChange}
                placeholder="Search..."
              />
              <button type="submit">Search</button>
            </form>
          )}
          <SearchLogo onClick={handleSearchClick} />
        </div>
      </div>

      {(width >= 768 || showSubHeader) && (
        <div ref={ref}>
          <SubHeader />
        </div>
      )}
    </div>
  );
};

export default Header;
