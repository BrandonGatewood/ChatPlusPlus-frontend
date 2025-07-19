import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styles from "./css/SidebarDesktop.module.css";
import CloseButton from "./SidebarContent/ClosedButton";
import NewChatButton from "./SidebarContent/NewChatButton";
import ChatList from "./SidebarContent/ChatList";

export default function SidebarDesktop({
    isOpen,
    setIsOpen,
    chats,
    currentChatId,
    setCurrentChatId,
    onNewChat,
    handleDelete,
}) {
    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const navigate = useNavigate();

    const onNewChatHandler = () => {
        onNewChat();
        navigate("/chats");
    };
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
            {!isOpen && (
                <div className={styles.menuButtonContainer}>
                    <button
                        className={styles.menuButton}
                        onClick={toggleSidebar}
                    >
                        <FiMenu size={24} />
                    </button>
                </div>
            )}
            {!isOpen && (
                <NewChatButton
                    onClick={() => {
                        onNewChatHandler();
                        setIsOpen(false);
                    }}
                    iconClass={`${styles.newChatIconContainer} ${styles.open}`}
                    titleClass={`${styles.newChatTitleWrapper} ${styles.visible}`}
                />
            )}

            {isOpen && (
                <>
                    <CloseButton onClick={toggleSidebar} />

                    <NewChatButton
                        onClick={() => {
                            onNewChatHandler();
                            setIsOpen(false);
                        }}
                        iconClass={`${styles.newChatIconContainer} ${styles.open}`}
                        titleClass={`${styles.newChatTitleWrapper} ${styles.visible}`}
                    />

                    <div className={styles.chatsTitleContainer}>
                        <h2 className={styles.chatTitle}>Chats</h2>
                    </div>

                    <ChatList
                        chats={chats}
                        currentChatId={currentChatId}
                        onSelect={(id) => {
                            setCurrentChatId(id);
                            setIsOpen(false);
                        }}
                        handleDelete={(id) => {
                            handleDelete(id);
                        }}
                    />
                </>
            )}
        </aside>
    );
}
