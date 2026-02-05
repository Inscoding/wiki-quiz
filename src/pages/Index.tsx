import { useState } from "react";
import { QuizData, QuizState } from "@/types/quiz";
import { generateQuiz } from "@/lib/api/quiz";
import HeroSection from "@/components/HeroSection";
import UrlInput from "@/components/UrlInput";
import ArticleSummary from "@/components/ArticleSummary";
import QuizContainer from "@/components/QuizContainer";
import RelatedTopics from "@/components/RelatedTopics";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const { toast } = useToast();

  const handleSubmitUrl = async (url: string) => {
    // Clear previous data first
    setQuizData(null);
    setQuizState("loading");
    
    const response = await generateQuiz(url);
    
    if (response.success && response.data) {
      setQuizData(response.data);
      setQuizState("ready");
    } else {
      toast({
        title: "Error",
        description: response.error || "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
      setQuizState("idle");
    }
  };

  const handleReset = () => {
    setQuizState("idle");
    setQuizData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="font-serif text-lg font-bold text-primary-foreground">W</span>
            </div>
            <span className="font-serif text-xl font-bold text-foreground">WikiQuiz</span>
          </div>
          {quizData && (
            <button
              onClick={handleReset}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← New Quiz
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {quizState === "idle" && (
          <>
            <HeroSection />
            <UrlInput onSubmit={handleSubmitUrl} isLoading={false} />
          </>
        )}

        {quizState === "loading" && (
          <>
            <HeroSection />
            <UrlInput onSubmit={handleSubmitUrl} isLoading={true} />
          </>
        )}

        {(quizState === "ready" || quizState === "in-progress" || quizState === "completed") &&
          quizData && (
            <>
              <ArticleSummary data={quizData} />
              <Separator className="mx-auto max-w-4xl" />
              <QuizContainer data={quizData} onReset={handleReset} />
              <Separator className="mx-auto max-w-4xl" />
              <RelatedTopics topics={quizData.related_topics} />
            </>
          )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            WikiQuiz transforms Wikipedia articles into interactive quizzes.
            <br />
            All content is sourced from{" "}
            <a
              href="https://wikipedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-2 hover:underline"
            >
              Wikipedia
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
