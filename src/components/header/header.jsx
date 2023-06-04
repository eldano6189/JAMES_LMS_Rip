import ExcelUpload from "../excel-upload/excelUpload";
import styles from "./header.module.css";
import { useContext } from "react";
import ContextProvider from "../../context/context";
import JamesIcon from "../../assets/svgs/jamesIcon";

const Header = () => {
  const { dataUpload } = useContext(ContextProvider);

  return (
    <div className={styles.container}>
      <img
        src={require("../../assets/images/JMETSLogo.png")}
        alt="Background"
        className={styles.bkgrd}
      />
      <div className="wrapper">
        <header className={styles.header}>
          <div className={styles.header__logo}>
            <JamesIcon />
          </div>
          <div className={styles.header__user}>
            <div className={styles.user__img}>
              <span
                className={styles.data__dot}
                style={{
                  background:
                    dataUpload.length !== 0
                      ? "rgba(5, 255, 0, 1) 50%"
                      : "rgb(255, 0, 0) 50%",
                }}
              ></span>
              <img
                src={require("../../assets/images/JMETSLogo.png")}
                alt="User avatar"
              />
            </div>
          </div>
        </header>
        <div className={styles.container__import}>
          <ExcelUpload />
          {dataUpload.length ? (
            <p>Last updated: {dataUpload[0]?.DATE}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
