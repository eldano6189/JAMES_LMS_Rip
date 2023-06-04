import styles from "./noData.module.css";
import JamesIcon from "../../assets/svgs/jamesIcon";

const NoData = () => {
  return (
    <div className={styles.container}>
      <div className="wrapper">
        <div className={styles.container__noData}>
          <JamesIcon />
          <h1>There is currently no data.</h1>
          <h2>Please upload the JMETS LMS Student, Excel spreadsheet.</h2>
        </div>
      </div>
    </div>
  );
};

export default NoData;
