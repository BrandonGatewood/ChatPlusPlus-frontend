import { FiMenu, FiX } from "react-icons/fi";
import styles from "./css/SidebarDesktop.module.css";

// Sidebar for desktop layout (anchored, toggles open/closed)
const SidebarDesktop = ({ isOpen, setIsOpen }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      {/* Toggle button for opening/closing the sidebar */}
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {/* Switches icon based on sidebar state */}
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Navigation links; pushed down to avoid clashing with toggle button */}
      <nav style={{ marginTop: "4rem" }}>
      </nav>
    </aside>
  );
};

export default SidebarDesktop;