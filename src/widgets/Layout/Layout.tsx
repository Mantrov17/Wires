import React from "react";
import { Header } from "../../shared/ui/Header/Header";
import styles from "./Layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.appLayout}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.container}>{children}</div>
      </main>
    </div>
  );
};
