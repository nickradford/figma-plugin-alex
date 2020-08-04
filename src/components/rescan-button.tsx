/** @jsx h */
import { h } from "preact";

import styles from "./rescan-button.scss";

export const RescanButton = (props) => (
  <button className={styles.button} {...props}>
    scan again
  </button>
);
