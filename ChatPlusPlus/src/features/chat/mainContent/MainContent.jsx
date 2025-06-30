import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./MainContent.module.css";
import TopBar from "../topbar/TopBar";
import { FiPlus, FiArrowUp } from "react-icons/fi"

export default function MainContent({ messages, addMessage, isOpen, setIsOpen }) {
    const [inputText, setInputText] = useState("");

    const containerClass = `${styles.chatMainContainer} ${
        isOpen ? styles.shiftedRight : ""
    }`;

    function handleSend() {
        if (!inputText.trim()) return;

        addMessage({ id: uuidv4(), from: "user", text: inputText });
        setInputText("");
    }

    function handleUpload(event) {
        const file = event.target.files[0];
        if (file)
            console.log("Uploaded file:", file);
    }

    return (
        <div className={styles.chatMainContainer}>
            <TopBar />

            <div className={styles.messages}>
                {messages.map(({ id, from, text }) => (
                    <div
                        key={id}
                        className={`${styles.chatBubble} ${
                        from === "user" ? styles.user : styles.bot
                        }`}
                    >
                    {text}
                    </div>
                ))}
            </div>

            <div className={styles.inputRow}>
                <label htmlFor="upload-input" className={styles.uploadLabel}>
                    <FiPlus size={24} />
                </label>

                <input
                    id="upload-input"
                    type="file"
                    className={styles.uploadInput}
                    onChange={handleUpload}
                />

                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className={styles.textInput}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                    }}
                />

                <button onClick={handleSend} className={styles.sendButton}>
                    <FiArrowUp size={24} />
                </button>
            </div>

            {/* MainContent becomes a close button when sidebar is open */}
            {isOpen && (
                <button 
                    className={ styles.closeButton } 
                    onClick={() => {setIsOpen(false)}}
                >
                </button>
            )} 
        </div>
    );
}