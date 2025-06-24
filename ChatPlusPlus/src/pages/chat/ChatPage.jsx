import Sidebar from "../../features/chat/sidebar/Sidebar";
import styles from "./ChatPage.module.css";
import TopBar from "../../features/chat/topbar/TopBar";
import { useState } from "react";
export default function ChatPage() {

    const [isOpen, setIsOpen] = useState(false); // Controls whether sidebar is open

    return (
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    );
}