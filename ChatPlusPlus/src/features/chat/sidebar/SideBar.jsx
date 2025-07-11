import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";
import useIsMobile from "../hooks/useIsMobile";

export default function Sidebar(props) {
  const isMobile = useIsMobile();
  return isMobile ? <SidebarMobile {...props} /> : <SidebarDesktop {...props} />;
}