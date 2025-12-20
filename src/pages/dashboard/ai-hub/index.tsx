import { Link } from "react-router-dom";
import { Sparkles, Bot, Briefcase, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIHubPage() {
  const features = [
    {
      icon: Sparkles,
      title: "Content Generator",
      description: "Generate curriculum-aligned exams, quizzes, and practice exercises powered by AI",
      href: "/dashboard/ai-hub/content-generator",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Bot,
      title: "AI Tutor",
      description: "Get personalized help with RAG-powered AI that understands your learning context",
      href: "/dashboard/ai-hub/ai-tutor",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Briefcase,
      title: "Opportunities",
      description: "Discover internships, competitions, and scholarships tailored for Algerian students",
      href: "/dashboard/ai-hub/opportunities",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: MessageSquare,
      title: "Discord Sync",
      description: "Integrate with Discord for seamless study group collaboration and notifications",
      href: "/dashboard/ai-hub/discord-sync",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">
          🤖 AI Hub
        </h1>
        <p className="text-lg text-muted-foreground">
          Harness the power of artificial intelligence to enhance your learning
          experience. Our AI tools are specifically designed for Algerian
          university students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.href}
              to={feature.href}
              className="group"
            >
              <div className="border rounded-lg p-6 bg-card hover:shadow-lg transition-all h-full">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 mt-12">
        <h2 className="text-xl font-semibold mb-6 text-center">AI-Powered Learning Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Exams Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">5,683</div>
            <div className="text-sm text-muted-foreground">AI Conversations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">342</div>
            <div className="text-sm text-muted-foreground">Opportunities Found</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-500">89</div>
            <div className="text-sm text-muted-foreground">Discord Communities</div>
          </div>
        </div>
      </div>
    </div>
  );
}
