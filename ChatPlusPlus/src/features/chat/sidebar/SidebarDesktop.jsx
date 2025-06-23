import { useState } from "react";
import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi";
import styles from "./css/SidebarDesktop.module.css";
import TopBar from "../topbar/TopBar";

export default function SidebarDesktop() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(o => !o);

  return (
    <div className={styles.container}>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {!isOpen && (
          <button className={styles.menuButton} onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
        )}
        {isOpen && (
          <button className={styles.closeButton} onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        )}

        <button className={styles.newChatButton}>
          <FiMessageSquare size={20}/>
          {isOpen && <span>New chat</span>}
        </button>

        {isOpen && <h2 className={styles.chatsTitle}>Chats</h2>}

        {isOpen && <div className={styles.chatList}>{/* future chats here */}</div>}
      </aside>

      <main className={`${styles.content} ${isOpen ? styles.shifted : ""}`}>
        <TopBar />
      </main>
    </div>
  );
}