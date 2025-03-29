import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "../components/Navbar";
import { AdminSideBar } from '@/app/components/adminsidebar/AdminSideBar';
import { ThemeProvider } from "../components/theme-provider";

import { EdgeStoreProvider } from '../../lib/edgestore';
import { Inter } from "next/font/google";
import Footer from "../components/footer/Footer";
const inter = Inter({ subsets: ["latin"] });

import RootLayout from "../layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // <main>
      
    //   {children}
    // </main>
    <SidebarProvider className="flex mx-auto"> 
          <AdminSideBar />
          <SidebarTrigger className="fixed bg-primary"/>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </SidebarProvider>
  );
}
