import { showUI, on } from "@create-figma-plugin/utilities";

import * as Alex from "alex";

export default function () {
  const textNodes = figma.currentPage.findAll(
    (n) => n.type === "TEXT"
  ) as TextNode[];

  const data = textNodes.map((node) => ({
    nodeId: node.id,
    name: node.name,
    alexData: Alex.text(node.characters),
  }));
  const options = { width: 480, height: 360 };

  on("VIEW_LAYER", ({ id }) => {
    const node = figma.currentPage.findOne((n) => n.id === id);
    figma.viewport.scrollAndZoomIntoView([node]);
    figma.currentPage.selection = [node];
  });

  showUI(options, { data });
  // figma.closePlugin("Hello, World!");
}
