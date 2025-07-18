import { useEffect } from "react";
import { fetchChats, fetchChatById } from "./chatApi";
import { handleApiError } from "./utils";

export function useChatEffects(
    currentChatId,
    draftChat,
    setCurrentChat,
    setChats,
    navigate
) {
    useEffect(() => {
        async function getChatById(id) {
            try {
                if (id === draftChat.id) {
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
}
