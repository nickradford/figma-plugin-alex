/** @jsx h */
import {
  render,
  Container,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";

import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { LayerText } from "./icons/layer-text";
import { Layer, LayerLabel, LayerBadges } from "./components/layer";
import { emit, on } from "@create-figma-plugin/utilities";

export default render(Plugin);

function Plugin(props) {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [alexData, setAlexData] = useState(props.data);
  console.log(props);

  useEffect(() => {
    on("DATA_RESCAN", ({ data }) => {
      console.log("new data", data);
      setAlexData(data);
    });
  }, []);

  return (
    <div className="container bg-red-500">
      <link rel="stylesheet" href="./tailwind.css" />
      <VerticalSpace space="medium" />

      {alexData.map((node) => (
        // @ts-ignore
        <Layer
          icon={<LayerText />}
          selected={selectedLayer === node.nodeId}
          onClick={() => {
            emit("VIEW_LAYER", { id: node.nodeId });
            setSelectedLayer(node.nodeId);
          }}
          messages={node.alexData.messages}
          fixIssue={(index) => {
            console.log("fix issues for layer", node.nodeId, index);
            emit("FIX_ISSUE", { id: node.nodeId, messageIndex: index });
          }}
        >
          <LayerLabel>{node.name}</LayerLabel>
          <LayerBadges for={node.alexData.messages}></LayerBadges>
        </Layer>
      ))}
      <VerticalSpace space="medium" />
    </div>
  );
}
