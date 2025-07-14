import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    fetchChats,
    fetchChatById,
    createChat,
    postMessage,
    editMessage,
    getBotResponse,
    deleteChat,
} from "./chatApi";

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
    let detail = err?.response?.data?.detail || fallbackMessage;

    if (typeof detail === "object") {
        detail = JSON.stringify(detail, null, 2);
    }

    if (status !== 401) {
        toast.error(detail, {
            autoClose: 5000,
            pauseOnHover: true,
        });
    }
}

export default function useChatManager() {
    const navigate = useNavigate();

    const [draftChat, setDraftChat] = useState(createNewDraft);
    //
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

    /*
        fetch ChatResponse by id from db 

        ChatReponse includes: id=UUID, title=str, messages=List[MessageResponse]
        MessageResponse includes: id=UUID, sender=str, test=str
    */
    useEffect(() => {
        async function getChatById(id) {
            try {
                if (currentChatId === draftChat.id) {
                    setCurrentChat(draftChat);
                } else {
                    const chat = await fetchChatById(id);
                    setCurrentChat(chat);
                }
            } catch (err) {
                handleApiError(err, "Failed to load chat.", navigate);
                setCurrentChat(null);
            }
        }

        getChatById(currentChatId);
    }, [currentChatId, draftChat.id]);

    /*
        Fetch List[ChatTitles] from db

        ChatTitles include: id=UUID, title:str
    */
    useEffect(() => {
        async function getChats() {
            try {
                const chatTitles = await fetchChats();
                setChats(chatTitles);
            } catch (err) {
                handleApiError(err, "Failed to load chats.", navigate);
            }
        }
        getChats();
    }, []);

    /*
        delete chat by id from db.
    */
    const handleDelete = useCallback(
        async (chatId) => {
            try {
                await deleteChat(chatId);
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

    /*
        adds a form to a new chat in db
    */
    const createNewChatAndSendMessage = async (formData) => {
        try {
            const newChat = await createChat(formData);

            const chatTitle = {
                id: newChat.id,
                title: newChat.title,
            };

            setChats((prev) => [chatTitle, ...prev]);
            setCurrentChatId(chatTitle.id);

            /*

                TEST: do i need setCurrentChat()
                Do i need to return ChatResponse instead of ChatTitle??

            */
            openLLMWebSocket(chatTitle.id);
        } catch (err) {
            handleApiError(err, "Failed to send message.", navigate);
        }
    };

    /*
        adds a formdata message to chat in db. 
        adds the MessageResponse to local memory to keep up w db without refetching

        MessageResponse includes: id=UUID, sender=str, text=str
    */
    const sendMessageToExistingChat = async (chatId, formData) => {
        try {
            const message_responses = await postMessage(chatId, formData);

            setCurrentChat((prev) => ({
                ...prev,
                messages: [...prev.messages, ...message_responses],
            }));

            openLLMWebSocket(chatId);
        } catch (err) {
            handleApiError(err, "Failed to send message.", navigate);
            setIsStreaming(false);
        }
    };

    const addMessageToCurrentChat = useCallback(
        async (message_request, files_request) => {
            if (!currentChatId) return;

            setMessageResponse("");
            setIsStreaming(true);

            const formData = new FormData();
            formData.append("message_request", message_request);
            (files_request || []).forEach((file) =>
                formData.append("files_request", file)
            );

            const isDraftNew =
                draftChat &&
                currentChatId === draftChat.id &&
                !chats.find((chat) => chat.id === draftChat.id);

            if (isDraftNew) {
                await createNewChatAndSendMessage(formData);
            } else {
                await sendMessageToExistingChat(currentChatId, formData);
            }
        },
        [currentChatId, draftChat, chats, isStreaming, navigate]
    );

    const handleEditMessage = useCallback(
        async (messageId, editedMessageRequest) => {
            try {
                await editMessage(
                    currentChatId,
                    messageId,
                    editedMessageRequest
                );

                setCurrentChat((prev) => {
                    const index = prev.messages.findIndex(
                        (m) => m.id === messageId
                    );
                    if (index === -1) return prev;

                    const updatedMessage = {
                        ...prev.messages[index],
                        text: editedMessageRequest,
                    };

                    const updatedMessages = [
                        ...prev.messages.slice(0, index),
                        updatedMessage,
                    ];

                    return {
                        ...prev,
                        messages: updatedMessages,
                    };
                });
            } catch (err) {
                handleApiError(err, "Failed to edit message.", navigate);
            }
        }
    );

    /*
        api: create an initial bot message with text="", returns MessageResponse

        MessageResponse includes: id=UUID, sender=str, text=str
    */
    async function openLLMWebSocket(chatId) {
        const access_token = localStorage.getItem("access_token");

        try {
            const botMessageResponse = await getBotResponse(chatId);
            const message = botMessageResponse;

            setCurrentChat((prev) => ({
                ...prev,
                messages: [...prev.messages, message],
            }));

            // Set initial messageResponse as the object
            setMessageResponse(message);

            const ws = new WebSocket(
                `ws://localhost:8000/chat?chat_id=${chatId}&message_id=${botMessageResponse.id}`
            );

            ws.onopen = () => {
                console.log("WebSocket connection opened");
                ws.send(
                    JSON.stringify({ type: "auth", access_token: access_token })
                );
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    if (
                        typeof data === "string" &&
                        (data.startsWith("Authorization error") ||
                            data.startsWith("Not found error") ||
                            data.startsWith("Internal server error"))
                    ) {
                        alert(data);
                        ws.close();
                        return;
                    }

                    const chunk = data.text;

                    setMessageResponse((prev) => {
                        const updated = {
                            ...prev,
                            text: (prev.text || "") + chunk,
                        };

                        // Live update in chat
                        setCurrentChat((prevChat) => {
                            if (!prevChat || !prevChat.messages)
                                return prevChat;

                            const updatedMessages = prevChat.messages.map(
                                (msg) =>
                                    msg.id === updated.id
                                        ? { ...msg, text: updated.text }
                                        : msg
                            );

                            return {
                                ...prevChat,
                                messages: updatedMessages,
                            };
                        });

                        return updated;
                    });
                } catch (err) {
                    console.error(
                        "Failed to parse WebSocket message:",
                        event.data
                    );
                }
            };

            ws.onclose = (event) => {
                console.log(
                    `WebSocket connection closed: code=${event.code}, reason=${event.reason}`
                );

                setIsStreaming(false);

                if (messageResponse.text?.trim()) {
                    setCurrentChat((prev) => {
                        if (!prev || !prev.messages) return prev;

                        const updatedMessages = prev.messages.map((msg) =>
                            msg.id === messageResponse.id
                                ? { ...msg, text: messageResponse.text }
                                : msg
                        );

                        return {
                            ...prev,
                            messages: updatedMessages,
                        };
                    });

                    setMessageResponse(null);
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                setIsStreaming(false);
            };

            return ws;
        } catch (err) {
            handleApiError(err, "Failed to get bot response.", navigate);
            setIsStreaming(false);
        }
    }
    return {
        chats,
        currentChatId,
        setCurrentChatId,
        handleNewChat,
        currentChat,
        addMessageToCurrentChat,
        handleDelete,
        handleEditMessage,
    };
}
