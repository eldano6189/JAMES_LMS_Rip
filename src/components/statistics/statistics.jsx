import styles from "./statistics.module.css";
import CountUp from "react-countup";
import { useContext } from "react";
import ContextProvider from "../../context/context";

const Statistics = () => {
  const { groupedSP, currentUA, userIncompleteCount } =
    useContext(ContextProvider);

  const incompleteModuleCount = (
    ((groupedSP.length - userIncompleteCount) / groupedSP.length) *
    100
  ).toFixed(0);

  return (
    <div className={styles.container}>
      <div className="wrapper">
        <div className={styles.statistics}>
          <div className={styles.card}>
            <div className={styles.card__head}>
              <h2>
                <CountUp start={0} end={groupedSP.length} />
              </h2>
              <p>Total personnel shown.</p>
            </div>
            <div className={styles.card__body}>
              <p>Current UA's.</p>
              <ul className={styles.list}>
                {currentUA.map((person, index) => {
                  return (
                    <li
                      key={index}
                    >{`${person.SERVICE_NO} ${person.RANK} ${person.JAMES_USER_NAME}`}</li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__head}>
              <h2>
                <CountUp start={0} end={incompleteModuleCount} />%
              </h2>
              <p>Personnel training completion.</p>
            </div>
            <div className={styles.card__body}>
              <div className={styles.bar}>
                <div
                  className={styles.bar__progress}
                  style={{
                    transform: `translateX(-${100 - incompleteModuleCount}%)`,
                    backgroundColor:
                      incompleteModuleCount <= 60
                        ? "red"
                        : incompleteModuleCount >= 61 &&
                          incompleteModuleCount < 80
                        ? "yellow"
                        : incompleteModuleCount >= 80
                        ? "green"
                        : null,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            {/* <div className={styles.card__head}>
              <p>Usefull information.</p>
            </div>
            <div className={styles.card__body}>
              <ul className={styles.list}>
                <li>Equipment manager is the most incomplete module.</li>
                <li>The rank of Sergeant has the most incomplete modules.</li>
                <li>Sergeant Hall, D has the most incomplete modules.</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
