import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  FileText,
  Download,
  Copy,
  Bot,
  BookOpen,
  RefreshCw,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Zap,
} from "lucide-react";
import { aiApi, ExamRequest, ExerciseRequest, QuizRequest } from "@/api/api";
import { toast } from "sonner";

export function AIToolsPage() {
  // Content Generator State
  const [contentType, setContentType] = useState("exam");
  const [subject, setSubject] = useState("mathematics");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [numQuestions, setNumQuestions] = useState(10);
  const [language, setLanguage] = useState("en");
  const [userInput, setUserInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    main: string;
    secondary?: string;
  } | null>(null);

  // Exercise Generator State
  const [exSubject, setExSubject] = useState("mathematics");
  const [exTopic, setExTopic] = useState("algebra");
  const [exDifficulty, setExDifficulty] = useState("medium");
  const [exLanguage, setExLanguage] = useState("french");
  const [exUserInput, setExUserInput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [generatingExercise, setGeneratingExercise] = useState(false);
  const [generatedExercise, setGeneratedExercise] = useState<{
    exercises: string;
    solutions: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setGenerating(true);
    setGeneratedContent(null);

    try {
      if (contentType === "exam") {
        // Build a comprehensive prompt for better results
        const defaultPrompt = `Generate a comprehensive ${difficulty} level exam on ${topic} in ${subject}. Include ${numQuestions} questions that test understanding, application, and problem-solving skills. Make the exam suitable for university/college students.`;
        const finalPrompt = userInput ? `${defaultPrompt}\n\nAdditional requirements: ${userInput}` : defaultPrompt;
        
        const request: ExamRequest = {
          subject,
          num_questions: numQuestions,
          user_input: finalPrompt,
        };
        const response = await aiApi.generateExam(request);
        setGeneratedContent({
          main: response.exam,
          secondary: response.corrections,
        });
        toast.success("Exam generated successfully!");
      } else if (contentType === "quiz") {
        // Build a comprehensive prompt for quiz
        const defaultPrompt = `Create a ${difficulty} level quiz with ${numQuestions} multiple-choice questions on ${topic} in ${subject}. Each question should have 3 options (a, b, c) with only one correct answer. Include clear explanations for learning.`;
        const finalPrompt = userInput ? `${defaultPrompt}\n\nAdditional requirements: ${userInput}` : defaultPrompt;
        
        const request: QuizRequest = {
          subject,
          num_questions: numQuestions,
          user_input: finalPrompt,
        };
        const response = await aiApi.generateQuiz(request);
        
        // Format the quiz response correctly
        const formattedQuiz = response.quizzes
          .map((quiz, idx) => {
            const correctOption = quiz.options.find(opt => opt.is_correct);
            return `**Question ${idx + 1}:** ${quiz.question}\n\nOptions:\n${quiz.options
              .map(opt => `${opt.choice}. ${opt.value}`)
              .join("\n")}\n\n**Correct Answer:** ${correctOption?.choice.toUpperCase()}. ${correctOption?.value}`;
          })
          .join("\n\n---\n\n");
        setGeneratedContent({
          main: formattedQuiz,
        });
        toast.success("Quiz generated successfully!");
      } else {
        // For exercises and flashcards, use exercise endpoint
        const defaultPrompt = `Generate ${numQuestions} ${difficulty} level practice exercises on ${topic} in ${subject}. Include varied problem types that help students master the concepts. Provide detailed step-by-step solutions for each exercise.`;
        const finalPrompt = userInput ? `${defaultPrompt}\n\nAdditional requirements: ${userInput}` : defaultPrompt;
        
        const request: ExerciseRequest = {
          subject,
          num_exercises: numQuestions,
          user_input: finalPrompt,
        };
        const response = await aiApi.generateExercise(request);
        setGeneratedContent({
          main: response.exercises,
          secondary: response.solutions,
        });
        toast.success("Exercises generated successfully!");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate content");
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateExercise = async () => {
    setGeneratingExercise(true);
    setShowSolution(false);
    setGeneratedExercise(null);

    try {
      // Build a comprehensive prompt for better exercise generation
      const defaultPrompt = `Generate a ${exDifficulty} level practice exercise on ${exTopic} in ${exSubject}. The exercise should be challenging and educational, suitable for ${exDifficulty === "baccalaureate" ? "high school final exam preparation" : "university students"}. Include multiple parts if appropriate, and provide detailed step-by-step solutions that explain the reasoning.`;
      const finalPrompt = exUserInput ? `${defaultPrompt}\n\nAdditional requirements: ${exUserInput}` : defaultPrompt;
      
      const request: ExerciseRequest = {
        subject: exSubject,
        num_exercises: 1,
        user_input: finalPrompt,
      };
      const response = await aiApi.generateExercise(request);
      setGeneratedExercise(response);
      toast.success("Exercise generated successfully!");
    } catch (error) {
      console.error("Exercise generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate exercise");
    } finally {
      setGeneratingExercise(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent?.main) {
      navigator.clipboard.writeText(
        generatedContent.main + (generatedContent.secondary ? `\n\n---\n\n${generatedContent.secondary}` : "")
      );
      toast.success("Content copied to clipboard!");
    }
  };

  const handleExport = () => {
    if (generatedContent?.main) {
      const content = generatedContent.main + (generatedContent.secondary ? `\n\n---\n\n${generatedContent.secondary}` : "");
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${contentType}-${subject}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Content exported!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI-Powered Tools</h1>
            <p className="text-muted-foreground mt-1">
              Generate curriculum-aligned content and practice exercises with AI
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
          <TabsTrigger value="generator" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            Content Generator
          </TabsTrigger>
          <TabsTrigger value="tutor" className="gap-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
            <Lightbulb className="h-4 w-4" />
            Exercise Generator
          </TabsTrigger>
        </TabsList>

        {/* Content Generator Tab */}
        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
            {/* Configuration Panel */}
            <div className="border border-border rounded-xl p-6 bg-card shadow-sm h-fit sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold">Generation Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content-type" className="text-sm font-medium">
                    Content Type
                  </Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger id="content-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exam">Full Exam</SelectItem>
                      <SelectItem value="quiz">Quick Quiz</SelectItem>
                      <SelectItem value="exercises">Practice Exercises</SelectItem>
                      <SelectItem value="flashcards">Flashcards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-sm font-medium">
                    Topic *
                  </Label>
                  <Input
                    id="topic"
                    type="text"
                    placeholder="e.g., Linear Algebra, Calculus..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-sm font-medium">
                    Difficulty Level
                  </Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger id="difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questions" className="text-sm font-medium">
                    Number of Questions
                  </Label>
                  <Input
                    id="questions"
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    min={1}
                    max={50}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm font-medium">
                    Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-input" className="text-sm font-medium">
                    Additional Instructions (Improves Results)
                  </Label>
                  <Input
                    id="user-input"
                    type="text"
                    placeholder="e.g., Focus on practical applications, include diagrams..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Add specific requirements to get more targeted content</p>
                </div>

                <Button className="w-full mt-6 shadow-lg shadow-primary/20" onClick={handleGenerate} disabled={generating}>
                  {generating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="border border-border rounded-xl p-6 bg-card shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold">Generated Content</h2>
                </div>
                {generatedContent && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                )}
              </div>

              {generating ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="relative">
                      <Sparkles className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                      <Zap className="h-8 w-8 text-secondary absolute top-0 left-1/2 -translate-x-1/2 animate-ping" />
                    </div>
                    <p className="text-foreground font-medium mb-1">
                      Generating your content...
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This may take a few moments
                    </p>
                  </div>
                </div>
              ) : generatedContent ? (
                <div className="space-y-4">
                  <div className="p-6 bg-muted/50 rounded-xl border border-border max-h-[600px] overflow-y-auto">
                    <pre className="text-foreground whitespace-pre-wrap font-sans">{generatedContent.main}</pre>
                  </div>
                  {generatedContent.secondary && (
                    <div className="p-6 bg-secondary/5 rounded-xl border border-secondary/20 max-h-[400px] overflow-y-auto">
                      <h3 className="font-bold mb-3 text-foreground flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-secondary" />
                        Solutions / Corrections
                      </h3>
                      <pre className="text-foreground whitespace-pre-wrap font-sans">{generatedContent.secondary}</pre>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lightbulb className="h-4 w-4" />
                    <span>Tip: You can edit and customize the generated content before exporting</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-center">
                  <div>
                    <div className="p-4 bg-muted/30 rounded-full w-fit mx-auto mb-4">
                      <FileText className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <p className="text-foreground font-medium mb-2">
                      Ready to generate content
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Configure your settings and click "Generate Content" to create
                      curriculum-aligned exams, quizzes, or exercises
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Exercise Generator Tab */}
        <TabsContent value="tutor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
            {/* Configuration Panel */}
            <div className="border border-border rounded-xl p-6 bg-card shadow-sm h-fit sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-secondary" />
                </div>
                <h2 className="text-lg font-bold">Exercise Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ex-subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Select value={exSubject} onValueChange={setExSubject}>
                    <SelectTrigger id="ex-subject">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ex-topic" className="text-sm font-medium">
                    Topic
                  </Label>
                  <Select value={exTopic} onValueChange={setExTopic}>
                    <SelectTrigger id="ex-topic">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="algebra">Algebra</SelectItem>
                      <SelectItem value="calculus">Calculus</SelectItem>
                      <SelectItem value="geometry">Geometry</SelectItem>
                      <SelectItem value="trigonometry">Trigonometry</SelectItem>
                      <SelectItem value="statistics">Statistics & Probability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ex-difficulty" className="text-sm font-medium">
                    Difficulty Level
                  </Label>
                  <Select value={exDifficulty} onValueChange={setExDifficulty}>
                    <SelectTrigger id="ex-difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="baccalaureate">Baccalaureate Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ex-language" className="text-sm font-medium">
                    Language
                  </Label>
                  <Select value={exLanguage} onValueChange={setExLanguage}>
                    <SelectTrigger id="ex-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ex-user-input" className="text-sm font-medium">
                    Additional Instructions (Improves Results)
                  </Label>
                  <Input
                    id="ex-user-input"
                    type="text"
                    placeholder="e.g., Include word problems, focus on real-world scenarios..."
                    value={exUserInput}
                    onChange={(e) => setExUserInput(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Add specific requirements to get more targeted exercises</p>
                </div>

                <Button
                  className="w-full mt-6 bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20"
                  onClick={handleGenerateExercise}
                  disabled={generatingExercise}
                >
                  {generatingExercise ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Generate Exercise
                    </>
                  )}
                </Button>
              </div>

              {/* How It Works */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  How It Works
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Data Collection</p>
                      <p className="text-xs text-muted-foreground">
                        Gather past exams from curriculum
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">AI Processing</p>
                      <p className="text-xs text-muted-foreground">
                        Content analyzed and indexed
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Generation</p>
                      <p className="text-xs text-muted-foreground">
                        New exercises matching style
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercise Display Panel */}
            <div className="space-y-6">
              <div className="border border-border rounded-xl p-6 bg-card shadow-sm">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-secondary" />
                    <h3 className="text-lg font-bold">Generated Exercise</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Bookmark className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>

                {generatingExercise ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="relative">
                        <Lightbulb className="h-16 w-16 text-secondary mx-auto mb-4 animate-pulse" />
                        <Zap className="h-8 w-8 text-primary absolute top-0 left-1/2 -translate-x-1/2 animate-ping" />
                      </div>
                      <p className="text-foreground font-medium mb-1">
                        Generating exercise...
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Creating curriculum-aligned problems
                      </p>
                    </div>
                  </div>
                ) : generatedExercise ? (
                  <>
                    <div className="bg-muted/50 rounded-xl p-6 mb-6 border border-border max-h-[500px] overflow-y-auto">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                          {exSubject.charAt(0).toUpperCase() + exSubject.slice(1)}
                        </span>
                        <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">
                          {exTopic.charAt(0).toUpperCase() + exTopic.slice(1)}
                        </span>
                      </div>
                      <pre className="text-foreground whitespace-pre-wrap font-sans">{generatedExercise.exercises}</pre>
                    </div>

                    {showSolution ? (
                      <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/20 max-h-[400px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-foreground flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-secondary" />
                            Solution
                          </h4>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:bg-green-500/10 hover:text-green-500">
                              <ThumbsUp className="h-3.5 w-3.5" />
                              Helpful
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 hover:bg-red-500/10 hover:text-red-500">
                              <ThumbsDown className="h-3.5 w-3.5" />
                              Report
                            </Button>
                          </div>
                        </div>
                        <pre className="text-foreground whitespace-pre-wrap font-sans">{generatedExercise.solutions}</pre>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full hover:bg-secondary/10 hover:text-secondary hover:border-secondary"
                        onClick={() => setShowSolution(true)}
                      >
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Show Solution
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-96 text-center">
                    <div>
                      <div className="p-4 bg-muted/30 rounded-full w-fit mx-auto mb-4">
                        <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                      <p className="text-foreground font-medium mb-2">
                        Ready to generate exercises
                      </p>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Configure your settings and click "Generate Exercise" to create practice problems
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Exercises */}
              <div className="border border-border rounded-xl p-6 bg-card shadow-sm">
                <h3 className="text-lg font-bold mb-4">Recent Exercises</h3>
                <div className="space-y-3">
                  {[
                    { title: "Calculus: Integration", date: "2 hours ago", subject: "Mathematics" },
                    { title: "Physics: Mechanics", date: "Yesterday", subject: "Physics" },
                    { title: "Algebra: Polynomials", date: "3 days ago", subject: "Mathematics" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="px-1.5 py-0.5 bg-muted rounded text-xs">
                            {item.subject}
                          </span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
