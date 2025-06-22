import React, { useState } from "react";
import styles from "./SidebarMobile.module.css";
import { FiMenu, FiX } from "react-icons/fi"; // feather icons (clean and simple)
import TopBar from "../topbar/TopBar";

export default function SidebarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = window.innerWidth < 768;
  return (
    <>
      {/* Floating menu button when sidebar is closed */}
      {!isOpen && (
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar panel when open, includes close button inside */}
      {isOpen && (
        <aside className={`${styles.sidebar} ${styles.open}`}>
          {/* Close (X) button at the top right of the sidebar */}
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </button>
          {/* Navigation links, offset below the close button */}
          <nav style={{ marginTop: "3rem" }}>
          </nav>
        </aside>
      )}
    </> 
     
  );
} 