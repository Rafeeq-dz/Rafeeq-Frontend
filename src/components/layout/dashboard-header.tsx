import { Search, LogOut, Settings as SettingsIcon, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AITutorSidebar } from "../ai-tutor-sidebar";

export function DashboardHeader() {
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between px-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses, resources, classrooms..."
            className="pl-10 h-9 bg-background/50 border-border focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* AI Tutor Button */}
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary"
          onClick={() => setIsAITutorOpen(true)}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">AI Tutor</span>
        </Button>

        {/* Theme Toggle */}
        <ModeToggle />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 hover:bg-primary/10 pl-2 pr-3"
            >
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email || "user@example.com"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => navigate("/dashboard/settings")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/dashboard/settings")}
              className="cursor-pointer"
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleSignOut}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* AI Tutor Sidebar */}
      <AITutorSidebar
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
      />
    </header>
  );
}
