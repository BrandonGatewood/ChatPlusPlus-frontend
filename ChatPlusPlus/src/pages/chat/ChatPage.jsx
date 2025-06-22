import Sidebar from "../../features/chat/sidebar/Sidebar";
import styles from "./ChatPage.module.css";
import TopBar from "../../features/chat/topbar/TopBar";
import { useState } from "react";
export default function ChatPage() {

    const [isOpen, setIsOpen] = useState(false); // Controls whether sidebar is open

    return (
        <>
        <div className={`${styles.layout} ${isOpen ? styles.shifted : ""}`}>
            {/* Sidebar (mobile or desktop based on screen width) */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main content area including top bar and content */}
            <main className={styles.main}>
                <TopBar />
                <div style={{ padding: "1rem" }}>
                <h1>Main Content</h1>
                <p>This should align with the sidebar and TopBar on desktop.</p>
                </div>
            </main> 
            </div>
        </>
    );
}