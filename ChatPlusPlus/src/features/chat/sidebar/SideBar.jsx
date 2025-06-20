import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { FiMenu, FiX } from "react-icons/fi"; // feather icons (clean and simple)

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
    // show sie bar when closed at 768px
  return (
    <>
      {/* Hamburger icon - only show when sidebar is closed */}
      {!isOpen && (
        <div
          className={styles.iconButton}
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
        >
          <FiMenu size={24} />
        </div>
      )}
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {isOpen && (
          <div
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </div>
        )}
      </aside>
    </>
  );
}