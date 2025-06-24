import styles from "./css/SidebarMobile.module.css";
import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi"; 
import ChatMainContent from "../mainContent/MainContent";

export default function SidebarMobile({ isOpen, setIsOpen }) {
    const toggleMenu = () => setIsOpen(prev => !prev); 

    return (
        <div className={styles.container}>
            {!isOpen && (
                <button className={styles.menuButton} onClick={toggleMenu}>
                    <FiMenu size={24} />
                </button>
            )} 

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={ styles.closeButtonContainer }>
                    <button className={styles.closeButton} onClick={toggleMenu}>
                        <FiX size={24} />
                    </button>
                </div>

                <div className={ styles.newChatButtonContainer }>
                    <button className={styles.newChatButton}>
                        <div className={ styles.iconContainer } >
                            <FiMessageSquare size={20} />
                        </div>
                        <h2 className={styles.newChatTitle}>New chat</h2>
                    </button>
                </div>

                <div className={ styles.chatsTitleContainer }>
                    <h2 className={styles.chatsTitle}>Chats</h2>
                </div>

                <div className={ styles.chatList }></div>
            </aside>

            <div className={`${styles.content} ${isOpen ? styles.shifted : ''}`}>
                <ChatMainContent /> 
            </div>
        </div> 
    );
}