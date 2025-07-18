import { useState, useCallback } from "react";
import { createNewDraft } from "./utils";

export function useChatState() {
    const [draftChat, setDraftChat] = useState(createNewDraft);
    const [chats, setChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(() => draftChat.id);
    const [currentChat, setCurrentChat] = useState(draftChat);
    const [messageResponse, setMessageResponse] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);

    const handleNewChat = useCallback(() => {
        const newDraft = createNewDraft();
        setDraftChat(newDraft);
        setCurrentChatId(newDraft.id);
    }, []);

    return {
        draftChat,
        setDraftChat,
        chats,
        setChats,
        currentChatId,
        setCurrentChatId,
        currentChat,
        setCurrentChat,
        messageResponse,
        setMessageResponse,
        isStreaming,
        setIsStreaming,
        handleNewChat,
    };
}
