import { handleApiError } from "./utils";
import { createChat, postMessage, editMessage, deleteChat } from "./chatApi";
/**
 * All handlers: create, send, delete, edit.
 */
export function getChatHandlers({
    currentChatId,
    setCurrentChatId,
    setCurrentChat,
    setChats,
    chats,
    draftChat,
    navigate,
    handleNewChat,
    openLLMWebsocket,
    setMessageResponse,
    setIsStreaming,
}) {
    const createNewChatAndSendMessage = async (formData) => {
        try {
            const newChat = await createChat(formData);
            const chatTitle = { id: newChat.id, title: newChat.title };

            setChats((prev) => [chatTitle, ...prev]);
            setCurrentChatId(chatTitle.id);
            await openLLMWebsocket(chatTitle.id);
        } catch (err) {
            handleApiError(err, "Failed to send message.", navigate);
        }
    };

    const sendMessageToExistingChat = async (chatId, formData) => {
        try {
            const message_responses = await postMessage(chatId, formData);
            setCurrentChat((prev) => ({
                ...prev,
                messages: [...prev.messages, ...message_responses],
            }));
            await openLLMWebsocket(chatId);
        } catch (err) {
            handleApiError(err, "Failed to send message.", navigate);
            setIsStreaming(false);
        }
    };

    const addMessageToCurrentChat = async (message_request, files_request) => {
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
    };

    const handleEditMessage = async (messageId, editedMessageRequest) => {
        try {
            await editMessage(currentChatId, messageId, editedMessageRequest);

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

                return { ...prev, messages: updatedMessages };
            });
        } catch (err) {
            handleApiError(err, "Failed to edit message.", navigate);
        }
    };

    const handleDelete = async (chatId) => {
        try {
            await deleteChat(chatId);
            if (chatId === currentChatId) handleNewChat();
            setChats((prevChats) =>
                prevChats.filter((chat) => chat.id !== chatId)
            );
        } catch (err) {
            handleApiError(err, "Failed to delete chat.", navigate);
        }
    };

    return {
        createNewChatAndSendMessage,
        sendMessageToExistingChat,
        addMessageToCurrentChat,
        handleEditMessage,
        handleDelete,
    };
}
