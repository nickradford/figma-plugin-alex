export const getAllTextNodes = () => {
  return figma.currentPage.findAll((n) => n.type === "TEXT") as TextNode[];
};

export const getNodeById = <T extends SceneNode>(id: string) => {
  return figma.currentPage.findOne((node) => node.id === id) as T;
};
