import React from "react";
import { Header } from "../../shared/ui/Header/Header";
import styles from "./Layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};
