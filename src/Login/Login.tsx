import { useState } from "react";
import styles from "./Login.module.css";

export const Login = ({ onUserSet }: { onUserSet: (user: string) => void }) => {
  const [user, setUser] = useState("");

  return (
    <div className={`row ${styles.container}`}>
      <div className="twelve columns">
        <h3>Hej! Vad heter du?</h3>
        <input
          type="text"
          className="u-full-width"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <button
          type="button"
          className="button-primary"
          onClick={() => onUserSet(user)}
        >
          OK
        </button>
      </div>
    </div>
  );
};
