import { FiX } from "react-icons/fi";
import styles from "../css/CloseButton.module.css";

export default function CloseButton({ onClick }) {
  return (
    <div className={styles.closeButtonContainer}>
      <button className={styles.closeButton} onClick={onClick}>
        <FiX size={24} />
      </button>
    </div>
  );
}