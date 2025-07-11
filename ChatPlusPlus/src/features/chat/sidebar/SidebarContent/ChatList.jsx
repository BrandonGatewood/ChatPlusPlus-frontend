import styles from "../css/ChatList.module.css";
import { FiTrash } from "react-icons/fi";

export default function ChatList({
    chats,
    currentChatId,
    onSelect,
    handleDelete,
}) {
    function handleUpload(id) {}

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
                        <button
                            className={styles.chatMoreButton}
                            onClick={(e) => {
                                e.stopPropagation(); // prevent parent button click
                                if (
                                    window.confirm(
                                        "Are you sure you want to delete this chat?"
                                    )
                                ) {
                                    handleDelete(chat.id);
                                }
                            }}
                        >
                            <FiTrash
                                className={styles.chatMoreIcon}
                                size={16}
                            />
                        </button>
                    </div>
                </button>
            ))}
        </div>
    );
}
