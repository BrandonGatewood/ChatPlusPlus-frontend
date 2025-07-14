import { useState } from "react";
import MainLayout from "../../features/chat/mainLayout/MainLayout";
import useChatManager from "../../features/chat/hooks/useChatManager";
import ChatWindow from "../../features/chat/chatWindow/ChatWindow";

/**
 * Top-level chat page component.
 * Renders the sidebar and main content area.
 * Uses the `useChatManager` hook to manage chat state and actions.
 */
export default function ChatPage() {
    const {
        chats,
        currentChatId,
        setCurrentChatId,
        handleNewChat,
        currentChat,
        addMessageToCurrentChat,
        handleDelete,
        handleEditMessage,
    } = useChatManager();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <MainLayout
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            chats={chats}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
            onNewChat={handleNewChat}
            handleDelete={handleDelete}
        >
            <ChatWindow
                currentChat={currentChat}
                addMessage={addMessageToCurrentChat}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                handleEditMessage={handleEditMessage}
            />
        </MainLayout>
    );
}
