import styles from "./MainLayout.module.css";
import Sidebar from "../sidebar/SideBar";
import useIsMobile from "../hooks/useIsMobile";

export default function MainLayout({
  isOpen,
  setIsOpen,
  chats,
  currentChatId,
  setCurrentChatId,
  onNewChat,
  children,
}) {
  const isMobile = useIsMobile();

  return (
    <div className={styles.layoutWrapper}>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chats={chats}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        onNewChat={onNewChat}
      />
      <main
        className={`${styles.mainContent} ${
          isMobile
            ? isOpen
              ? styles.mainShiftMobile
              : ""
            : isOpen
            ? styles.mainShiftDesktop
            : styles.mainCollapsedDesktop
        }`}
      >
        {children}
      </main>
    </div>
  );
}