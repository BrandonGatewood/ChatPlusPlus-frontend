import { useState } from "react";
import styles from "./MainContent.module.css";

export default function MainContent() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi! How can I help you?" },
  ]);
  const [inputText, setInputText] = useState("");

  function handleSend() {
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now(), from: "user", text: inputText }]);
    setInputText("");
  }

  function handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file);
    }
  }

  return (
    <div className={styles.chatMainContainer}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <h2>Your App Name</h2>
      </div>

      {/* Messages */}
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

      {/* Input row */}
      <div className={styles.inputRow}>
        <label htmlFor="upload-input" className={styles.uploadLabel}>
          📎
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
          Send
        </button>
      </div>
    </div>
  );
}