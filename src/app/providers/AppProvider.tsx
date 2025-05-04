import React from "react";
import { Layout } from "../../widgets/Layout";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Layout>{children}</Layout>;
};
