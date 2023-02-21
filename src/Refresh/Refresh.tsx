import styles from "./Refresh.module.css";

export const Refresh = () => {
  const onClick = () => {
    window.location.reload();
    return false;
  };

  return (
    <>
      <div className={styles.shadow}></div>
      <div className={`${styles.container}`}>
        <h3>Åh nej!</h3>
        <h4>Vi har tappat kontakten :-(</h4>
        <button
          type="button"
          className="button-primary"
          onClick={() => onClick()}
        >
          Refresh
        </button>
      </div>
    </>
  );
};
