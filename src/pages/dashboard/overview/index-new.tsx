import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import {
  Bot,
  Sparkles,
  BriefcaseIcon,
  GraduationCap,
  TrendingUp,
  BookOpen,
  FileText,
  ClipboardList,
  MessageCircle,
  ExternalLink,
  Plus,
  Loader2,
  Download,
  X,
  Send,
  Zap,
  Calendar,
  Clock,
  Target,
  Award,
  ChevronRight,
  Settings,
  RefreshCw,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { Course } from "@/types/types";
import {  courseApi } from "@/api/api";
import { jsPDF } from "jspdf";

const availableIcons = [
  { value: "📚", label: "Book" },
  { value: "🧪", label: "Science" },
  { value: "✏️", label: "Pencil" },
  { value: "💻", label: "Computer" },
  { value: "🎨", label: "Art" },
  { value: "🎓", label: "Graduation" },
];

const predefinedCourses = [
  {
    title: "Analyse Mathématique",
    description: "Étude des fonctions, des suites, des limites et des dérivées.",
    icon: "📐",
    url1: "https://www.youtube.com/watch?v=agI-SDrMxkc",
    url2: "https://www.youtube.com/watch?v=OYuZoX35_sw",
    url3: "https://www.youtube.com/watch?v=ctW9QTPBtq8",
    url4: "https://www.youtube.com/watch?v=0rKomLMvH8w",
  },
  {
    title: "Probabilités et Statistiques",
    description: "Introduction aux concepts de probabilité, de variables aléatoires et d'analyse statistique.",
    icon: "📊",
    url1: "https://www.youtube.com/watch?v=UkCQqsIMZPo",
    url2: "https://www.youtube.com/watch?v=SqC4Fra91ww",
    url3: "https://www.youtube.com/watch?v=4-KQN655XkY",
    url4: "https://www.youtube.com/watch?v=Ilx-kK5FEDQ",
  },
  {
    title: "Réseaux 1",
    description: "Introduction aux réseaux informatiques, protocoles de communication et topologies.",
    icon: "🌐",
    url1: "https://www.youtube.com/watch?v=3QhU9jd03a0",
    url2: "https://www.youtube.com/watch?v=qiQR5rTSshw",
    url3: "https://www.youtube.com/watch?v=VwN91x5i25g",
    url4: "https://www.youtube.com/watch?v=IPvYjXCsTg8",
  },
  {
    title: "Algorithmique 1",
    description: "Apprentissage des bases de la programmation et des structures algorithmiques.",
    icon: "💻",
    url1: "https://www.youtube.com/watch?v=7eh4d6sabA0",
    url2: "https://www.youtube.com/watch?v=OSbUA5Q9Cec",
    url3: "https://www.youtube.com/watch?v=wUSDVGivd-8",
    url4: "https://www.youtube.com/watch?v=dAkZTYgPBsw",
  },
  {
    title: "Électricité",
    description: "Étude des circuits électriques, lois fondamentales et applications pratiques.",
    icon: "⚡",
    url1: "https://www.youtube.com/watch?v=3QhU9jd03a0",
    url2: "https://www.youtube.com/watch?v=qiQR5rTSshw",
    url3: "https://www.youtube.com/watch?v=VwN91x5i25g",
    url4: "https://www.youtube.com/watch?v=IPvYjXCsTg8",
  },
  {
    title: "Systèmes d'Exploitation",
    description: "Fonctionnement des systèmes d'exploitation, gestion des processus et mémoire.",
    icon: "🖥️",
    url1: "https://www.youtube.com/watch?v=26QPDBe-NB8",
    url2: "https://www.youtube.com/watch?v=5XgBd6rjuDQ",
    url3: "https://www.youtube.com/watch?v=GxT1kU3Yq2A",
    url4: "https://www.youtube.com/watch?v=0nQe6y3n2t8",
  },
  {
    title: "Bases de Données",
    description: "Concepts fondamentaux des bases de données relationnelles et langage SQL.",
    icon: "🗄️",
    url1: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    url2: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
    url3: "https://www.youtube.com/watch?v=9Pzj7Aj25lw",
    url4: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
  },
];

// AI-Recommended Opportunities
const recommendedOpportunities = [
  {
    id: 1,
    type: "job",
    title: "Software Engineer Intern",
    company: "Google Algeria",
    location: "Algiers",
    deadline: "2025-01-15",
    match: 95,
    icon: BriefcaseIcon,
  },
  {
    id: 2,
    type: "training",
    title: "AWS Cloud Practitioner Certification",
    company: "Amazon Web Services",
    location: "Online",
    deadline: "2025-01-20",
    match: 88,
    icon: Award,
  },
  {
    id: 3,
    type: "phd",
    title: "PhD in Machine Learning",
    company: "University of Science and Technology",
    location: "Oran",
    deadline: "2025-02-01",
    match: 82,
    icon: GraduationCap,
  },
  {
    id: 4,
    type: "job",
    title: "Full Stack Developer",
    company: "Yassir",
    location: "Remote",
    deadline: "2025-01-25",
    match: 90,
    icon: BriefcaseIcon,
  },
];

// Recent AI-Generated Content
const recentGenerations = [
  {
    id: 1,
    type: "course",
    title: "Introduction to React Hooks",
    module: "Web Development",
    generatedAt: "2 hours ago",
    icon: BookOpen,
  },
  {
    id: 2,
    type: "quiz",
    title: "Database Normalization Quiz",
    module: "Databases",
    generatedAt: "5 hours ago",
    icon: ClipboardList,
  },
  {
    id: 3,
    type: "exercise",
    title: "Algorithm Complexity Exercises",
    module: "Algorithmique 1",
    generatedAt: "1 day ago",
    icon: FileText,
  },
];

// Quick Access Links
const quickAccessLinks = [
  { label: "AI Tutor", path: "/dashboard/ai-hub/ai-tutor", icon: Bot },
  { label: "Content Generator", path: "/dashboard/ai-hub/content-generator", icon: Sparkles },
  { label: "Opportunities", path: "/dashboard/ai-hub/opportunities", icon: TrendingUp },
  { label: "My Courses", path: "/dashboard/my-learning/courses", icon: BookOpen },
  { label: "Calendar", path: "/dashboard/calendar", icon: Calendar },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
];

type SearchResult = {
  title: string;
  url: string;
  type: "video" | "article" | "course";
  source: string;
  thumbnail?: string;
};

export function DashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();
  const [newCourse, setNewCourse] = useState<{
    title: string;
    description: string;
    icon?: string;
  }>({ title: "", description: "", icon: "📚" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [videoSummary, setVideoSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  // AI Chat Widget States
  const [chatMessages, setChatMessages] = useState<{role: string; content: string}[]>([
    {
      role: "assistant",
      content: "Hello! I'm Rafeeq AI Assistant. I can help you with:\n\n• Administrative processes (enrollment, certificates, etc.)\n• Course recommendations\n• Study tips and resources\n• Career guidance\n\nHow can I assist you today?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Bot Integration States
  const [isBotDialogOpen, setIsBotDialogOpen] = useState(false);
  const [botPlatform, setBotPlatform] = useState<"discord" | "telegram">("discord");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const generateVideoSummary = async (videoUrl: string) => {
    setIsSummarizing(true);
    setVideoSummary(null);

    try {
      const videoId = getYouTubeVideoId(videoUrl);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      const prompt = `
      Summarize this YouTube video with ID ${videoId} about ${
        selectedCourse?.title || "this topic"
      }.
      Provide a concise summary that captures the key points and main concepts.
      Format the summary in bullet points for key concepts, don't mention the video ID.
    `;

      const result = await model.generateContent(prompt);
      const summaryText = result.response.text();
      setVideoSummary(summaryText);
    } catch (error) {
      console.error("Error generating video summary:", error);
      setVideoSummary("Failed to generate summary. Please try again.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const getYouTubeVideoId = (url: string): string | null => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddCourse = async () => {
    if (!newCourse.title) {
      alert("Title is required");
      return;
    }
    setIsLoading(true);
    try {
      const createdCourse = await courseApi.createCourse(newCourse);
      setNewCourse({ title: "", description: "", icon: "📚" });
      setIsDialogOpen(false);
    } catch (err) {
      setError("Failed to create course");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsChatLoading(true);
    
    try {
      const prompt = `You are Rafeeq AI Assistant, a helpful educational AI for Algerian students. 
      You specialize in:
      - Answering questions about administrative processes (enrollment, certificates, scholarships, etc.)
      - Providing study guidance and learning resources
      - Offering career advice
      - Helping with course recommendations
      
      User question: ${userMessage}
      
      Provide a helpful, concise response in a friendly tone.`;
      
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error sending chat message:", error);
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const exportToPdf = () => {
    if (!videoSummary) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Summary: ${selectedCourse?.title || "Video Summary"}`, 10, 15);

    if (selectedVideoUrl) {
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Source: ${selectedVideoUrl}`, 10, 25);
    }

    doc.setFontSize(12);
    doc.setTextColor(0);
    const splitText = doc.splitTextToSize(videoSummary, 180);
    doc.text(splitText, 10, 35);

    doc.save(`${selectedCourse?.title || "video"}-summary.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header with Gradient */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary via-primary to-secondary p-8 text-primary-foreground">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || "Student"}! 👋
          </h1>
          <p className="text-primary-foreground/90">
            Your AI-powered learning companion is ready to assist you
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Access Bar */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Quick Access</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickAccessLinks.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => window.location.href = link.path}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - AI Features */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI-Recommended Opportunities */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">AI-Recommended Opportunities</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
                onClick={() => window.location.href = "/dashboard/ai-hub/opportunities"}
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedOpportunities.slice(0, 4).map((opp) => {
                const Icon = opp.icon;
                return (
                  <div
                    key={opp.id}
                    className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {opp.match}% Match
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {opp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{opp.company}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {opp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {opp.deadline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent AI Generations */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-secondary" />
                <h2 className="text-xl font-bold text-foreground">Recent AI Generations</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-secondary hover:text-secondary/80"
                onClick={() => window.location.href = "/dashboard/ai-hub/content-generator"}
              >
                Generate More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentGenerations.map((gen) => {
                const Icon = gen.icon;
                return (
                  <div
                    key={gen.id}
                    className="flex items-center gap-4 p-3 border border-border rounded-lg hover:border-secondary transition-colors cursor-pointer group"
                  >
                    <div className="p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground group-hover:text-secondary transition-colors">
                        {gen.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {gen.module} • {gen.generatedAt}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Courses Module */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">My Courses</h2>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newCourse.title}
                        onChange={(e) =>
                          setNewCourse({ ...newCourse, title: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        value={newCourse.description}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="icon" className="text-right">
                        Icon
                      </Label>
                      <Select
                        value={newCourse.icon}
                        onValueChange={(value) =>
                          setNewCourse({ ...newCourse, icon: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableIcons.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              <span className="flex items-center gap-2">
                                <span>{icon.value}</span>
                                <span>{icon.label}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddCourse}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Add Course"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {predefinedCourses.map((course, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex flex-col items-center justify-center p-4 rounded-lg min-w-[130px] h-[140px] flex-shrink-0 hover:border-primary hover:bg-primary/5 transition-colors"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <span className="text-3xl mb-2">{course.icon || "📚"}</span>
                    <span className="font-medium text-center text-sm">
                      {course.title}
                    </span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Chat & Bot Integration */}
        <div className="space-y-6">
          {/* AI Chat Assistant */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <div>
                  <h2 className="font-bold">Rafeeq AI Assistant</h2>
                  <p className="text-xs opacity-90">Ask about administrative processes</p>
                </div>
              </div>
            </div>
            <div className="h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-border p-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about enrollment, certificates..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendChatMessage()}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={handleSendChatMessage}
                    disabled={isChatLoading || !chatInput.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bot Integration Widget */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-foreground">Bot Integration</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connect Rafeeq AI to your Discord or Telegram server
            </p>
            <Dialog open={isBotDialogOpen} onOpenChange={setIsBotDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Integrate Bot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Integrate Rafeeq Bot</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Platform</Label>
                    <Select value={botPlatform} onValueChange={(value: any) => setBotPlatform(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discord">Discord</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {botPlatform === "discord" && (
                    <div className="space-y-2">
                      <Label>Discord Server ID</Label>
                      <Input placeholder="Enter your server ID" />
                      <p className="text-xs text-muted-foreground">
                        Right-click your server and select "Copy ID"
                      </p>
                    </div>
                  )}
                  {botPlatform === "telegram" && (
                    <div className="space-y-2">
                      <Label>Telegram Group ID</Label>
                      <Input placeholder="Enter your group ID" />
                      <p className="text-xs text-muted-foreground">
                        Use @userinfobot to get your group ID
                      </p>
                    </div>
                  )}
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Connect {botPlatform === "discord" ? "Discord" : "Telegram"} Bot
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs text-foreground">
                <span className="font-semibold">✨ Bot Features:</span>
                <br />• Course reminders & notifications
                <br />• Administrative help commands
                <br />• Study group coordination
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Drawing Board & Resources Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Drawing Board & Resources</h2>
          </div>
          {selectedCourse && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCourse(null)}
            >
              <X className="h-4 w-4 mr-2" />
              Close Resources
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          {!selectedCourse ? (
            <div className="w-full h-[500px] border border-border rounded-lg overflow-hidden">
              <Tldraw
                persistenceKey={`canvas-${user?._id || "default"}`}
                className={theme === "dark" ? "tldraw-dark" : "tldraw-light"}
              />
            </div>
          ) : (
            <>
              <div className={`h-[500px] border border-border rounded-lg overflow-hidden transition-all ${
                isExpanded ? "w-0 hidden" : "w-1/2"
              }`}>
                <Tldraw
                  persistenceKey={`canvas-${user?._id || "default"}`}
                  className={theme === "dark" ? "tldraw-dark" : "tldraw-light"}
                />
              </div>
              
              <div className={`h-[500px] border border-border rounded-lg overflow-auto flex flex-col transition-all ${
                isExpanded ? "w-full" : "w-1/2"
              }`}>
                <div className="flex justify-between items-center p-4 border-b border-border bg-card sticky top-0 z-10">
                  <span className="font-semibold text-foreground">
                    {selectedCourse.title} - Learning Resources
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Shrink" : "Expand"}
                    </Button>
                  </div>
                </div>

                <div className="p-4 flex-1 overflow-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      selectedCourse.url1,
                      selectedCourse.url2,
                      selectedCourse.url3,
                      selectedCourse.url4,
                    ]
                      .filter((url): url is string => !!url)
                      .map((url, index) => {
                        const videoId = getYouTubeVideoId(url);
                        return (
                          videoId && (
                            <div
                              key={index}
                              className="group relative border border-border rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer"
                              onClick={() => {
                                setSelectedVideoUrl(url);
                                generateVideoSummary(url);
                              }}
                            >
                              <div className="relative">
                                <img
                                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                  alt={`Video ${index + 1}`}
                                  className="w-full h-32 object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="bg-primary text-primary-foreground rounded-full p-3">
                                    <ExternalLink className="h-5 w-5" />
                                  </div>
                                </div>
                              </div>
                              <div className="p-3">
                                <p className="text-sm font-medium text-foreground">
                                  Video {index + 1}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Click to view summary
                                </p>
                              </div>
                            </div>
                          )
                        );
                      })}
                  </div>

                  {selectedVideoUrl && (
                    <div className="mt-6 border border-border rounded-lg overflow-hidden">
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideoUrl)}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="border-0"
                        ></iframe>
                      </div>
                      
                      {isSummarizing ? (
                        <div className="p-4 flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          <span className="text-muted-foreground">Generating AI summary...</span>
                        </div>
                      ) : videoSummary && (
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-primary" />
                              AI-Generated Summary
                            </h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={exportToPdf}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export PDF
                            </Button>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            <p className="text-sm text-foreground whitespace-pre-wrap">
                              {videoSummary}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
