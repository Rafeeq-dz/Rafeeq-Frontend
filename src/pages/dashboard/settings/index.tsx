import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Settings as SettingsIcon, User, Bell, Lock, Globe, Palette } from "lucide-react";

export function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "language", label: "Language & Region", icon: Globe },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <div className="border rounded-lg p-4 bg-card h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="border rounded-lg p-6 bg-card">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Contact support to change your email
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      University
                    </label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option>University of Algiers</option>
                      <option>University of Constantine</option>
                      <option>University of Oran</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Speciality
                    </label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option>Computer Science</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Engineering</option>
                    </select>
                  </div>

                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Email Notifications", desc: "Receive updates via email" },
                  { label: "Push Notifications", desc: "Browser notifications" },
                  { label: "Study Reminders", desc: "Reminders for study sessions" },
                  { label: "Assignment Alerts", desc: "New assignments and deadlines" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-md">
                  <h3 className="font-medium mb-2">Profile Visibility</h3>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>Public</option>
                    <option>Friends Only</option>
                    <option>Private</option>
                  </select>
                </div>

                <div className="p-4 bg-muted/50 rounded-md">
                  <h3 className="font-medium mb-2">Data Sharing</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Share learning analytics</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Allow AI personalization</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Language & Region</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Preferred Language
                  </label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time Zone
                  </label>
                  <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>Africa/Algiers (GMT+1)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border rounded-md p-4 text-center cursor-pointer hover:border-primary">
                      <div className="w-full h-16 bg-white border rounded mb-2"></div>
                      <span className="text-sm">Light</span>
                    </div>
                    <div className="border rounded-md p-4 text-center cursor-pointer hover:border-primary">
                      <div className="w-full h-16 bg-gray-900 rounded mb-2"></div>
                      <span className="text-sm">Dark</span>
                    </div>
                    <div className="border rounded-md p-4 text-center cursor-pointer hover:border-primary">
                      <div className="w-full h-16 bg-gradient-to-br from-white to-gray-900 rounded mb-2"></div>
                      <span className="text-sm">System</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
