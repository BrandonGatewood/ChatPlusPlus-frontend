import api from "../../../api/axios";

export async function fetchChats() {
    const res = await api.get("/chats");
    return res.data;
}

export async function fetchChatById(id) {
    const res = await api.get(`/chats/${id}`);
    return res.data;
}

export async function createChat(formData) {
    const res = await api.post("/chats/", formData);
    return res.data;
}

export async function postMessage(chatId, formData) {
    const res = await api.post(`/chats/${chatId}`, formData);
    return res.data;
}

export async function editMessage(chatId, messageId, text) {
    await api.post(`/chats/${chatId}/${messageId}`, { text });
}

export async function getBotResponse(chatId) {
    const res = await api.post(`/bot/${chatId}`);
    return res.data;
}

export async function deleteChat(id) {
    await api.delete(`/chats/${id}`);
}
