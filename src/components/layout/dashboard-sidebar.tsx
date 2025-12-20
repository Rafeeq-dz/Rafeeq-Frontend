import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  Briefcase,
  Home,
  Settings,
  LogOut,
  FileText,
  Calendar,
  Sparkles,
  Bot,
  MessageSquare,
  Target,
  BookOpenText,
  GraduationCap,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import logo from "@/assets/logo.svg"

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: SidebarItem[];
};

const sidebarItems: SidebarItem[] = [
  { label: "Overview", href: "/dashboard/overview", icon: <Home size={20} /> },
  { label: "Calendar", href: "/dashboard/calendar", icon: <Calendar size={20} /> },
  {
    label: "🤖 AI Hub",
    href: "/dashboard/ai-hub",
    icon: <Sparkles size={20} />,
    children: [
      { label: "AI Tools", href: "/dashboard/ai-hub/ai-tools", icon: <Bot size={18} /> },
      { label: "Opportunities", href: "/dashboard/ai-hub/opportunities", icon: <Target size={18} /> },
      { label: "Discord Sync", href: "/dashboard/ai-hub/discord-sync", icon: <MessageSquare size={18} /> },
    ],
  },
  {
    label: "My Learning",
    href: "/dashboard/my-learning",
    icon: <GraduationCap size={20} />,
    children: [
      { label: "Courses", href: "/dashboard/my-learning/courses", icon: <BookOpenText size={18} /> },
      { label: "Study Groups", href: "/dashboard/my-learning/study-groups", icon: <Users size={18} /> },
      { label: "Resources", href: "/dashboard/my-learning/resources", icon: <FileText size={18} /> },
      { label: "Workspace", href: "/dashboard/my-learning/workspace", icon: <Briefcase size={18} /> },
      { label: "Whiteboard", href: "/dashboard/my-learning/whiteboard", icon: <Pencil size={18} /> },
    ],
  },
]



export function DashboardSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  const isActiveRoute = (href: string, hasChildren?: boolean) => {
    if (hasChildren) {
      // For parent items, check if any child is active
      return pathname.startsWith(href);
    }
    return pathname === href || (href === "/dashboard/overview" && pathname === "/dashboard");
  };

  return (
    <aside className="w-64 border-r bg-background h-screen sticky top-0 overflow-y-auto py-6 px-3 flex flex-col">
      <div className="mb-6 px-3">
        <Link to="/dashboard" className="flex items-center">
          <img src={logo} alt="Aspo Logo" className=" mr-2" />
        </Link>
      </div>

      <nav className="space-y-1 flex-1">
        {sidebarItems.map((item) => {
          const isActive = isActiveRoute(item.href, !!item.children);

          return (
            <div key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative", 
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  "after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:rounded-md after:w-[3px] after:bg-primary after:transition-opacity",
                  isActive
                    ? "after:opacity-100"
                    : "after:opacity-0 hover:after:opacity-100"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
              
              {/* Render children if they exist */}
              {item.children && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                          isChildActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {child.icon}
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-6 space-y-1 pt-6 border-t">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings size={20} />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="mt-6 px-3">
        <div className="flex items-center gap-3 rounded-md p-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
            {user?.name?.[0] || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role || "Student"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
