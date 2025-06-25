import styles from "./css/SidebarMobile.module.css";
import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi"; 
import ChatMainContent from "../mainContent/MainContent";

export default function SidebarMobile({ isOpen, setIsOpen, chats, currentChatId, setCurrentChatId, onNewChat }) {
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
                    <button 
                        className={styles.newChatButton} 
                        onClick={ () => {
                            onNewChat();
                            setIsOpen(false);
                        }}
                    >
                        <div className={ styles.iconContainer } >
                            <FiMessageSquare size={20} />
                        </div>
                        <h2 className={styles.newChatTitle}>New chat</h2>
                    </button>
                </div>

                <div className={ styles.chatsTitleContainer }>
                    <h2 className={styles.chatsTitle}>Chats</h2>
                </div>

                <div className={ styles.chatList }>
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => {
                                setCurrentChatId(chat.id);
                                setIsOpen(false); // Auto-close sidebar on mobile
                            }}
                            className={`${styles.chatItem} ${
                            chat.id === currentChatId ? styles.active : ""
                            }`}
                        >
                            {chat.title}
                        </div>
                    ))}
                </div>
            </aside>
        </div> 
    );
}