import { Button } from "@/components/ui/button";
import { Briefcase, ExternalLink, MapPin, Clock, DollarSign } from "lucide-react";

export function OpportunitiesPage() {
  const opportunities = [
    {
      id: 1,
      type: "Internship",
      title: "Software Engineering Intern",
      company: "Tech Algérie",
      location: "Algiers",
      duration: "3 months",
      stipend: "20,000 DA/month",
      tags: ["Web Development", "React", "Node.js"],
    },
    {
      id: 2,
      type: "Competition",
      title: "National Coding Challenge",
      company: "Ministry of Education",
      location: "Online",
      duration: "2 days",
      prize: "100,000 DA",
      tags: ["Algorithms", "Problem Solving"],
    },
    {
      id: 3,
      type: "Scholarship",
      title: "Excellence Scholarship Program",
      company: "University of Constantine",
      location: "Constantine",
      duration: "1 year",
      value: "Full tuition + stipend",
      tags: ["Academic Excellence", "Research"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            Opportunities
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover internships, competitions, and scholarships tailored for
            Algerian students
          </p>
        </div>
        <Button>
          <ExternalLink className="h-4 w-4 mr-2" />
          Submit Opportunity
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          All
        </Button>
        <Button variant="outline" size="sm">
          Internships
        </Button>
        <Button variant="outline" size="sm">
          Competitions
        </Button>
        <Button variant="outline" size="sm">
          Scholarships
        </Button>
        <Button variant="outline" size="sm">
          Workshops
        </Button>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="border rounded-lg p-6 bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                  {opp.type}
                </span>
                <h3 className="text-lg font-semibold mt-2">{opp.title}</h3>
                <p className="text-sm text-muted-foreground">{opp.company}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {opp.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {opp.duration}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                {opp.stipend || opp.prize || opp.value}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {opp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-muted rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Button className="w-full" variant="outline">
              View Details
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <h2 className="text-lg font-semibold mb-2">
          🎯 AI-Powered Recommendations
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your profile (Computer Science, Advanced level, interested in
          Programming & AI), we recommend checking these opportunities weekly.
        </p>
        <Button variant="outline">Configure Recommendations</Button>
      </div>
    </div>
  );
}
