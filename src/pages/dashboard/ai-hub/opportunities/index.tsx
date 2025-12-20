import { Button } from "@/components/ui/button";
import { 
  Compass, 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Briefcase, 
  GraduationCap,
  Sparkles,
  ExternalLink,
  RefreshCw,
  User,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { aiApi, RecommendationItem } from "@/api/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

export function OpportunitiesPage() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Mock student profile data - in production this would come from user context/API
  const studentProfile = {
    name: user?.name || "Student",
    specialty: "Computer Science",
    year: "3rd Year",
    performance: "Advanced",
    gpa: "15.5/20",
    interests: ["Artificial Intelligence", "Web Development", "Machine Learning", "Research"],
    goals: "Become a Software Engineer at a leading tech company",
    strengths: ["Problem Solving", "Programming", "Team Collaboration"],
  };

  const fetchRecommendations = async (contentType?: string) => {
    setIsLoading(true);
    try {
      // Build query based on user profile
      const query = `${studentProfile.specialty} ${studentProfile.interests.join(" ")} ${contentType || ""}`;
      const results = await aiApi.getRecommendations(query, contentType, 10);
      setRecommendations(results);
      toast.success("Recommendations updated!");
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      toast.error("Failed to load recommendations");
      // Show mock data on error
      setRecommendations([
        {
          id: 1,
          name: "AI Research Internship",
          content_type: "intership",
          score: 0.95,
        },
        {
          id: 2,
          name: "Full Stack Development Workshop",
          content_type: "event",
          score: 0.88,
        },
        {
          id: 3,
          name: "Machine Learning Course",
          content_type: "cour",
          score: 0.85,
        },
      ] as any);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "all") {
      fetchRecommendations();
    } else {
      fetchRecommendations(filter);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "intership":
        return <Briefcase className="h-5 w-5" />;
      case "event":
        return <Award className="h-5 w-5" />;
      case "cour":
        return <BookOpen className="h-5 w-5" />;
      case "serie":
        return <GraduationCap className="h-5 w-5" />;
      case "article":
        return <BookOpen className="h-5 w-5" />;
      case "exam":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      intership: "Internship",
      event: "Event",
      cour: "Course",
      serie: "Exercise Series",
      article: "Article",
      exam: "Practice Exam"
    };
    return typeMap[type] || type;
  };

  const getMatchPercentage = (score: number) => {
    return Math.round(score * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5 p-8 border">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Compass className="h-10 w-10 text-primary" />
                <h1 className="text-4xl font-bold">Career Vision</h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Your personalized career path powered by AI. Discover opportunities tailored to your profile, interests, and goals.
              </p>
            </div>
            <Button onClick={() => fetchRecommendations()} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Student Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Summary */}
          <div className="border rounded-xl p-6 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{studentProfile.name}</h2>
                <p className="text-sm text-muted-foreground">{studentProfile.year}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Specialty</span>
                <span className="font-semibold text-sm">{studentProfile.specialty}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Performance</span>
                <span className="font-semibold text-sm flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  {studentProfile.performance}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">GPA</span>
                <span className="font-semibold text-sm">{studentProfile.gpa}</span>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="border rounded-xl p-6 bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {studentProfile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Career Goal */}
          <div className="border rounded-xl p-6 bg-gradient-to-br from-primary/5 to-purple-500/5">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Career Goal
            </h3>
            <p className="text-sm text-muted-foreground">{studentProfile.goals}</p>
          </div>

          {/* Strengths */}
          <div className="border rounded-xl p-6 bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Key Strengths
            </h3>
            <ul className="space-y-2">
              {studentProfile.strengths.map((strength) => (
                <li key={strength} className="text-sm flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("all")}
            >
              All Opportunities
            </Button>
            <Button
              variant={activeFilter === "intership" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("intership")}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Internships
            </Button>
            <Button
              variant={activeFilter === "event" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("event")}
            >
              <Award className="h-4 w-4 mr-2" />
              Events
            </Button>
            <Button
              variant={activeFilter === "cour" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("cour")}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Courses
            </Button>
          </div>

          {/* AI Insight Banner */}
          <div className="border rounded-xl p-6 bg-gradient-to-r from-primary/10 to-purple-500/10">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI-Powered Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your profile ({studentProfile.specialty}, {studentProfile.performance} level), 
                  we've curated {recommendations.length} opportunities that align with your career goals and interests.
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recommendations.length === 0 ? (
            <div className="border rounded-xl p-12 text-center">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No recommendations yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click refresh to discover opportunities tailored to your profile
              </p>
              <Button onClick={() => fetchRecommendations()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Get Recommendations
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {recommendations.map((rec: any) => (
                <div
                  key={rec.id}
                  className="border rounded-xl p-6 bg-card hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        {getTypeIcon(rec.content_type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                            {getTypeName(rec.content_type)}
                          </span>
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-600 rounded flex items-center gap-1">
                            <Star className="h-3 w-3 fill-green-600" />
                            {getMatchPercentage(rec.score)}% Match
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                          {rec.name || "Opportunity"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Recommended based on your profile and career goals
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
