import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Download, Settings } from "lucide-react";

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Manage your study schedule and important dates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Import from Google Calendar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {/* Calendar Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-2 border rounded-lg p-6 bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar grid placeholder */}
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Calendar view will be implemented here</p>
            <p className="text-sm mt-2">
              Full calendar with drag-and-drop scheduling
            </p>
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-card">
            <h3 className="font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              <div className="p-3 bg-primary/10 rounded-md">
                <div className="text-sm font-medium">Mathematics Exam</div>
                <div className="text-xs text-muted-foreground">
                  Tomorrow, 9:00 AM
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-md">
                <div className="text-sm font-medium">Study Group Session</div>
                <div className="text-xs text-muted-foreground">
                  Dec 22, 2:00 PM
                </div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-md">
                <div className="text-sm font-medium">Project Deadline</div>
                <div className="text-xs text-muted-foreground">
                  Dec 25, 11:59 PM
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-card">
            <h3 className="font-semibold mb-4">AI Schedule Assistant</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Let AI optimize your study schedule based on your courses and
              goals
            </p>
            <Button className="w-full" variant="outline">
              Generate Study Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
