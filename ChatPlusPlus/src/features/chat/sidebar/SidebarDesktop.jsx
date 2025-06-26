import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi";
import styles from "./css/SidebarDesktop.module.css";
import ChatMainContent from "../mainContent/MainContent";

export default function SidebarDesktop({ isOpen, setIsOpen, chats, currentChatId, setCurrentChatId, onNewChat }) {
    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <div className={styles.container}>

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>

                {/* Menu button (shown when sidebar is closed) */}
                {!isOpen && (
                    <div className={styles.divider}>
                        <button className={styles.menuButton} onClick={toggleSidebar}>
                            <FiMenu size={24} />
                        </button>
                    </div>
                )}

                {/* Close button (shown when sidebar is open) */}
                {isOpen && (
                    <div className={styles.closeButtonDivider}>
                        <button className={styles.closeButton} onClick={toggleSidebar}>
                            <FiX size={24} />
                        </button>
                    </div>
                )}

                {/* New Chat button (icon always shown, text only when sidebar is open) */}
                <div className={styles.chatButtonOpenDivider}>
                    <button 
                        className={styles.newChatButton} 
                        onClick={ () => {
                            onNewChat();
                            setIsOpen(false)
                        }}
                    >
                        <div className={`${styles.iconContainer} ${isOpen ? styles.open : styles.closed}`}>
                            <FiMessageSquare size={20} />
                        </div>
                        <div className={`${styles.newChatTitleWrapper} ${isOpen ? styles.visible : styles.hidden}`}>
                            <h2 className={styles.newChatTitle}>New chat</h2>
                        </div>
                    </button>
                </div>

                {/* Chats section title (only when open) */}
                {isOpen && (
                <div>
                    <div className={styles.chatsTitleDivider}>
                        <h2 className={styles.chatsTitle}>Chats</h2>
                    </div>
                    <div className={styles.chatList}>
                        {chats.map((chat) => (
                            <button 
                                    key={chat.id}
                                    onClick={() => {
                                        setCurrentChatId(chat.id);
                                        setIsOpen(false); // Auto-close sidebar on mobile
                                    }}
                                    className={`${styles.chatItemButton} ${
                                        chat.id === currentChatId ? styles.active : ""
                                    }`}
                            >
                                <h4 className={ styles.chatTitle }>
                                    {chat.title}
                                </h4>
                            </button>
                        ))}
                    </div>
                </div>
                )}
            </aside>
        </div>
    );
}