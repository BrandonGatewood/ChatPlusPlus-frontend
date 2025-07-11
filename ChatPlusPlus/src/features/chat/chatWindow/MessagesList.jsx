import React from "react";
import styles from "./MessagesList.module.css";

function MessagesList({ messages }) {
    return (
        <>
            {messages.map(({ id, sender, text }) => (
                <div
                    key={id}
                    role="listitem"
                    className={`${styles.chatBubble} ${
                        sender === "user" ? styles.user : styles.bot
                    }`}
                >
                    {text}
                </div>
            ))}
        </>
    );
}

export default React.memo(MessagesList);
