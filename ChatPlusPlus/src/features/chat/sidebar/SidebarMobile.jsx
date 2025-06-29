import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi"; 
import stylesMobile from "./css/SidebarMobile.module.css";
import styles from "./css/Sidebar.module.css";

export default function SidebarMobile({ isOpen, setIsOpen, chats, currentChatId, setCurrentChatId, onNewChat }) {
    const toggleMenu = () => setIsOpen(prev => !prev); 

    return (
        <div>
            {!isOpen && (
                <button className={stylesMobile.menuButton} onClick={toggleMenu}>
                    <FiMenu size={24} />
                </button>
            )} 

            <aside className={`${stylesMobile.sidebar} ${isOpen ? stylesMobile.open : ''}`}>
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
                        <div className={ stylesMobile.newChatIconContainer } >
                            <FiMessageSquare size={20} />
                        </div>
                        <h2 className={styles.newChatTitle}>New chat</h2>
                    </button>
                </div>


                { /* Chat history section */ }
                <div>
                    <div className={ stylesMobile.chatsTitleContainer }>
                        { /* change classname to chatHistoryTitle */ }
                        <h2 className={styles.chatTitle}>Chats</h2>
                    </div>
                    
                    { /* List of all previous chats */ }
                    <div className={ styles.chatList }>
                        {/* chat button to open a saved chat */}
                        { chats.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => {
                                    setCurrentChatId(chat.id);
                                    setIsOpen(false); 
                                }}
                                className={`
                                    ${ styles.chatItemButton } 
                                    ${ chat.id === currentChatId ? styles.active : "" }
                                `}
                            >
                                <h4 className={ styles.chatTitle }>
                                    {chat.title}
                                </h4>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>
        </div> 
    );
}