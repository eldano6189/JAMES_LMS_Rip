import styles from './progressBar.module.css'

const ProgressBar = ({progress, title}) => {
    return (
        <div className={styles.bar}>
            <div
                  className={styles.bar__progress}
                  style={{
                    transform: `translateX(-${100 - progress}%)`,
                    backgroundColor:
                      progress <= 60
                        ? "red"
                        : progress >= 61 &&
                          progress < 80
                        ? "yellow"
                        : progress >= 80
                        ? "green"
                        : null,
                  }}
            ></div>
            <p>{title}</p>
        </div>
    )
}

export default ProgressBar