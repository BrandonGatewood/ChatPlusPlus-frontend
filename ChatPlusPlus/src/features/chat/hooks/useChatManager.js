import { useState, useEffect, useCallback } from "react";
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
                id: uuidv4(),
                from: "bot",
                text: "Please post the job posting and upload your resume.",
            },
        ],
    };
}

function handleApiError(err, fallbackMessage = "Something went wrong.") {
    const status = err?.response?.status;
    const detail = err?.response?.data?.detail || fallbackMessage;

    if (status !== 401) {
        alert(detail);
    }
}

/**
 * Custom hook that encapsulates all chat management logic:
 * - Tracks list of saved chats
 * - Handles draft chats
 * - Manages current selected chat ID
 * - Provides functions to start new chats and add messages
 */
export default function useChatManager() {
    const navigate = useNavigate();
    // List of saved chats (excluding current draft)
    const [chats, setChats] = useState([]);

    // Holds the active draft chat (before it gets saved to chats)
    const [draftChat, setDraftChat] = useState(createNewDraft);

    // Tracks which chat is currently open (either a draft or saved chat)
    const [currentChatId, setCurrentChatId] = useState(() => draftChat.id);
    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        async function fetchChatById(id) {
            try {
                // If currentChatId equals draftChat.id, use draftChat directly (unsaved)
                if (currentChatId === draftChat.id) {
                    setCurrentChat(draftChat);
                } else {
                    // Otherwise, fetch saved chat from backend by id
                    const res = await api.get(`/chats/${currentChatId}`);
                    setCurrentChat(res.data);
                }
            } catch (err) {
                handleApiError(err, "Failed to load chat.", navigate);
                setCurrentChat(null); // optional
            }
        }

        fetchChatById(currentChatId);
    }, [currentChatId, draftChat.id]);

    // Load chats from backend on mount
    useEffect(() => {
        async function fetchChats() {
            try {
                const res = await api.get("/chats");
                setChats(res.data);
            } catch (err) {
                handleApiError(err, "Failed to load chats.", navigate);
            }
        }
        fetchChats();
    }, []);

    /**
     * Adds a message to the current chat:
     * - If it's the first message in a draft, saves it as a new chat.
     * - Otherwise, appends the message to the existing chat.
     */
    const addMessageToCurrentChat = useCallback(
        async (message_request, files_request) => {
            if (!currentChatId) return; // guard: no active chat selected

            const formData = new FormData();
            formData.append("message_request", message_request);

            files_request = files_request || [];
            files_request.forEach((file) => {
                formData.append("files_request", file);
            });
            // Save draftChat to the db
            if (
                draftChat &&
                currentChatId === draftChat.id &&
                !chats.find((chat) => chat.id === draftChat.id)
            ) {
                try {
                    /*
                    this doesnt need full chat response either.
                */
                    const res = await api.post("/chats/", formData);

                    const chatTitle = {
                        id: res.data.id,
                        title: res.data.title,
                    };
                    // Optimistically update chats with created chat from backend
                    setChats((prev) => [chatTitle, ...prev]);
                    setCurrentChatId(chatTitle.id);

                    // Now open WebSocket for streaming LLM response using createdChat.id
                    //openLLMWebSocket(createdChat.id);
                } catch (err) {
                    handleApiError(err, "Failed to send message.", navigate);
                }
            } else {
                try {
                    const res = await api.post(
                        `/chats/${currentChatId}`,
                        formData
                    );

                    const message_responses = res.data;
                    setCurrentChat((prev) => ({
                        ...prev,
                        messages: [...prev.messages, ...message_responses],
                    }));

                    // Now open WebSocket for streaming LLM response using createdChat.id
                    //openLLMWebSocket(createdChat.id);
                } catch (err) {
                    handleApiError(err, "Failed to send message.", navigate);
                }
            }
        },
        [currentChatId, draftChat, chats, navigate]
    );

    /**
     * Starts a new chat by creating a new draft,
     * setting it as the current chat.
     */
    const handleNewChat = useCallback(() => {
        const newDraft = createNewDraft();
        setDraftChat(newDraft);
        setCurrentChatId(newDraft.id);
    }, []);

    const handleDelete = useCallback(
        async (chatId) => {
            try {
                await api.delete(`/chats/${chatId}`);
                if (chatId === currentChatId) handleNewChat();
                setChats((prevChats) =>
                    prevChats.filter((chat) => chat.id !== chatId)
                );
            } catch (err) {
                handleApiError(err, "Failed to delete chat.", navigate);
            }
        },
        [currentChatId, handleNewChat]
    );

    return {
        chats,
        draftChat,
        currentChatId,
        currentChat,
        setCurrentChatId,
        handleNewChat,
        addMessageToCurrentChat,
        handleDelete,
    };
}
