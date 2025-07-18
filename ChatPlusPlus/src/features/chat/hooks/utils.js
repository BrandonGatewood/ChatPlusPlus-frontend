import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export function createNewDraft() {
    const newId = uuidv4();
    return {
        id: newId,
        title: `Generate title`,
        messages: [
            {
                id: uuidv4(),
                from: "bot",
                text: "What do you want to talk about today?",
            },
        ],
    };
}

export function handleApiError(err, fallbackMessage = "Something went wrong.") {
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
