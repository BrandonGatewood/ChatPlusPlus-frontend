import { useState } from "react";
import styles from "./css/SidebarMobile.module.css";
import { FiMenu, FiX } from "react-icons/fi"; 
import TopBar from "../topbar/TopBar";

export default function SidebarMobile() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev); 

    return (
        <div className={styles.container}>
            {/* Floating menu button */}
            {/* Show menu icon only when sidebar is closed */}
            {!isOpen && (
                <button className={styles.menuButton} onClick={toggleMenu}>
                    <FiMenu size={24} />
                </button>
            )} 

            {/* Sidebar */}
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={toggleMenu}>
                    <FiX size={24} />
                </button>
                <nav className={styles.menuItems}>
                    <a href="#">Home</a>
                    <a href="#">Profile</a>
                    <a href="#">Settings</a>
                </nav>
            </div>

            {/* Main Content (hardcoded or imported component) */}
            <div className={`${styles.content} ${isOpen ? styles.shifted : ''}`}>
                <TopBar /> 
            </div>
        </div> 
    );
} 