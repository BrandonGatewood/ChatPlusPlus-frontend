import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./ChatWindow.module.css";
import TopBar from "../topbar/TopBar";
import { FiPlus, FiArrowUp, FiX } from "react-icons/fi"

export default function MainContent({ messages, addMessage, isOpen, setIsOpen }) {
    const [inputText, setInputText] = useState("");
    const [attachedFiles, setAttachedFiles] = useState([]);
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);

    function handleSend() {
        if (!inputText.trim() && !attachedFiles) return;

        if (inputText.trim()) {
            addMessage({ id: uuidv4(), from: "user", text: inputText });
        }

        if (attachedFiles.length > 0) {
            attachedFiles.forEach(file => {
                addMessage({
                    id: uuidv4(),
                    from: "user",
                    text: `Attached file: ${file.name}`
                });
            });
            setAttachedFiles([]); // clear attachments after sending
        } 

        setInputText(""); 
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        } 
    }

    function handleUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const fileName = file.name.toLowerCase();
        const allowedExtensions = [".pdf", ".docx"];
        const isValid = allowedExtensions.some((ext) => fileName.endsWith(ext));

        if (!isValid) {
            alert("Unsupported file type. Please upload a PDF or DOCX file.");
            event.target.value = ""; 
            return;
        }

        setAttachedFiles((prev) => [...prev, file]);

        event.target.value = ""; 
    }

    function handleRemoveAttachment(index) {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    }

    function autoResizeTextarea(textarea) {
        textarea.style.height = "auto";                    // reset height so shrink works too
        textarea.style.height = textarea.scrollHeight + "px";  // set height to match content
    }

    function scrollToBottom() {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTo({
                top: messagesEndRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={styles.chatMainContainer}>
            <TopBar />

            <div className={styles.messages} ref={messagesEndRef}>
                {messages.map(({ id, from, text }) => (
                    <div
                        key={id}
                        className={`${styles.chatBubble} 
                            ${from === "user" ? styles.user : styles.bot}`
                        }
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
                    accept=".pdf, .docx, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />

                <textarea
                    type="text"
                    placeholder="Type your message..."
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value);
                        autoResizeTextarea(e.target);
                        scrollToBottom();
                    }}
                    className={styles.textInput}
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
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

            {attachedFiles.length > 0 && (
                <div className={styles.attachmentsContainer}>
                    {attachedFiles.map((file, index) => (
                        <div key={index} className={styles.attachmentPreview}>
                            <div className={styles.removeAttachmentButtonContainer}>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveAttachment(index)}
                                    className={styles.removeAttachmentButton}
                                    aria-label="Remove attached file"
                                >
                                <FiX size={16}/> 
                                </button>
                            </div>
                            <p className={styles.attachmentName}>
                                {file.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}