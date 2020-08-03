/** @jsx h */
import { h } from "preact";

import { Icon } from "@create-figma-plugin/ui/lib/components/icon/icon";

const path = "M0 0h11v3h-1V1H6v8h1.5v1h-4V9H5V1H1v2H0V0z";

export const LayerText = (props) => <Icon {...props}>{path}</Icon>;
