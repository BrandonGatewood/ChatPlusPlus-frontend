import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
/**
 * Utility function to create a new draft chat object
 * with a unique ID and a default welcome message.
 */
function createNewDraft() {
    const newId = uuidv4();
    return {
        id: newId,
        title: `Generate title`,
        messages: [
            {
                id: newId + 1,
                from: "bot",
                text: "Please post the job posting and upload your resume.",
            },
        ],
    };
}

/**
 * Custom hook that encapsulates all chat management logic:
 * - Tracks list of saved chats
 * - Handles draft chats
 * - Manages current selected chat ID
 * - Provides functions to start new chats and add messages
 */
export default function useChatManager() {
    const navigate = useNavigate()
    // List of saved chats (excluding current draft)
    const [chats, setChats] = useState([]);
    
    // Holds the active draft chat (before it gets saved to chats)
    const [draftChat, setDraftChat] = useState(createNewDraft);

    // Tracks which chat is currently open (either a draft or saved chat)
    const [currentChatId, setCurrentChatId] = useState(() => draftChat.id);

    // Load chats from backend on mount
    useEffect(() => {
        async function fetchChats() {
            try {
                const res = await api.get("/chats");
                setChats(res.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    localStorage.removeItem("access_token");
                    navigate("/login"); // redirect to login
                }
                else {
                    alert("Failed to load chats. Please try again later.");
                    console.error("Error loading chats:", error);
                }
            }
        }
        fetchChats();
    }, []); 

    /**
     * Starts a new chat by creating a new draft,
     * setting it as the current chat.
     */
    const handleNewChat = () => {
        const newDraft = createNewDraft();
        setDraftChat(newDraft);
        setCurrentChatId(newDraft.id);
    };

    /**
     * Adds a message to the current chat:
     * - If it's the first message in a draft, saves it as a new chat.
     * - Otherwise, appends the message to the existing chat.
    */
    const addMessageToCurrentChat = (message) => {
        if (!currentChatId) return; // guard: no active chat selected

        // If current chat is still a draft and not saved yet
        if (
            draftChat &&
            currentChatId === draftChat.id &&
            !chats.find((chat) => chat.id === draftChat.id)
        ) {
            // First message in new draft: save draft to chats
            const updatedDraft = {
                ...draftChat,
                messages: [...draftChat.messages, message],
            };
            setChats((prev) => [...prev, updatedDraft]);
            setDraftChat(null);
            setCurrentChatId(updatedDraft.id);
        } else {
            // Add message to existing saved chat
            setChats((prev) =>
                prev.map((chat) =>
                chat.id === currentChatId
                    ? { ...chat, messages: [...chat.messages, message] }
                    : chat
                )
            );
        }
    };

    // Finds saved chat matching the current chat ID (if exists)
    const savedChat = chats.find((chat) => chat.id === currentChatId);

    // Determines the current chat: either a saved chat or active draft
    const currentChat = savedChat || (draftChat?.id === currentChatId ? draftChat : null);

    return {
        chats,
        draftChat,
        currentChatId,
        currentChat,
        setCurrentChatId,
        handleNewChat,
        addMessageToCurrentChat,
    };
}