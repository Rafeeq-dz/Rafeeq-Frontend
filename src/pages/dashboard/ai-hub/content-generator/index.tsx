import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Download, Copy } from "lucide-react";

export function ContentGeneratorPage() {
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGenerating(false);
      setGeneratedContent("Sample generated content...");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Content Generator
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate curriculum-aligned exams, quizzes, and exercises powered by
            AI
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        {/* Configuration Panel */}
        <div className="border rounded-lg p-6 bg-card space-y-4">
          <h2 className="text-lg font-semibold">Generation Settings</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Content Type
              </label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="exam">Full Exam</option>
                <option value="quiz">Quick Quiz</option>
                <option value="exercises">Practice Exercises</option>
                <option value="flashcards">Flashcards</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="computer-science">Computer Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Topic</label>
              <input
                type="text"
                placeholder="e.g., Linear Algebra, Calculus..."
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Difficulty Level
              </label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Questions
              </label>
              <input
                type="number"
                defaultValue={10}
                min={1}
                max={50}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>

          <Button className="w-full" onClick={handleGenerate}>
            <Sparkles className="h-4 w-4 mr-2" />
            {generating ? "Generating..." : "Generate Content"}
          </Button>
        </div>

        {/* Preview Panel */}
        <div className="border rounded-lg p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Generated Content</h2>
            {generatedContent && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            )}
          </div>

          {generating ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Sparkles className="h-12 w-12 animate-pulse text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Generating your content...
                </p>
              </div>
            </div>
          ) : generatedContent ? (
            <div className="prose prose-sm max-w-none">
              <div className="p-4 bg-muted rounded-md">
                <p>{generatedContent}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Configure settings and click "Generate Content" to start
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
