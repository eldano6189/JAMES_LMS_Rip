import styles from "./modal.module.css";
import UserIcon from "../../assets/svgs/userIcon";
import { useContext } from "react";
import ContextProvider from "../../context/context";

const Modal = () => {
  const { modalData, setModalData } = useContext(ContextProvider);

  return (
    <div
      className={styles.container}
      style={{ display: modalData.open ? "grid" : "none" }}
    >
      <div className={styles.modal}>
        <div className={styles.modal__head}>
          <div className={styles.head__img}>
            <div className={styles.img__container}>
              <UserIcon />
            </div>
          </div>
          <div className={styles.head__text}>
            <h2>{`${modalData.person[0]?.SERVICE_NO} | ${modalData.person[0]?.RANK} | ${modalData.person[0]?.JAMES_USER_NAME}`}</h2>
            <h2>{modalData.person[0]?.JAMES_HOLDING_UNIT}</h2>
          </div>
        </div>
        <div className={styles.modal__body}>
          <div className={styles.body__grid}>
            <div className={styles.grid__head}>
              <div className={styles.grid__row}>
                <div className={styles.grid__cell}>
                  <p>Module</p>
                </div>
                <div className={styles.grid__cell}>
                  <p>Enrolled</p>
                </div>
                <div className={styles.grid__cell}>
                  <p>Complete</p>
                </div>
                <div className={styles.grid__cell}>
                  <p>Date</p>
                </div>
              </div>
            </div>
            <div className={styles.grid__body}>
              {modalData.person.map((mod, index) => {
                return (
                  <div
                    key={index}
                    className={styles.grid__row}
                    style={{
                      backgroundColor:
                        mod.CURRICULA_NAME === "NOT ENROLLED" ||
                        mod.JAMES_MODULE_COMPLETE_OR_INCOMPLETE === "Incomplete"
                          ? "rgb(var(--clr-1), 10%)"
                          : "rgb(var(--clr-7))",
                    }}
                  >
                    <div className={styles.grid__cell}>
                      <p>{mod.JAMES_ROLE}</p>
                    </div>
                    <div className={styles.grid__cell}>
                      <p>
                        {mod.CURRICULA_NAME !== "NOT ENROLLED" ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className={styles.grid__cell}>
                      <p>
                        {mod.JAMES_MODULE_COMPLETE_OR_INCOMPLETE === "Complete"
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                    <div className={styles.grid__cell}>
                      <p>{mod.DATE_COMPLETE}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.modal__foot}>
          <button onClick={() => setModalData({ open: false, person: [] })}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
