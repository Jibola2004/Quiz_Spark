import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  const sidebarStyle = {
    "--sidebar-width": "14rem",
    "--sidebar-width-mobile": "14rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={sidebarStyle}>
      <AppSidebar />
      <main className="p-4">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Dashboard;
