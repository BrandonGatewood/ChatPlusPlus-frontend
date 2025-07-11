import styles from "./TopBar.module.css";

export default function TopBar() {
    return (
        <div className={styles["topBarContainer"]}>
            <h1>Chat++</h1>
        </div>
    );
}
