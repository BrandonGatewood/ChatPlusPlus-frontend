import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styles from "./css/SidebarMobile.module.css";
import CloseButton from "./SidebarContent/ClosedButton";
import NewChatButton from "./SidebarContent/NewChatButton";
import ChatList from "./SidebarContent/ChatList";

export default function SidebarMobile({
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
        <>
            {!isOpen && (
                <button className={styles.menuButton} onClick={toggleSidebar}>
                    <FiMenu size={24} />
                </button>
            )}

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <CloseButton onClick={toggleSidebar} />
                <NewChatButton
                    onClick={() => {
                        onNewChatHandler();
                        setIsOpen(false);
                    }}
                    iconClass={styles.newChatIconContainer}
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
                    handleDelete={handleDelete}
                />
            </aside>
        </>
    );
}
