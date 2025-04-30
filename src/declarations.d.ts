declare module "*.png";

declare module "*.scss" {
  const styles: { readonly [key: string]: string };
  export default styles;
}

declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
