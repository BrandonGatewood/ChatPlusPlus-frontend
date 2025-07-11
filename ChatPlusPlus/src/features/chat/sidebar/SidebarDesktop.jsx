import { FiMenu } from "react-icons/fi";
import styles from "./css/Sidebar.module.css";
import stylesDesktop from "./css/SidebarDesktop.module.css";
import CloseButton from "./SidebarContent/ClosedButton";
import NewChatButton from "./SidebarContent/NewChatButton";
import ChatList from "./SidebarContent/ChatList";

export default function SidebarDesktop({ isOpen, setIsOpen, chats, currentChatId, setCurrentChatId, onNewChat }) {
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <aside className={`${stylesDesktop.sidebar} ${isOpen ? stylesDesktop.open : ""}`}>
      {!isOpen && (
        <div className={stylesDesktop.menuButtonContainer}>
          <button className={stylesDesktop.menuButton} onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
        </div>
      )}
      {!isOpen && (
        <NewChatButton
              onClick={() => {
                onNewChat();
                setIsOpen(false);
              }}
              iconClass={`${stylesDesktop.newChatIconContainer} ${stylesDesktop.open}`}
              titleClass={`${stylesDesktop.newChatTitleWrapper} ${stylesDesktop.visible}`}
            />
            )}

      {isOpen && (
        <>
          <CloseButton onClick={toggleSidebar} />

          <NewChatButton
            onClick={() => {
              onNewChat();
              setIsOpen(false);
            }}
            iconClass={`${stylesDesktop.newChatIconContainer} ${stylesDesktop.open}`}
            titleClass={`${stylesDesktop.newChatTitleWrapper} ${stylesDesktop.visible}`}
          />

          <div className={stylesDesktop.chatsTitleContainer}>
            <h2 className={styles.chatTitle}>Chats</h2>
          </div>

          <ChatList
            chats={chats}
            currentChatId={currentChatId}
            onSelect={(id) => {
              setCurrentChatId(id);
              setIsOpen(false);
            }}
          />
        </>
      )}
    </aside>
  );
}