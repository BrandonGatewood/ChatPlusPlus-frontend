import { useNavigate } from "react-router-dom";
import { useChatState } from "./useChatState";
import { useChatEffects } from "./useChatEffects";
import { getChatHandlers } from "./useChatHandler";
import { openLLMWebsocket } from "./useChatWebsocket";

export default function useChatManager() {
    const navigate = useNavigate();
    const state = useChatState();

    useChatEffects(
        state.currentChatId,
        state.draftChat,
        state.setCurrentChat,
        state.setChats,
        navigate
    );

    const { addMessageToCurrentChat, handleEditMessage, handleDelete } =
        getChatHandlers({
            ...state,
            navigate,
            openLLMWebsocket: (chatId) =>
                openLLMWebsocket(
                    chatId,
                    state.setCurrentChat,
                    state.setMessageResponse,
                    state.setIsStreaming,
                    state.messageResponse,
                    navigate
                ),
        });

    return {
        chats: state.chats,
        currentChatId: state.currentChatId,
        setCurrentChatId: state.setCurrentChatId,
        handleNewChat: state.handleNewChat,
        currentChat: state.currentChat,
        addMessageToCurrentChat,
        handleDelete,
        handleEditMessage,
    };
}
