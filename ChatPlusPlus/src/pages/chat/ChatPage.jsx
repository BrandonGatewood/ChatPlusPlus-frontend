import { useState } from "react";
import Sidebar from "../../features/chat/sidebar/Sidebar";
import ChatWindow from "../../features/chat/chatWindow/ChatWindow";
import styles from "./ChatPage.module.css";
import useChatManager from "../../features/chat/hooks/useChatManager";

/**
 * Top-level chat page component.
 * Renders the sidebar and main content area.
 * Uses the `useChatManager` hook to manage chat state and actions.
 */
export default function ChatPage() {
    const [isOpen, setIsOpen] = useState(false);

    // Chat management logic from custom hook
    const {
        chats,
        currentChatId,
        currentChat,
        setCurrentChatId,
        handleNewChat,
        addMessageToCurrentChat,
    } = useChatManager();

    return (
        <div className={styles.chatContainer}>
            {/* Sidebar component: shows list of chats and new chat button */}
            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                chats={chats}
                currentChatId={currentChatId}
                setCurrentChatId={setCurrentChatId}
                onNewChat={handleNewChat}
            />

            <div className={styles.chatWindowContainer}>
                {/* Main chat area component: shows messages and input */}
                <ChatWindow
                    messages={currentChat?.messages || []}
                    addMessage={addMessageToCurrentChat}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
        </div>
    );
}