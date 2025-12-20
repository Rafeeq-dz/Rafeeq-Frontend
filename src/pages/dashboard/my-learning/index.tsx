import { Link } from "react-router-dom";
import { BookOpen, Users, MessageSquare, FileText, Briefcase, ArrowRight } from "lucide-react";

export function MyLearningPage() {
  const sections = [
    {
      icon: BookOpen,
      title: "Courses",
      description: "Browse and manage your enrolled courses",
      href: "/dashboard/my-learning/courses",
      count: "5 Active",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Users,
      title: "Classrooms",
      description: "Virtual classrooms for collaborative learning",
      href: "/dashboard/my-learning/classrooms",
      count: "3 Classes",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: MessageSquare,
      title: "Study Groups",
      description: "Join or create study groups with peers",
      href: "/dashboard/my-learning/study-groups",
      count: "7 Groups",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: FileText,
      title: "Resources",
      description: "Access your study materials and resources",
      href: "/dashboard/my-learning/resources",
      count: "142 Files",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Briefcase,
      title: "Workspace",
      description: "Your personal workspace for notes and projects",
      href: "/dashboard/my-learning/workspace",
      count: "Active",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Learning</h1>
        <p className="text-muted-foreground mt-1">
          Access all your courses, study groups, and learning materials in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              to={section.href}
              className="group"
            >
              <div className="border rounded-lg p-6 bg-card hover:shadow-lg transition-all h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${section.color}`} />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full">
                    {section.count}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {section.description}
                </p>

                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Open
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="border rounded-lg p-6 bg-card mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <div className="font-medium">Completed Chapter 5 - Linear Algebra</div>
              <div className="text-sm text-muted-foreground">Mathematics Course • 2 hours ago</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
            <Users className="h-5 w-5 text-green-500" />
            <div className="flex-1">
              <div className="font-medium">Joined CS101 Study Session</div>
              <div className="text-sm text-muted-foreground">Algorithms Study Group • Yesterday</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
            <FileText className="h-5 w-5 text-orange-500" />
            <div className="flex-1">
              <div className="font-medium">Uploaded Physics Lab Report</div>
              <div className="text-sm text-muted-foreground">Resources • 2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
