import styles from "../css/ChatList.module.css";
import { FiMoreHorizontal } from "react-icons/fi";

export default function ChatList({ chats, currentChatId, onSelect }) {
    return (
        <div className={styles.chatList}>
            {chats.map((chat) => (
                <button
                    key={chat.id}
                    onClick={() => onSelect(chat.id)}
                    className={`${styles.chatItemButton} ${
                        chat.id === currentChatId ? styles.active : ""
                    }`}
                >
                    <div className={styles.chatItemContent}>
                        <h4 className={styles.chatItemTitle}>{chat.title}</h4>
                        <FiMoreHorizontal
                            className={styles.chatMoreIcon}
                            size={16}
                        />
                    </div>
                </button>
            ))}
        </div>
    );
}
