import TopBar from "../../features/chat/topbar/TopBar";
import SideBar from "../../features/chat/sidebar/SideBar";
import styles from "./ChatPage.module.css";

export default function ChatPage() {

    return (
        <div className={ styles['chatPageContainer'] }>
            <div className={ styles['barContainer']}>
                <SideBar/>
                <TopBar />
            </div>
        </div>
    );
}