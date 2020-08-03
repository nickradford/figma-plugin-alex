/** @jsx h */

import { h, JSX } from "preact";

import styles from "./layer.scss";
import { Text } from "@create-figma-plugin/ui";

interface LayerProps {
  icon: JSX.Element;
}

const Layer = (props) => {
  return (
    <div className={styles.layer} onClick={props.onClick}>
      {props.icon}
      <Text>{props.children}</Text>
    </div>
  );
};

export default Layer;
