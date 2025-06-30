import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../features/chat/sidebar/Sidebar";
import MainContent from "../../features/chat/mainContent/MainContent";
import styles from "./ChatPage.module.css";

export default function ChatPage() {

    const [isOpen, setIsOpen] = useState(false);

    const [chats, setChats] = useState([
    ]);

    const [draftChat, setDraftChat] = useState(() => {
        const newId = uuidv4();
        return {
            id: newId,
            title: `Generate title`,
            messages: [{ id: newId + 1, from: "bot", text: "Please paste the job posting and upload your resume." }],
        };
    });

    const [currentChatId, setCurrentChatId] = useState(draftChat ? draftChat.id : null);

    const handleNewChat = () => {
        const newId = uuidv4();
        const newDraft = {
            id: newId,
            title: `Generate title`,
            messages: [{ id: newId + 1, from: "bot", text: "Please paste the job posting and upload your resume." }],
        };
        setDraftChat(newDraft);
        setCurrentChatId(newDraft.id);
    };

    const addMessageToCurrentChat = (message) => {
        if (draftChat && currentChatId === draftChat.id && !chats.find(chat => chat.id === draftChat.id)) {
            const updatedDraft = {
                ...draftChat,
                messages: [...draftChat.messages, message],
            };
            setChats(prev => [...prev, updatedDraft]);
            setDraftChat(null);
            setCurrentChatId(updatedDraft.id); 
        } else {
            // Existing chat: update messages normally
            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === currentChatId
                        ? { ...chat, messages: [...chat.messages, message] }
                        : chat
                )
            );
        } 
    };

  const savedChat = chats.find((chat) => chat.id === currentChatId);
    const currentChat =
        savedChat || (draftChat?.id === currentChatId ? draftChat : null); 

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
                    messages={currentChat?.messages || [] }
                    addMessage={addMessageToCurrentChat}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
        </div>
    );
}