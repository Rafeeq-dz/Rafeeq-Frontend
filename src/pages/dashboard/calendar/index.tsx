import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  BookOpen,
  FileText,
  Clock,
  Check,
  X,
  Bot,
  Send,
  Dumbbell,
  Coffee,
  AlertCircle,
  Target,
  Zap
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aiApi } from "@/api/api";
import { toast } from "sonner";

interface CalendarEvent {
  id: string;
  title: string;
  type: "exam" | "homework" | "study" | "personal" | "routine";
  date: string;
  time: string;
  duration: string;
  priority: "high" | "medium" | "low";
  description?: string;
  course?: string;
}

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  events: Omit<CalendarEvent, "id" | "date">[];
  generated: string;
}

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hi! I'm your schedule assistant. Tell me about your routine, like 'I train 3 days a week' or 'I have morning classes on weekdays'." }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);

  // Mock events data
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Mathematics Exam",
      type: "exam",
      date: "2025-12-21",
      time: "09:00",
      duration: "2h",
      priority: "high",
      course: "Mathematics",
      description: "Final exam covering calculus and linear algebra"
    },
    {
      id: "2",
      title: "Physics Homework",
      type: "homework",
      date: "2025-12-22",
      time: "23:59",
      duration: "3h",
      priority: "medium",
      course: "Physics",
      description: "Complete exercises 1-15"
    },
    {
      id: "3",
      title: "Study Session - Algorithms",
      type: "study",
      date: "2025-12-23",
      time: "14:00",
      duration: "2h",
      priority: "medium",
      course: "Computer Science"
    },
    {
      id: "4",
      title: "Gym Training",
      type: "routine",
      date: "2025-12-20",
      time: "18:00",
      duration: "1.5h",
      priority: "low"
    },
    {
      id: "5",
      title: "Chemistry Lab Report",
      type: "homework",
      date: "2025-12-25",
      time: "23:59",
      duration: "4h",
      priority: "high",
      course: "Chemistry"
    },
    {
      id: "6",
      title: "Morning Study - Statistics",
      type: "study",
      date: "2025-12-24",
      time: "08:00",
      duration: "2h",
      priority: "medium",
      course: "Statistics"
    }
  ]);

  // AI-generated study plans
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([
    {
      id: "plan1",
      title: "Final Exams Prep - 2 Weeks",
      description: "Intensive study schedule focusing on weak subjects with daily review sessions",
      duration: "14 days",
      generated: "2 hours ago",
      events: [
        { title: "Mathematics Review", type: "study", time: "09:00", duration: "2h", priority: "high", course: "Mathematics" },
        { title: "Physics Problem Sets", type: "study", time: "14:00", duration: "2h", priority: "high", course: "Physics" },
        { title: "Chemistry Concepts", type: "study", time: "16:00", duration: "1.5h", priority: "medium", course: "Chemistry" }
      ]
    },
    {
      id: "plan2",
      title: "Balanced Study & Wellness",
      description: "Combines study sessions with exercise and breaks for optimal productivity",
      duration: "7 days",
      generated: "5 hours ago",
      events: [
        { title: "Morning Study Block", type: "study", time: "08:00", duration: "3h", priority: "high" },
        { title: "Afternoon Exercise", type: "routine", time: "15:00", duration: "1h", priority: "medium" },
        { title: "Evening Review", type: "study", time: "19:00", duration: "2h", priority: "medium" }
      ]
    },
    {
      id: "plan3",
      title: "Weekend Intensive Review",
      description: "Focus on completing pending assignments and revision",
      duration: "2 days",
      generated: "1 day ago",
      events: [
        { title: "Complete All Homework", type: "homework", time: "10:00", duration: "4h", priority: "high" },
        { title: "Revision - Weak Topics", type: "study", time: "15:00", duration: "3h", priority: "high" }
      ]
    }
  ]);

  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    type: "study",
    priority: "medium",
  });

  // Helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfWeek };
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const handleApplyStudyPlan = (plan: StudyPlan) => {
    // Apply study plan as events starting from tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const newEvents: CalendarEvent[] = [];
    plan.events.forEach((event, index) => {
      const eventDate = new Date(tomorrow);
      eventDate.setDate(eventDate.getDate() + index);
      
      newEvents.push({
        ...event,
        id: `plan-${plan.id}-${index}`,
        date: `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`
      });
    });
    
    setEvents([...events, ...newEvents]);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        type: newEvent.type || "study",
        date: newEvent.date,
        time: newEvent.time,
        duration: newEvent.duration || "1h",
        priority: newEvent.priority || "medium",
        description: newEvent.description,
        course: newEvent.course
      };
      setEvents([...events, event]);
      setIsEventDialogOpen(false);
      setNewEvent({ type: "study", priority: "medium" });
    }
  };

  const handleSendAIMessage = async () => {
    if (!aiInput.trim()) return;
    
    const userMessage = aiInput.trim();
    setAiMessages([...aiMessages, { role: "user", content: userMessage }]);
    setAiInput("");
    setIsGeneratingSchedule(true);
    
    try {
      // Call the AI API to generate schedule
      const response = await aiApi.generateWeeklySchedule({
        user_input: userMessage
      });
      
      // Parse the response and create a study plan
      const newPlan: StudyPlan = {
        id: `ai-plan-${Date.now()}`,
        title: "AI Generated Schedule",
        description: `Based on: "${userMessage.substring(0, 50)}${userMessage.length > 50 ? '...' : ''}"`,
        duration: "Custom",
        generated: "Just now",
        events: parseScheduleResponse(response)
      };
      
      // Add the new plan to study plans
      setStudyPlans([newPlan, ...studyPlans]);
      
      setAiMessages(prev => [...prev, {
        role: "assistant",
        content: `I've created a personalized schedule for you! Check the "AI Generated Schedule" card below the calendar. You can review it and click "Apply to Calendar" when ready.`
      }]);
      
      toast.success("Schedule generated successfully!");
    } catch (error) {
      console.error("Schedule generation error:", error);
      setAiMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error generating your schedule. Please try again with more details about your routine."
      }]);
      toast.error(error instanceof Error ? error.message : "Failed to generate schedule");
    } finally {
      setIsGeneratingSchedule(false);
    }
  };
  
  // Helper function to parse API response into events
  const parseScheduleResponse = (response: any): Omit<CalendarEvent, "id" | "date">[] => {
    const events: Omit<CalendarEvent, "id" | "date">[] = [];
    
    try {
      // If response has a schedule array
      if (response.schedule && Array.isArray(response.schedule)) {
        response.schedule.forEach((item: any) => {
          events.push({
            title: item.title || item.name || "Scheduled Activity",
            type: mapEventType(item.type || "study"),
            time: item.time || "09:00",
            duration: item.duration || "1h",
            priority: (item.priority as "high" | "medium" | "low") || "medium",
            course: item.course || item.subject,
            description: item.description
          });
        });
      }
      // If response has days array
      else if (response.days && Array.isArray(response.days)) {
        response.days.forEach((day: any) => {
          if (day.activities && Array.isArray(day.activities)) {
            day.activities.forEach((activity: any) => {
              events.push({
                title: activity.title || activity.name || "Activity",
                type: mapEventType(activity.type || "study"),
                time: activity.time || "09:00",
                duration: activity.duration || "1h",
                priority: (activity.priority as "high" | "medium" | "low") || "medium",
                course: activity.course || activity.subject,
                description: activity.description
              });
            });
          }
        });
      }
      // If response is a string or has text property
      else if (typeof response === "string" || response.text) {
        const text = typeof response === "string" ? response : response.text;
        events.push({
          title: "Scheduled Activity",
          type: "study",
          time: "09:00",
          duration: "2h",
          priority: "medium",
          description: text
        });
      }
    } catch (error) {
      console.error("Error parsing schedule response:", error);
    }
    
    // If no events were parsed, create a default one
    if (events.length === 0) {
      events.push({
        title: "Study Session",
        type: "study",
        time: "09:00",
        duration: "2h",
        priority: "medium",
        description: "Generated from AI schedule"
      });
    }
    
    return events;
  };
  
  // Helper to map string types to CalendarEvent types
  const mapEventType = (type: string): CalendarEvent["type"] => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("exam") || lowerType.includes("test")) return "exam";
    if (lowerType.includes("homework") || lowerType.includes("assignment")) return "homework";
    if (lowerType.includes("study") || lowerType.includes("review")) return "study";
    if (lowerType.includes("gym") || lowerType.includes("train") || lowerType.includes("exercise")) return "routine";
    return "study";
  };

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "exam": return <AlertCircle className="h-4 w-4" />;
      case "homework": return <FileText className="h-4 w-4" />;
      case "study": return <BookOpen className="h-4 w-4" />;
      case "routine": return <Dumbbell className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "exam": return "bg-red-500/10 border-red-500/50 text-red-500";
      case "homework": return "bg-yellow-500/10 border-yellow-500/50 text-yellow-500";
      case "study": return "bg-primary/10 border-primary/50 text-primary";
      case "routine": return "bg-green-500/10 border-green-500/50 text-green-500";
      default: return "bg-muted";
    }
  };

  const dailyEvents = selectedDate ? 
    events.filter(e => e.date === `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`)
      .sort((a, b) => a.time.localeCompare(b.time)) 
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-card border border-border rounded-xl p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            Smart Calendar
          </h1>
          <p className="text-muted-foreground mt-2 ml-14">
            AI-powered schedule management with study plans
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isAIAssistantOpen} onOpenChange={setIsAIAssistantOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 hover:bg-secondary/10 hover:text-secondary hover:border-secondary transition-all">
                <Bot className="h-4 w-4" />
                AI Assistant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Schedule Assistant
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="h-[300px] overflow-y-auto space-y-3 p-4 bg-muted/30 rounded-lg">
                  {aiMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-card border"
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="E.g., I train 3 days a week..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !isGeneratingSchedule && handleSendAIMessage()}
                    disabled={isGeneratingSchedule}
                  />
                  <Button onClick={handleSendAIMessage} size="icon" disabled={isGeneratingSchedule}>
                    {isGeneratingSchedule ? (
                      <Zap className="h-4 w-4 animate-pulse" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Plus className="h-4 w-4" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Event title"
                    value={newEvent.title || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="homework">Homework</SelectItem>
                        <SelectItem value="study">Study Session</SelectItem>
                        <SelectItem value="routine">Routine/Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newEvent.priority}
                      onValueChange={(value: any) => setNewEvent({ ...newEvent, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newEvent.date || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={newEvent.time || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    placeholder="e.g., 2h, 1.5h"
                    value={newEvent.duration || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Course (optional)</Label>
                  <Input
                    placeholder="Course name"
                    value={newEvent.course || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, course: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddEvent} className="w-full">
                  Add Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Calendar */}
          <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevMonth} className="hover:bg-primary/10 hover:text-primary hover:border-primary transition-all">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                  className="hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextMonth} className="hover:bg-primary/10 hover:text-primary hover:border-primary transition-all">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-4">
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-2">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {(() => {
                  const { daysInMonth, firstDayOfWeek } = getDaysInMonth(currentDate);
                  const days = [];

                  // Empty cells for days before month starts
                  for (let i = 0; i < firstDayOfWeek; i++) {
                    days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
                  }

                  // Actual days
                  for (let day = 1; day <= daysInMonth; day++) {
                    const dayEvents = getEventsForDate(day);
                    const hasEvents = dayEvents.length > 0;
                    const today = isToday(day);
                    const selected = isSelectedDate(day);

                    days.push(
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className={`aspect-square rounded-xl p-2 text-sm flex flex-col items-start justify-start transition-all border group relative overflow-hidden
                          ${today ? 'bg-primary text-primary-foreground font-bold border-primary shadow-lg shadow-primary/20' : 'border-border hover:border-primary/50 hover:shadow-md'}
                          ${selected && !today ? 'border-primary border-2 bg-primary/5 shadow-md' : ''}
                          ${!today && !selected ? 'hover:bg-muted/50' : ''}
                        `}
                      >
                        <span className="mb-1 relative z-10">{day}</span>
                        {hasEvents && (
                          <div className="flex flex-wrap gap-0.5 w-full relative z-10">
                            {dayEvents.slice(0, 3).map((event, idx) => (
                              <div
                                key={idx}
                                className={`w-full text-[10px] px-1.5 py-0.5 rounded-md truncate border font-medium ${getEventColor(event.type)} shadow-sm`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="text-[10px] text-muted-foreground font-medium mt-0.5">
                                +{dayEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        )}
                        {!today && !selected && <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />}
                      </button>
                    );
                  }

                  return days;
                })()}
              </div>
            </div>
          </div>

          {/* AI Study Plans */}
          <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Sparkles className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI-Generated Study Plans</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Choose a plan to auto-schedule sessions
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {studyPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="border border-border rounded-xl p-5 hover:border-secondary transition-all group hover:shadow-xl bg-card relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                        <Target className="h-4 w-4 text-secondary" />
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors">
                        {plan.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {plan.description}
                    </p>
                    <div className="space-y-2 mb-4 bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span>{plan.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        <span>{plan.events.length} sessions</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Generated {plan.generated}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleApplyStudyPlan(plan)}
                      className="w-full bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20"
                      size="sm"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Apply Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Daily Program */}
        <div className="space-y-6">
          <div className="border border-border rounded-xl p-5 bg-card sticky top-6 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <div>
                <h3 className="font-bold text-lg text-foreground">
                  {selectedDate ? (
                    selectedDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  ) : (
                    "Select a Day"
                  )}
                </h3>
                {selectedDate && (
                  <p className="text-xs text-muted-foreground mt-0.5">Daily Schedule</p>
                )}
              </div>
              {selectedDate && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedDate(null)}
                  className="hover:bg-red-500/10 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {selectedDate ? (
              <div className="space-y-4">
                {dailyEvents.length > 0 ? (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {dailyEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-xl border transition-all hover:shadow-lg group cursor-pointer ${getEventColor(event.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-background/50 rounded-lg mt-0.5 group-hover:scale-110 transition-transform">
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm mb-2 truncate">
                              {event.title}
                            </h4>
                            <div className="space-y-1.5 text-xs">
                              <div className="flex items-center gap-2 font-medium">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{event.time} • {event.duration}</span>
                              </div>
                              {event.course && (
                                <div className="flex items-center gap-2 font-medium">
                                  <BookOpen className="h-3.5 w-3.5" />
                                  <span>{event.course}</span>
                                </div>
                              )}
                              {event.description && (
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Coffee className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No events scheduled</p>
                    <p className="text-xs mt-1">This day is free!</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Click on a day to view</p>
                <p className="text-xs mt-1">daily program</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
