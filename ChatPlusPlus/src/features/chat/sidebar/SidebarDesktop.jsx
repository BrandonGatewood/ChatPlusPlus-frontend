import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi";
import stylesDesktop from "./css/SidebarDesktop.module.css";
import styles from "./css/Sidebar.module.css";

export default function SidebarDesktop({ isOpen, setIsOpen, chats, currentChatId, setCurrentChatId, onNewChat }) {
    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <div>

            {/* Sidebar */}
            <aside className={`${stylesDesktop.sidebar} ${isOpen ? stylesDesktop.open : ""}`}>

                {/* Menu button (shown when sidebar is closed) */}
                {!isOpen && (
                    <div className={stylesDesktop.menuButtonContainer}>
                        <button className={stylesDesktop.menuButton} onClick={toggleSidebar}>
                            <FiMenu size={24} />
                        </button>
                    </div>
                )}

                {/* Close button (shown when sidebar is open) */}
                {isOpen && (
                    <div className={styles.closeButtonContainer}>
                        <button className={styles.closeButton} onClick={toggleSidebar}>
                            <FiX size={24} />
                        </button>
                    </div>
                )}

                {/* New Chat button (icon always shown, text only when sidebar is open) */}
                <div className={styles.newChatButtonContainer}>
                    <button 
                        className={styles.newChatButton} 
                        onClick={ () => {
                            onNewChat();
                            setIsOpen(false)
                        }}
                    >
                        <div className={`${stylesDesktop.newChatIconContainer} ${isOpen ? stylesDesktop.open : stylesDesktop.closed}`}>
                            <FiMessageSquare size={20} />
                        </div>
                        <div className={`${stylesDesktop.newChatTitleWrapper} ${isOpen ? stylesDesktop.visible : stylesDesktop.hidden}`}>
                            <h2 className={styles.newChatTitle}>New chat</h2>
                        </div>
                    </button>
                </div>

                {/* Chats section title (only when open) */}
                {isOpen && (
                <div>
                    <div className={stylesDesktop.chatsTitleContainer}>
                        <h2 className={styles.chatTitle}>Chats</h2>
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