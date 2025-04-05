// app/admin/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata = {
  title: "Admin Dashboard - JCRM",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider appearance={{ baseTheme: "dark" }}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-4">{children}</main>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
