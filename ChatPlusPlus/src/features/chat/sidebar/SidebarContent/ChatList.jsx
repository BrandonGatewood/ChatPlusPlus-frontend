import { useState } from "react";
import styles from "../css/ChatList.module.css";
import { FiTrash } from "react-icons/fi";
import Modal from "react-modal";

export default function ChatList({
    chats,
    currentChatId,
    onSelect,
    handleDelete,
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chatToDelete, setChatToDelete] = useState(null);

    const openModal = (chatId) => {
        setChatToDelete(chatId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setChatToDelete(null);
        setModalIsOpen(false);
    };

    const confirmDelete = () => {
        handleDelete(chatToDelete);
        closeModal();
    };

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
                                openModal(chat.id);
                            }}
                        >
                            <FiTrash className={styles.deleteIcon} size={16} />
                        </button>
                    </div>
                </button>
            ))}
            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
                contentLabel="Delete Chat Confirmation"
            >
                <h2>Delete Chat?</h2>
                <p>This action cannot be undone.</p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1rem",
                        marginTop: "1.5rem",
                    }}
                >
                    <button
                        onClick={closeModal}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        className={styles.deleteButton}
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
}
