import { FiMenu } from "react-icons/fi";
import styles from "./css/Sidebar.module.css";
import stylesMobile from "./css/SidebarMobile.module.css";
import CloseButton from "./SidebarContent/ClosedButton";
import NewChatButton from "./SidebarContent/NewChatButton";
import ChatList from "./SidebarContent/ChatList";

export default function SidebarMobile({ isOpen, setIsOpen, chats, currentChatId, setCurrentChatId, onNewChat }) {
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {!isOpen && (
        <button className={stylesMobile.menuButton} onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
      )}

      <aside className={`${stylesMobile.sidebar} ${isOpen ? stylesMobile.open : ""}`}>
        <CloseButton onClick={toggleSidebar} />
        <NewChatButton
          onClick={() => {
            onNewChat();
            setIsOpen(false);
          }}
          iconClass={stylesMobile.newChatIconContainer}
        />
        <div className={stylesMobile.chatsTitleContainer}>
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
      </aside>
    </>
  );
}