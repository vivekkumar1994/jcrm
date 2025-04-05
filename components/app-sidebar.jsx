import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar";
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader>Admin Panel</SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Main">
            {/* Add links here */}
            <a href="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              Dashboard
            </a>
            <a href="/admin/users" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              Users
            </a>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
            © 2025 JCRM
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }
  