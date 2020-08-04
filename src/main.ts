import { showUI, on, emit } from "@create-figma-plugin/utilities";

import * as Alex from "alex";
import { getAllTextNodes, getNodeById } from "./util/nodes";

export default function () {
  let data = scanForData();
  const options = { width: 480, height: 360 };

  on("VIEW_LAYER", ({ id }) => {
    const node = figma.currentPage.findOne((n) => n.id === id);
    figma.viewport.scrollAndZoomIntoView([node]);
    figma.currentPage.selection = [node];
  });

  on("FIX_ISSUE", async ({ id, messageIndex, replacementValue }) => {
    console.log("fixing issue in main");

    const node = getNodeById<TextNode>(id);
    const nodeData = data.find((node) => node.nodeId === id).alexData;
    const msg = nodeData.messages[messageIndex];

    let characters = node.characters;
    if (typeof msg.actual === "string") {
      characters = characters.replace(
        new RegExp(`\\b${msg.actual}\\b`, "gi"),
        msg.expected[0]
      );
    } else if (
      Array.isArray(msg.actual) &&
      Array.isArray(msg.expected) &&
      msg.actual.length === msg.expected.length
    ) {
      for (let index = 0; index < msg.actual.length; index++) {
        const actual = msg.actual[index];
        const expected = msg.expected[index];

        characters = characters.replace(
          new RegExp(`\\b${actual}\\b`, "gi"),
          expected
        );
      }
    }

    await figma.loadFontAsync(node.fontName as any);

    node.characters = characters;

    data = scanForData();
    emit("DATA_RESCAN", { data });
  });

  on("FIX_ALL_ISSUES", async ({ id }) => {
    const nodeData = data.find((node) => node.nodeId === id).alexData;
    const figmaNode = getNodeById<TextNode>(id);

    let characters = figmaNode.characters;
    // @ts-ignore
    await figma.loadFontAsync(figmaNode.fontName);

    nodeData.messages.forEach((message) => {
      if (
        typeof message.actual === "string" &&
        message.expected[0] !== undefined
      ) {
        console.log(`Replacing ${message.actual} with ${message.expected[0]}`);
        const regex = new RegExp(`\\b${message.actual}\\b`, "gi");
        characters = characters.replace(regex, message.expected[0]);
        console.log(regex, message.expected[0]);
      }
    });

    figmaNode.characters = characters;

    // figmaNode.characters = "foobar bazbat";
  });

  showUI(options, { data });
  // figma.closePlugin("Hello, World!");
}

function scanForData() {
  const textNodes = getAllTextNodes();

  const data = textNodes.map((node) => ({
    nodeId: node.id,
    name: node.name,
    alexData: Alex.text(node.characters),
  }));
  return data;
}
