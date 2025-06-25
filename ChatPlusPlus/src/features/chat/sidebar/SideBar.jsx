import { useEffect, useState } from "react";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";

// Wrapper component that conditionally renders the correct sidebar based on screen width
export default function Sidebar({ isOpen, setIsOpen, chats, currentChatId, setCurrentChatId, onNewChat }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Listen for window resize to update `isMobile` dynamically
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Render mobile or desktop sidebar based on device type
    return (
        <div>
            <div style={{ display: isMobile ? "block" : "none"}}>
                <SidebarMobile 
                    isOpen={ isOpen }
                    setIsOpen={ setIsOpen } 
                    chats={ chats }
                    currentChatId={ currentChatId }
                    setCurrentChatId={ setCurrentChatId }
                    onNewChat={ onNewChat }
                />
            </div>
            <div style={{ display: isMobile ? "none" : "block" }}>
                <SidebarDesktop 
                    isOpen={isOpen}
                    setIsOpen={setIsOpen} 
                    chats={ chats }
                    currentChatId={ currentChatId }
                    setCurrentChatId={ setCurrentChatId }
                    onNewChat={ onNewChat }
                />
            </div>
        </div>

    ) ;
};