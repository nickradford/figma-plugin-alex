/** @jsx h */

import { h, JSX } from "preact";
import {
  Text,
  Container,
  Divider,
  Stack,
  VerticalSpace,
  Button,
} from "@create-figma-plugin/ui";
import cn from "classnames";

import styles from "./layer.scss";

interface LayerProps {
  icon: JSX.Element;
}

const Layer = (props) => {
  const classes = cn(styles.layer, { [styles.selected]: props.selected });
  return [
    <div className={classes} onClick={props.onClick}>
      {props.icon}
      <div className={styles.main}>{props.children}</div>
    </div>,
    props.selected && props.messages.length
      ? [
          <VerticalSpace space="medium" />,
          <Container space="extraLarge">
            <Stack space="medium">
              {props.messages.map((message, index) => {
                return (
                  <div className={styles.flexSpread}>
                    <Text>{message.message}</Text>
                    {message.expected.length ? (
                      <button onClick={() => props.fixIssue(index)}>fix</button>
                    ) : null}
                  </div>
                );
              })}
            </Stack>
          </Container>,
          <VerticalSpace space="medium" />,
          // <div className={styles.flexRight}>
          //   <Button onClick={props.fixIssues}>Fix issues</Button>
          // </div>,
          // <VerticalSpace space="medium" />,
        ]
      : null,
    ,
    <Divider />,
  ];
};

const LayerLabel = (props) => {
  return <Text>{props.children}</Text>;
};

const LayerBadges = (props) => {
  let label = "No issues found";
  if (props.for.length) {
    label = `Found ${props.for.length} potential ${
      props.for.length > 1 ? "issues" : "issue"
    }`;
  }
  return <Text bold={!!props.for.length}>{label}</Text>;
};

export { Layer, LayerLabel, LayerBadges };
