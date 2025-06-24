import { useEffect, useState } from "react";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";

// Wrapper component that conditionally renders the correct sidebar based on screen width
const Sidebar = ({ isOpen, setIsOpen }) => {
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
  return isMobile
    ? <SidebarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
    : <SidebarDesktop isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export default Sidebar;