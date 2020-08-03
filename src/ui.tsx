/** @jsx h */
import {
  render,
  Container,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";

import { h } from "preact";

import { LayerText } from "./icons/layer-text";
import Layer from "./components/layer";
import { emit } from "@create-figma-plugin/utilities";

export default render(Plugin);

function Plugin(props) {
  return (
    <div className="container bg-red-500">
      <link rel="stylesheet" href="./tailwind.css" />
      <VerticalSpace space="medium" />

      {props.data.map((node) => (
        // @ts-ignore
        <Layer
          icon={<LayerText />}
          onClick={() => {
            emit("VIEW_LAYER", { id: node.nodeId });
          }}
        >
          {node.name}
        </Layer>
      ))}
      <VerticalSpace space="medium" />
    </div>
  );
}
