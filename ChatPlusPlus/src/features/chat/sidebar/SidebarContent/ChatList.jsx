import styles from "../css/Sidebar.module.css";

export default function ChatList({ chats, currentChatId, onSelect }) {
  return (
    <div className={styles.chatList}>
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          className={`${styles.chatItemButton} ${chat.id === currentChatId ? styles.active : ""}`}
        >
          <h4 className={styles.chatTitle}>{chat.title}</h4>
        </button>
      ))}
    </div>
  );
}