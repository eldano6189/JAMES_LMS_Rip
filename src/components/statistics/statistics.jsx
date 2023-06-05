import styles from "./statistics.module.css";
import CountUp from "react-countup";
import { useContext } from "react";
import ContextProvider from "../../context/context";
import ProgressBar from "../progress-bar/progressBar";

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
              <p>Personnel overall training completion percentage.</p>
            </div>
            <div className={styles.card__body}>
              <ProgressBar progress={incompleteModuleCount}/>
            </div>
          </div>
          <div className={styles.card}>
          <div className={styles.card__head}>
              <h2>
                <CountUp start={0} end={incompleteModuleCount} />%
              </h2>
              <p>Personnel holding roles with corresponding LMS training.</p>
            </div>
            <div className={styles.card__body}>
              <ProgressBar progress={70}/>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__head}>
              <p>Overall completion of specific roles.</p>
            </div>
            <div className={styles.card__body}>
              <ProgressBar progress={40} title={"Own Work"}/>
              <ProgressBar progress={90} title={"Basic"}/>
              <ProgressBar progress={61} title={"Senior Equipment Manager"}/>
              <ProgressBar progress={20} title={"Repair Manager"}/>
              <ProgressBar progress={85} title={"L1 Repair Section Manager"}/>
              <ProgressBar progress={81} title={"UA"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
