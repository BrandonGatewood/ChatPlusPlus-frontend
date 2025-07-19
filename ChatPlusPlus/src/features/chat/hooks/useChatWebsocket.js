import { getBotResponse } from "./chatApi";
import { handleApiError } from "./utils";

const baseUrl = import.meta.env.VITE_WS_BASE_URL;

export async function openLLMWebsocket(
    chatId,
    setCurrentChat,
    setMessageResponse,
    setIsStreaming,
    messageResponse,
    navigate
) {
    try {
        const access_token = localStorage.getItem("access_token");
        const botMessageResponse = await getBotResponse(chatId);
        const message = botMessageResponse;

        setCurrentChat((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));

        setMessageResponse(message);

        const ws = new WebSocket(
            `${baseUrl}/chat?chat_id=${chatId}&message_id=${botMessageResponse.id}`
        );

        ws.onopen = () => {
            console.log("WebSocket opened");
            ws.send(JSON.stringify({ type: "auth", access_token }));
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const chunk = data.text;

                setMessageResponse((prev) => {
                    const updated = {
                        ...prev,
                        text: (prev.text || "") + chunk,
                    };

                    setCurrentChat((prevChat) => {
                        if (!prevChat?.messages) return prevChat;
                        const updatedMessages = prevChat.messages.map((msg) =>
                            msg.id === updated.id
                                ? { ...msg, text: updated.text }
                                : msg
                        );
                        return { ...prevChat, messages: updatedMessages };
                    });

                    return updated;
                });
            } catch (err) {
                console.error("WebSocket message parse error:", event.data);
            }
        };

        ws.onclose = (event) => {
            console.log(`WebSocket closed: ${event.code}, ${event.reason}`);
            setIsStreaming(false);

            if (messageResponse?.text?.trim()) {
                setCurrentChat((prev) => {
                    if (!prev?.messages) return prev;
                    const updatedMessages = prev.messages.map((msg) =>
                        msg.id === messageResponse.id
                            ? { ...msg, text: messageResponse.text }
                            : msg
                    );
                    return { ...prev, messages: updatedMessages };
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
