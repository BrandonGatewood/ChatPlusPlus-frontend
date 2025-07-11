import { FiMessageSquare } from "react-icons/fi";
import styles from "../css/Sidebar.module.css";

export default function NewChatButton({ onClick, iconClass = "", titleClass = "" }) {
  return (
    <div className={styles.newChatButtonContainer}>
      <button className={styles.newChatButton} onClick={onClick}>
        <div className={iconClass}>
          <FiMessageSquare size={20} />
        </div>
        <div className={titleClass}>
          <h2 className={styles.newChatTitle}>New chat</h2>
        </div>
      </button>
    </div>
  );
}