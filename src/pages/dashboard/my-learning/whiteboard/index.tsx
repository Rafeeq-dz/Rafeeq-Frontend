import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/components/theme-provider";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { Button } from "@/components/ui/button";
import { Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function WhiteboardPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [whiteboardDarkMode, setWhiteboardDarkMode] = useState(theme === "dark");

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Custom CSS for dark board */}
      <style>{`
        .tldraw-dark .tl-background {
          background-color: #1a1a1a !important;
        }
        .tldraw-dark .tl-canvas {
          background-color: #1a1a1a !important;
        }
        .tldraw-dark .tlui-layout__background {
          background-color: #1a1a1a !important;
        }
        .tldraw-dark {
          --color-background: #1a1a1a !important;
          --color-panel: #0a0a0a !important;
        }
      `}</style>
      {/* Header with controls */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Whiteboard</h1>
          <span className="text-xs text-muted-foreground">
            Full Screen Mode
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setWhiteboardDarkMode(!whiteboardDarkMode)}
            className="flex items-center gap-2"
          >
            {whiteboardDarkMode ? (
              <>
                <Sun className="h-4 w-4" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
        </div>
      </div>

      {/* Whiteboard */}
      <div className="w-full h-full pt-14">
        <Tldraw
          persistenceKey={`whiteboard-fullscreen-${user?._id || "default"}`}
          className={whiteboardDarkMode ? "tldraw-dark" : "tldraw-light"}
        />
      </div>
    </div>
  );
}
