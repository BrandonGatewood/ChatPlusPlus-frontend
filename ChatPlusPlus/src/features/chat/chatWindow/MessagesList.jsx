import React, { useState } from "react";
import styles from "./MessagesList.module.css";
import { FiEdit } from "react-icons/fi";

function MessagesList({ messages, handleEditMessage }) {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleEditClick = (id, text) => {
        setEditingId(id);
        setEditText(text);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditText("");
    };

    const handleSave = () => {
        if (editText.trim()) {
            handleEditMessage(editingId, editText.trim());
        }
        setEditingId(null);
        setEditText("");
    };

    return (
        <>
            {messages.map(({ id, sender, text }) => (
                <div
                    key={id}
                    role="listitem"
                    className={`
                        ${styles.messageWrapper} 
                        ${sender === "user" ? styles.userWrapper : ""}
                        ${
                            sender === "user" && editingId === id
                                ? styles.editingUserWrapper
                                : ""
                        }
                    `}
                >
                    {editingId === id ? (
                        <div className={styles.editingContainer}>
                            <textarea
                                id="edit-input"
                                name="edit-input"
                                className={styles.editTextarea}
                                value={editText}
                                onChange={(e) => {
                                    setEditText(e.target.value);
                                    e.target.style.height = "auto"; // Reset height
                                    e.target.style.height =
                                        Math.min(e.target.scrollHeight, 250) +
                                        "px";
                                }}
                                rows={3}
                            />
                            <div className={styles.editButtons}>
                                <button
                                    onClick={handleCancel}
                                    className={styles.cancelButton}
                                    aria-label="Cancel edit"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className={styles.saveButton}
                                    aria-label="Save edit"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div
                                className={`${styles.chatBubble} ${
                                    sender === "user" ? styles.user : styles.bot
                                }`}
                            >
                                {text}
                            </div>
                            {sender === "user" && (
                                <button
                                    className={styles.editButton}
                                    aria-label="Edit message"
                                    onClick={() => handleEditClick(id, text)}
                                >
                                    <FiEdit size={16} />
                                </button>
                            )}
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default React.memo(MessagesList);
