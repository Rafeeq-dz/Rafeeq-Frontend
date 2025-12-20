import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Bell, Settings, ExternalLink } from "lucide-react";

export function DiscordSyncPage() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-[#5865F2]" />
            Discord Integration
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect your Discord account to sync study groups and receive
            notifications
          </p>
        </div>
      </div>

      {!isConnected ? (
        /* Connection Card */
        <div className="max-w-2xl mx-auto">
          <div className="border rounded-lg p-8 bg-card text-center">
            <div className="w-16 h-16 bg-[#5865F2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-[#5865F2]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Connect to Discord
            </h2>
            <p className="text-muted-foreground mb-6">
              Link your Discord account to access our study communities, get
              instant notifications, and collaborate with peers directly from
              Discord.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-left p-3 bg-muted/50 rounded-md">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Join Study Groups</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically join Discord channels for your classrooms and
                    study groups
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-3 bg-muted/50 rounded-md">
                <Bell className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Real-time Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified about new assignments, discussions, and study
                    sessions
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left p-3 bg-muted/50 rounded-md">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">AI Bot Integration</div>
                  <div className="text-sm text-muted-foreground">
                    Use our AI assistant directly in Discord for quick help
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              onClick={() => setIsConnected(true)}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Connect Discord Account
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              By connecting, you agree to share your basic Discord profile
              information
            </p>
          </div>
        </div>
      ) : (
        /* Connected State */
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#5865F2]/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[#5865F2]" />
                </div>
                <div>
                  <div className="font-semibold">Connected to Discord</div>
                  <div className="text-sm text-muted-foreground">
                    Username#1234 • Connected 2 days ago
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-muted/50 rounded-md text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs text-muted-foreground">
                  Synced Groups
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-md text-center">
                <div className="text-2xl font-bold">127</div>
                <div className="text-xs text-muted-foreground">
                  Total Messages
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-md text-center">
                <div className="text-2xl font-bold">23</div>
                <div className="text-xs text-muted-foreground">
                  AI Interactions
                </div>
              </div>
            </div>
          </div>

          {/* Synced Channels */}
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-semibold mb-4">Synced Study Groups</h2>
            <div className="space-y-3">
              {[
                "Mathematics Study Group",
                "Computer Science Club",
                "Physics Homework Help",
              ].map((group) => (
                <div
                  key={group}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{group}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Bot Commands */}
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-semibold mb-4">
              Available Bot Commands
            </h2>
            <div className="space-y-2 font-mono text-sm">
              <div className="p-2 bg-muted/50 rounded">
                <span className="text-primary">/help</span> - Show all available
                commands
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <span className="text-primary">/schedule</span> - View your
                study schedule
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <span className="text-primary">/ask [question]</span> - Ask the
                AI tutor
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <span className="text-primary">/resources [topic]</span> - Find
                study resources
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
