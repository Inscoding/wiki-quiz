import { useState } from "react";
import { QuizData } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import QuizQuestionCard from "./QuizQuestion";
import { Trophy, RotateCcw, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizContainerProps {
  data: QuizData;
  onReset: () => void;
}

const QuizContainer = ({ data, onReset }: QuizContainerProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const totalQuestions = data.quiz.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore((prev) => prev + 1);
    setAnsweredQuestions((prev) => [...prev, true]);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsCompleted(false);
    setAnsweredQuestions([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Keep Learning! 📚";
    return "Try Again! 💪";
  };

  // Start Screen
  if (!isStarted) {
    return (
      <section className="py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="card-elevated p-8 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Play className="h-8 w-8 text-accent" />
              </div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                Ready to Test Your Knowledge?
              </h2>
              <p className="mb-6 text-muted-foreground">
                This quiz contains {totalQuestions} questions based on the article about{" "}
                <span className="font-medium text-foreground">{data.title}</span>.
              </p>
              <Button variant="accent" size="xl" onClick={() => setIsStarted(true)}>
                Start Quiz
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Completed Screen
  if (isCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <section className="py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="card-elevated glow-accent p-8 text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                <Trophy className="h-10 w-10 text-accent" />
              </div>
              <h2 className="mb-2 font-serif text-3xl font-bold text-foreground">
                {getScoreMessage()}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                You scored {score} out of {totalQuestions} ({percentage}%)
              </p>

              {/* Score Breakdown */}
              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-success/10 p-4">
                  <p className="text-2xl font-bold text-success">{score}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="rounded-lg bg-destructive/10 p-4">
                  <p className="text-2xl font-bold text-destructive">
                    {totalQuestions - score}
                  </p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div className="rounded-lg bg-accent/10 p-4">
                  <p className="text-2xl font-bold text-accent">{percentage}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button variant="accent" size="lg" onClick={handleRestart}>
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" size="lg" onClick={onReset}>
                  New Article
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Quiz in Progress
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                {currentQuestion + 1} / {totalQuestions}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Question */}
          <QuizQuestionCard
            key={currentQuestion}
            question={data.quiz[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={totalQuestions}
            onAnswer={handleAnswer}
            isAnswered={answeredQuestions[currentQuestion] || false}
          />

          {/* Navigation */}
          {answeredQuestions[currentQuestion] && (
            <div className="mt-6 flex justify-end animate-fade-in">
              <Button variant="hero" onClick={handleNext}>
                {currentQuestion < totalQuestions - 1 ? (
                  <>
                    Next Question
                    <ChevronRight className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    See Results
                    <Trophy className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizContainer;
