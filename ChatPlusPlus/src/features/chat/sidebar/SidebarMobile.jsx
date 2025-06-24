import styles from "./css/SidebarMobile.module.css";
import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi"; 
import TopBar from "../topbar/TopBar";

export default function SidebarMobile({ isOpen, setIsOpen }) {
    const toggleMenu = () => setIsOpen(prev => !prev); 

    return (
        <div className={styles.container}>
            {!isOpen && (
                <button className={styles.menuButton} onClick={toggleMenu}>
                    <FiMenu size={24} />
                </button>
            )} 

            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={toggleMenu}>
                    <FiX size={24} />
                </button>

                <button className={styles.newChatButton}>
                    <FiMessageSquare size={20} />
                    <span className={styles.newChatText}>New chat</span>
                </button>

                <h2 className={styles.chatsTitle}>Chats</h2>
            </div>

            <div className={`${styles.content} ${isOpen ? styles.shifted : ''}`}>
                <TopBar /> 
            </div>
        </div> 
    );
}