import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ChatWindow.module.css";
import TopBar from "../topbar/TopBar";
import MessagesList from "./MessagesList";
import { FiPlus, FiArrowUp, FiX } from "react-icons/fi";

const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

function filterAllowedFiles(files) {
    return files.filter((file) => {
        const fileName = file.name.toLowerCase();
        return ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    });
}

export default function ChatWindow({
    currentChat,
    addMessage,
    isOpen,
    setIsOpen,
    handleEditMessage,
    isStreaming,
}) {
    const [inputText, setInputText] = useState("");
    const [attachedFiles, setAttachedFiles] = useState([]);
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [isSending, setIsSending] = useState(false);

    async function handleSend() {
        if (isSending || (!inputText.trim() && attachedFiles.length === 0))
            return;

        setIsSending(true);
        await addMessage(inputText, attachedFiles);
        setAttachedFiles([]);
        setInputText("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        setIsSending(false);
    }

    function handleUpload(event) {
        const files = Array.from(event.target.files);
        const validFiles = filterAllowedFiles(files);

        if (validFiles.length !== files.length) {
            alert(
                "Only PDF or DOCX files are allowed. Some files were ignored."
            );
        }
        setAttachedFiles((prev) => [...prev, ...validFiles]);
        event.target.value = "";
    }

    function handleRemoveAttachment(index) {
        setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
    }

    const autoResizeTextarea = useCallback((textarea) => {
        textarea.style.height = "auto"; // reset height so shrink works too
        textarea.style.height = textarea.scrollHeight + "px"; // set height to match content
    }, []);

    function scrollMessagesToBottom() {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    useEffect(() => {
        if (currentChat?.messages?.length) {
            scrollMessagesToBottom();
        }
    }, [currentChat.messages]);

    return (
        <div className={styles.chatMainContainer}>
            <TopBar />

            <div className={styles.messages}>
                <MessagesList
                    messages={currentChat?.messages || []}
                    handleEditMessage={handleEditMessage}
                />
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputRow}>
                <label
                    htmlFor="upload-input"
                    className={styles.uploadLabel}
                    aria-label="Upload file"
                    title="Upload file"
                >
                    <FiPlus size={24} />
                </label>

                <input
                    id="upload-input"
                    type="file"
                    multiple
                    className={styles.uploadInput}
                    onChange={handleUpload}
                    accept=".pdf, .docx, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />

                <textarea
                    id="chat-input"
                    name="chat-input"
                    placeholder="Ask anything"
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value);
                        autoResizeTextarea(e.target);
                        scrollMessagesToBottom();
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

                <button
                    onClick={handleSend}
                    className={styles.sendButton}
                    aria-label="Send message"
                    disabled={
                        isSending ||
                        (!inputText.trim() && attachedFiles.length === 0) ||
                        isStreaming
                    }
                >
                    <FiArrowUp size={24} />
                </button>
            </div>

            {/* MainContent becomes a close button when sidebar is open */}
            {isOpen && (
                <button
                    className={styles.closeButton}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                    aria-label="Close sidebar"
                ></button>
            )}

            {attachedFiles.length > 0 && (
                <div className={styles.attachmentsContainer}>
                    {attachedFiles.map((file, index) => (
                        <div key={index} className={styles.attachmentPreview}>
                            <div
                                className={
                                    styles.removeAttachmentButtonContainer
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveAttachment(index)
                                    }
                                    className={styles.removeAttachmentButton}
                                    aria-label="Remove attached file"
                                >
                                    <FiX size={16} />
                                </button>
                            </div>
                            <p
                                className={styles.attachmentName}
                                title={file.name}
                            >
                                {file.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
