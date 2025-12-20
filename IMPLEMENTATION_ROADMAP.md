# 🚀 Implementation Roadmap - Frontend Restructuring

## 📁 New File Structure

```
client/src/
├── pages/
│   ├── landing/
│   │   └── landing.tsx
│   ├── auth/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── dashboard/
│   │   ├── dashboard.tsx                    # ⬆️ REDESIGN - AI Insights Center + Calendar Widget
│   │   │
│   │   ├── calendar/                        # 🆕 NEW - Smart Calendar & Schedule
│   │   │   ├── index.tsx                   # Full calendar page
│   │   │   ├── schedule-generator.tsx       # AI schedule suggestions
│   │   │   └── components/
│   │   │       ├── CalendarView.tsx        # Main calendar component
│   │   │       ├── CalendarWidget.tsx      # Dashboard mini widget
│   │   │       ├── EventDetailsModal.tsx
│   │   │       ├── AddEventModal.tsx
│   │   │       ├── SchedulePreview.tsx
│   │   │       ├── GoogleCalendarSync.tsx
│   │   │       ├── EventFilters.tsx
│   │   │       ├── UpcomingDeadlines.tsx
│   │   │       └── TimelineView.tsx
│   │   │
│   │   ├── ai-hub/                          # 🆕 NEW - Core Feature Section
│   │   │   ├── index.tsx                    # AI Hub Landing/Overview
│   │   │   │
│   │   │   ├── content-generator/           # Feature 1: Content Generation
│   │   │   │   ├── index.tsx               # Main page with tabs
│   │   │   │   ├── exam-generator.tsx       # Exam creation
│   │   │   │   ├── quiz-generator.tsx       # Quiz creation
│   │   │   │   ├── exercise-generator.tsx   # Enhanced from ai-tools
│   │   │   │   ├── schedule-planner.tsx     # AI schedule generation
│   │   │   │   └── components/
│   │   │   │       ├── GenerationForm.tsx
│   │   │   │       ├── ContentPreview.tsx
│   │   │   │       ├── GenerationHistory.tsx
│   │   │   │       └── PDFExport.tsx
│   │   │   │
│   │   │   ├── assistant/                   # Feature 4: AI Assistant
│   │   │   │   ├── index.tsx               # Main chat interface
│   │   │   │   ├── chat.tsx                # Enhanced chat with RAG
│   │   │   │   ├── insights.tsx            # Student analytics
│   │   │   │   └── components/
│   │   │   │       ├── ChatInterface.tsx
│   │   │   │       ├── MessageBubble.tsx
│   │   │   │       ├── ResourcePanel.tsx
│   │   │   │       ├── InsightsCard.tsx
│   │   │   │       └── ConversationHistory.tsx
│   │   │   │
│   │   │   ├── recommendations/             # Feature 3: Recommendations
│   │   │   │   ├── index.tsx               # Main recommendations page
│   │   │   │   ├── events.tsx              # Events & competitions
│   │   │   │   ├── internships.tsx         # Internship opportunities
│   │   │   │   ├── training.tsx            # Training programs
│   │   │   │   ├── skills.tsx              # Skills to learn
│   │   │   │   └── components/
│   │   │   │       ├── OpportunityCard.tsx
│   │   │   │       ├── FilterPanel.tsx
│   │   │   │       ├── SavedItems.tsx
│   │   │   │       ├── ApplicationTracker.tsx
│   │   │   │       └── RecommendationFeed.tsx
│   │   │   │
│   │   │   └── discord/                     # Feature 2: Discord Integration
│   │   │       ├── index.tsx               # Discord overview
│   │   │       ├── setup.tsx               # Server connection setup
│   │   │       ├── notifications.tsx       # Notification feed
│   │   │       ├── sync.tsx                # Sync status & settings
│   │   │       └── components/
│   │   │           ├── ServerSelector.tsx
│   │   │           ├── ChannelMapping.tsx
│   │   │           ├── NotificationCard.tsx
│   │   │           ├── SyncStatus.tsx
│   │   │           └── ExtractedContent.tsx
│   │   │
│   │   ├── learning/                        # 🔄 REORGANIZED - Secondary Features
│   │   │   ├── courses/
│   │   │   │   └── index.tsx               # Course management
│   │   │   ├── classrooms/
│   │   │   │   ├── index.tsx               # Moved from dashboard/classrooms
│   │   │   │   └── [id].tsx
│   │   │   ├── study-groups/
│   │   │   │   ├── index.tsx               # Moved from dashboard/study-groups
│   │   │   │   └── [id].tsx
│   │   │   ├── resources/
│   │   │       └── index.tsx               # Moved from dashboard/resources
│   │   │
│   │   └── workspace/
│   │       └── workspace.tsx                # ⬆️ KEEP - Focus & productivity tools
│   │
│   └── settings/
│       ├── index.tsx                        # General settings
│       ├── profile.tsx                      # Profile settings
│       └── discord.tsx                      # Discord configuration
│
├── components/
│   ├── layout/
│   │   ├── dashboard-sidebar.tsx            # ⬆️ UPDATE - New navigation
│   │   ├── dashboard-header.tsx
│   │   ├── dashboard-layout.tsx
│   │   └── navbar.tsx
│   │
│   ├── calendar/                            # 🆕 NEW - Calendar components
│   │   ├── CalendarGrid.tsx                # Month/week/day grid view
│   │   ├── EventCard.tsx                   # Individual event display
│   │   ├── MiniCalendar.tsx                # Dashboard widget
│   │   ├── EventList.tsx                   # Agenda/list view
│   │   ├── DatePicker.tsx                  # Date selection
│   │   ├── TimePicker.tsx                  # Time selection
│   │   ├── RecurrenceSelector.tsx          # Recurring events
│   │   ├── GoogleCalendarButton.tsx        # OAuth integration
│   │   └── ConflictWarning.tsx             # Schedule conflicts
│   │
│   ├── ai-hub/                              # 🆕 NEW - Shared AI components
│   │   ├── AIFeatureCard.tsx               # Reusable feature card
│   │   ├── LoadingAnimation.tsx            # AI-themed loading
│   │   ├── AIBadge.tsx                     # "AI-Powered" badge
│   │   └── GradientBackground.tsx          # Gradient effects
│   │
│   ├── content-generator/
│   │   ├── DifficultySelector.tsx
│   │   ├── SubjectSelector.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── ContentTypeSelector.tsx
│   │
│   ├── recommendations/
│   │   ├── OpportunityFilters.tsx
│   │   ├── MatchScoreBadge.tsx
│   │   └── DeadlineCounter.tsx
│   │
│   ├── discord/
│   │   ├── DiscordConnectButton.tsx
│   │   ├── ServerCard.tsx
│   │   └── NotificationBell.tsx
│   │
│   └── assistant/
│       ├── ChatInput.tsx
│       ├── MessageList.tsx
│       ├── ResourceRecommendations.tsx
│       └── PerformanceChart.tsx
│
├── contexts/
│   ├── auth-context.tsx
│   ├── ai-context.tsx                       # 🆕 NEW - AI state management
│   ├── discord-context.tsx                  # 🆕 NEW - Discord state
│   └── recommendations-context.tsx          # 🆕 NEW - Recommendations state
│
├── hooks/
│   ├── useContentGeneration.ts              # 🆕 NEW
│   ├── useDiscordSync.ts                    # 🆕 NEW
│   ├── useRecommendations.ts                # 🆕 NEW
│   ├── useAIAssistant.ts                    # 🆕 NEW
│   ├── useRAGQuery.ts                       # 🆕 NEW
│   ├── useCalendar.ts                       # 🆕 NEW - Calendar state
│   ├── useGoogleCalendar.ts                 # 🆕 NEW - Google sync
│   └── useScheduleGenerator.ts              # 🆕 NEW - AI schedules
│
├── api/
│   ├── api.ts                               # ⬆️ UPDATE - Add new endpoints
│   ├── ai-api.ts                           # 🆕 NEW - AI services
│   ├── discord-api.ts                       # 🆕 NEW - Discord integration
│   ├── recommendations-api.ts               # 🆕 NEW - Recommendations
│   ├── rag-api.ts                          # 🆕 NEW - RAG system
│   ├── calendar-api.ts                     # 🆕 NEW - Calendar CRUD
│   └── google-calendar-api.ts              # 🆕 NEW - Google Calendar OAuth
│
└── types/
    ├── types.ts                             # ⬆️ UPDATE - Add new types
    ├── ai-types.ts                         # 🆕 NEW - AI-related types
    ├── discord-types.ts                     # 🆕 NEW - Discord types
    ├── recommendation-types.ts              # 🆕 NEW - Recommendation types
    └── calendar-types.ts                    # 🆕 NEW - Calendar & event types
```

---

## 📝 Step-by-Step Implementation Guide

### **Step 1: Create New Type Definitions**

**File: `src/types/ai-types.ts`**
```typescript
export type ContentType = 'exam' | 'quiz' | 'exercise' | 'schedule';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'baccalaureate';
export type SubjectType = 'mathematics' | 'physics' | 'chemistry' | 'biology' | 'cs' | 'arabic' | 'french' | 'english';

export interface ContentGenerationRequest {
  contentType: ContentType;
  subject: SubjectType;
  topic: string;
  difficulty: DifficultyLevel;
  language: 'ar' | 'fr';
  questionCount?: number;
  duration?: number; // For exams/quizzes
  includeAnswers?: boolean;
  studentLevel?: string;
}

export interface GeneratedContent {
  id: string;
  type: ContentType;
  content: string;
  answers?: string;
  metadata: {
    subject: SubjectType;
    topic: string;
    difficulty: DifficultyLevel;
    generatedAt: Date;
  };
}

export interface ScheduleBlock {
  id: string;
  title: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  type: 'study' | 'break' | 'homework' | 'exam' | 'class';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface AIAssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  resources?: ResourceRecommendation[];
  insights?: StudentInsight[];
}

export interface StudentInsight {
  category: 'performance' | 'habit' | 'recommendation';
  title: string;
  description: string;
  actionable: boolean;
  action?: string;
}

export interface ResourceRecommendation {
  id: string;
  title: string;
  type: 'youtube' | 'pdf' | 'article' | 'exercise';
  url: string;
  relevanceScore: number;
  source: 'discord' | 'database' | 'web' | 'youtube';
}
```

**File: `src/types/discord-types.ts`**
```typescript
export interface DiscordServer {
  id: string;
  name: string;
  icon?: string;
  connected: boolean;
  channelMappings: ChannelMapping[];
}

export interface ChannelMapping {
  channelId: string;
  channelName: string;
  category: 'homework' | 'announcements' | 'resources' | 'general' | 'events';
  enabled: boolean;
}

export interface DiscordNotification {
  id: string;
  serverId: string;
  channelId: string;
  type: 'homework' | 'announcement' | 'resource' | 'event';
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  timestamp: Date;
  read: boolean;
  important: boolean;
  deadline?: Date;
  attachments?: DiscordAttachment[];
}

export interface DiscordAttachment {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'pdf' | 'document' | 'video' | 'link';
  size: number;
}

export interface SyncStatus {
  lastSync: Date;
  status: 'syncing' | 'synced' | 'error' | 'disconnected';
  itemsSynced: number;
  errors: string[];
}
```

**File: `src/types/recommendation-types.ts`**
```typescript
export type OpportunityType = 'event' | 'internship' | 'training' | 'competition' | 'scholarship';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Opportunity {
  id: string;
  type: OpportunityType;
  title: string;
  description: string;
  organization: string;
  location: string;
  isRemote: boolean;
  deadline?: Date;
  startDate?: Date;
  endDate?: Date;
  requirements: string[];
  benefits: string[];
  matchScore: number; // 0-100
  tags: string[];
  url: string;
  saved: boolean;
  applied: boolean;
}

export interface SkillRecommendation {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  demand: 'low' | 'medium' | 'high';
  matchScore: number;
  learningResources: LearningResource[];
  relatedOpportunities: string[]; // Opportunity IDs
}

export interface LearningResource {
  id: string;
  title: string;
  platform: string;
  type: 'course' | 'tutorial' | 'book' | 'video';
  duration: string;
  level: SkillLevel;
  url: string;
  price: number;
  rating?: number;
}

export interface RecommendationFilters {
  types: OpportunityType[];
  locations: string[];
  remote: boolean;
  deadlineRange?: { start: Date; end: Date };
  skillLevel?: SkillLevel;
  tags?: string[];
}
```

**File: `src/types/calendar-types.ts`**
```typescript
export type EventType = 'exam' | 'homework' | 'class' | 'study' | 'event' | 'break' | 'personal';
export type EventPriority = 'low' | 'medium' | 'high' | 'urgent';
export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';
export type CalendarView = 'day' | 'week' | 'month' | 'agenda';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  priority: EventPriority;
  startTime: Date;
  endTime: Date;
  location?: string;
  color: string;
  completed: boolean;
  
  // Related data
  courseId?: string;
  classroomId?: string;
  assignmentId?: string;
  
  // Recurrence
  recurrence?: {
    type: RecurrenceType;
    interval: number;
    endDate?: Date;
    daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  };
  
  // Reminders
  reminders: EventReminder[];
  
  // Attachments
  attachments?: EventAttachment[];
  
  // Source tracking
  source: 'manual' | 'discord' | 'google' | 'ai-generated' | 'classroom';
  discordMessageId?: string;
  googleEventId?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface EventReminder {
  id: string;
  eventId: string;
  type: 'notification' | 'email' | 'sms';
  minutesBefore: number; // 0, 15, 30, 60, 1440 (1 day), 10080 (1 week)
  sent: boolean;
}

export interface EventAttachment {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'image' | 'link' | 'document';
  size?: number;
}

export interface AIScheduleSuggestion {
  id: string;
  name: string;
  description: string;
  type: 'intensive' | 'balanced' | 'light' | 'custom';
  totalStudyHours: number;
  totalBreakTime: number;
  events: CalendarEvent[];
  score: number; // AI confidence score
  reasoning: string; // Why this schedule is suggested
  recommendations: string[];
}

export interface GoogleCalendarSettings {
  connected: boolean;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
  syncEnabled: boolean;
  syncFrequency: 'realtime' | 'hourly' | 'daily';
  selectedCalendars: string[]; // Google Calendar IDs
  conflictResolution: 'platform' | 'google' | 'ask';
  lastSync?: Date;
}

export interface CalendarFilters {
  types: EventType[];
  priorities: EventPriority[];
  dateRange: { start: Date; end: Date };
  sources: Array<'manual' | 'discord' | 'google' | 'ai-generated'>;
  showCompleted: boolean;
}

export interface CalendarStats {
  totalEvents: number;
  upcomingDeadlines: number;
  studyHoursThisWeek: number;
  completionRate: number;
  mostProductiveTime?: string; // e.g., "9-11 AM"
  averageStudySessionLength: number; // in minutes
}
```

---

### **Step 2: Update Routing**

**File: `src/App.tsx`**

Add these new routes:

```typescript
// Inside the /dashboard route
<Route path="calendar" element={<CalendarPage />} />
<Route path="calendar/schedule-generator" element={<ScheduleGeneratorPage />} />

<Route path="ai-hub">
  <Route index element={<AIHubPage />} />
  
  {/* Content Generator */}
  <Route path="content-generator" element={<ContentGeneratorPage />} />
  
  {/* AI Assistant */}
  <Route path="assistant" element={<AIAssistantPage />} />
  
  {/* Recommendations */}
  <Route path="recommendations" element={<RecommendationsPage />} />
  <Route path="recommendations/events" element={<EventsPage />} />
  <Route path="recommendations/internships" element={<InternshipsPage />} />
  <Route path="recommendations/training" element={<TrainingPage />} />
  <Route path="recommendations/skills" element={<SkillsPage />} />
  
  {/* Discord Integration */}
  <Route path="discord" element={<DiscordIntegrationPage />} />
  <Route path="discord/setup" element={<DiscordSetupPage />} />
  <Route path="discord/notifications" element={<DiscordNotificationsPage />} />
</Route>

{/* Learning Section - Reorganized */}
<Route path="learning">
  <Route path="courses" element={<CoursesPage />} />
  <Route path="classrooms" element={<ClassroomsPage />} />
  <Route path="classrooms/:id" element={<ClassroomPage />} />
  <Route path="study-groups" element={<StudyGroupsPage />} />
  <Route path="study-groups/:id" element={<StudyGroupPage />} />
  <Route path="resources" element={<ResourcesPage />} />
</Route>
```

---

### **Step 3: Update Sidebar Navigation**

**File: `src/components/layout/dashboard-sidebar.tsx`**

Update the navigation items:

```typescript
import {
  Home,
  Sparkles,
  Bot,
  Target,
  Hash,
  BookOpen,
  School,
  Users,
  FileText,
  Briefcase,
  Settings,
  LogOut
} from "lucide-react";

const sidebarItems = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: <Home size={20} /> }
    ]
  },
  {
    section: "🤖 AI Hub",
    highlight: true, // Add visual emphasis
    items: [
      { 
        label: "Content Generator", 
        href: "/dashboard/ai-hub/content-generator", 
        icon: <Sparkles size={20} />,
        badge: "AI" 
      },
      { 
        label: "AI Assistant", 
        href: "/dashboard/ai-hub/assistant", 
        icon: <Bot size={20} />,
        badge: "AI" 
      },
      { 
        label: "Recommendations", 
        href: "/dashboard/ai-hub/recommendations", 
        icon: <Target size={20} />,
        badge: "AI" 
      },
      { 
        label: "Discord Integration", 
        href: "/dashboard/ai-hub/discord", 
        icon: <Hash size={20} /> 
      }
    ]
  },
  {
    section: "My Learning",
    items: [
      { label: "Courses", href: "/dashboard/learning/courses", icon: <BookOpen size={20} /> },
      { label: "Classrooms", href: "/dashboard/learning/classrooms", icon: <School size={20} /> },
      { label: "Study Groups", href: "/dashboard/learning/study-groups", icon: <Users size={20} /> },
      { label: "Resources", href: "/dashboard/learning/resources", icon: <FileText size={20} /> }
    ]
  },
  {
    section: "Tools",
    items: [
      { label: "Workspace", href: "/dashboard/workspace", icon: <Briefcase size={20} /> }
    ]
  }
];
```

---

### **Step 4: Create API Integration Layer**

**File: `src/api/ai-api.ts`**

```typescript
import api from './api';
import { ContentGenerationRequest, GeneratedContent, AIAssistantMessage } from '@/types/ai-types';

export const aiApi = {
  // Content Generation
  generateContent: async (request: ContentGenerationRequest): Promise<GeneratedContent> => {
    const response = await api.post('/ai/generate-content', request);
    return response.data;
  },

  getGenerationHistory: async (): Promise<GeneratedContent[]> => {
    const response = await api.get('/ai/generation-history');
    return response.data;
  },

  // AI Assistant
  sendMessage: async (message: string, conversationId?: string): Promise<AIAssistantMessage> => {
    const response = await api.post('/ai/assistant/message', {
      message,
      conversationId
    });
    return response.data;
  },

  getConversationHistory: async (conversationId: string): Promise<AIAssistantMessage[]> => {
    const response = await api.get(`/ai/assistant/conversations/${conversationId}`);
    return response.data;
  },

  // Student Insights
  getStudentInsights: async (): Promise<any> => {
    const response = await api.get('/ai/insights');
    return response.data;
  },

  // Schedule Generation
  generateSchedule: async (preferences: any): Promise<any> => {
    const response = await api.post('/ai/generate-schedule', preferences);
    return response.data;
  }
};
```

---

### **Step 5: Create Core Feature Pages**

I'll create starter templates for each major page. Would you like me to:

1. **Create the full implementation** for all new pages
2. **Create template/starter files** that you can build upon
3. **Focus on one feature at a time** (e.g., start with Content Generator)

Which approach would you prefer? This will help me provide the most useful code for your needs.

Also, some questions to guide implementation:

1. **Do you have backend APIs ready** for these features, or should I create mock data for now?
2. **Which AI model/service** will you use? (OpenAI, Google Gemini, Claude, local model?)
3. **For Discord integration**, do you have a Discord bot already, or should I include setup instructions?
4. **Design system**: Should I use shadcn/ui components (which you already have) or add new libraries?

Let me know your preferences and I'll proceed with the implementation! 🚀
