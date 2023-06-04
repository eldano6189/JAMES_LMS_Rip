import styles from "./personnel.module.css";
import { useContext, useState } from "react";
import ContextProvider from "../../context/context";
import UserIcon from "../../assets/svgs/userIcon";
import SearchIcon from "../../assets/svgs/searchIcon";
import Cross from "../../assets/svgs/crossIcon";
import Tick from "../../assets/svgs/tickIcon";

const Personnel = () => {
  const { groupedSP, setModalData } = useContext(ContextProvider);
  const [searchInput, setSearchInput] = useState("");

  const handleModel = (person) => {
    setModalData({ open: true, person: person });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className="wrapper">
        <div className={styles.container__search}>
          <div className={styles.search__icon}>
            <SearchIcon />
          </div>
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="Search"
          />
        </div>
        <div className={styles.container__grid}>
          <div className={styles.grid__head}>
            <ul className={styles.grid__row}>
              <li className={styles.grid__item}></li>
              <li className={styles.grid__item}>Number</li>
              <li className={styles.grid__item}>Rank</li>
              <li className={styles.grid__item}>Name</li>
              <li className={styles.grid__item}>Holding unit</li>
              <li className={styles.grid__item}>Complete</li>
            </ul>
          </div>
          <div className={styles.grid__body}>
            {groupedSP
              .filter(
                (person) =>
                  person[0].SERVICE_NO.toLowerCase().includes(
                    searchInput.toLocaleLowerCase()
                  ) ||
                  person[0].RANK.toLowerCase().includes(
                    searchInput.toLocaleLowerCase()
                  ) ||
                  person[0].JAMES_USER_NAME.toLowerCase().includes(
                    searchInput.toLocaleLowerCase()
                  ) ||
                  person[0].JAMES_HOLDING_UNIT.toLowerCase().includes(
                    searchInput.toLocaleLowerCase()
                  )
              )
              .map((person, index) => {
                return (
                  <ul
                    key={index}
                    className={styles.grid__row}
                    onClick={() => handleModel(person)}
                    style={{
                      backgroundColor:
                        person.find(
                          ({ JAMES_MODULE_COMPLETE_OR_INCOMPLETE }) =>
                            JAMES_MODULE_COMPLETE_OR_INCOMPLETE === "Incomplete"
                        ) && "rgb(var(--clr-1), 10%)",
                    }}
                  >
                    <li className={styles.grid__item}>
                      <div className={styles.icon}>
                        <UserIcon />
                      </div>
                    </li>
                    <li className={styles.grid__item}>
                      {person[0].SERVICE_NO}
                    </li>
                    <li className={styles.grid__item}>{person[0].RANK}</li>
                    <li className={styles.grid__item}>
                      {person[0].JAMES_USER_NAME}
                    </li>
                    <li className={styles.grid__item}>
                      {person[0].JAMES_HOLDING_UNIT}
                    </li>
                    <li className={styles.grid__item}>
                      <div className={styles.icon}>
                        {person.find(
                          ({ JAMES_MODULE_COMPLETE_OR_INCOMPLETE }) =>
                            JAMES_MODULE_COMPLETE_OR_INCOMPLETE === "Incomplete"
                        ) ? (
                          <Cross />
                        ) : (
                          <Tick />
                        )}
                      </div>
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personnel;
