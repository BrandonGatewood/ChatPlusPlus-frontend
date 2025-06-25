import { useState } from "react";
import Sidebar from "../../features/chat/sidebar/Sidebar";
import MainContent from "../../features/chat/mainContent/MainContent";
import styles from "./ChatPage.module.css";

export default function ChatPage() {

    const [isOpen, setIsOpen] = useState(false); // Controls whether sidebar is open

    const [chats, setChats] = useState([
        {
            id: 1,
            title: "Chat 1",
            messages: [{ id: 101, from: "bot", text: "Hi! How can I help you?" }],
        },
    ]);

    const [currentChatId, setCurrentChatId] = useState(1);

    const handleNewChat = () => {
        const newId = Date.now();
        const newChat = {
            id: newId,
            title: `Chat ${chats.length + 1}`,
            messages: [{ id: newId + 1, from: "bot", text: "New chat started!" }],
        };
        setChats([...chats, newChat]);
        setCurrentChatId(newId);
    };

    const addMessageToCurrentChat = (message) => {
        setChats((prev) =>
            prev.map((chat) =>
                chat.id === currentChatId
                ? { ...chat, messages: [...chat.messages, message] }
                : chat
            )
        );
    };

    const currentChat = chats.find((chat) => chat.id === currentChatId);

    return (
        <div className={ styles.chatContainer }>
            <div>
                <Sidebar
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    chats={chats}
                    currentChatId={currentChatId}
                    setCurrentChatId={setCurrentChatId}
                    onNewChat={handleNewChat}
                />
            </div>
            <div className={ styles.mainContentContainer }>
                <MainContent
                    messages={currentChat?.messages || []}
                    addMessage={addMessageToCurrentChat}
                    isSidebarOpen={isOpen}
                />
            </div>
        </div>
    );
}