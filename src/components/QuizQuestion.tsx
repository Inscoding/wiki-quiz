import { useState } from "react";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

const difficultyColors = {
  easy: "bg-success/10 text-success border-success/20",
  medium: "bg-accent/10 text-accent border-accent/20",
  hard: "bg-destructive/10 text-destructive border-destructive/20",
};

const QuizQuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  isAnswered,
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    const isCorrect = option === question.answer;
    setShowExplanation(true);
    onAnswer(isCorrect);
  };

  const getOptionVariant = (option: string) => {
    if (!selectedAnswer) return "option";
    if (option === question.answer) return "option-correct";
    if (option === selectedAnswer && option !== question.answer) return "option-incorrect";
    return "option";
  };

  const options = Object.entries(question.options) as [keyof typeof question.options, string][];

  return (
    <Card className="card-elevated animate-scale-in p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </span>
        <Badge variant="outline" className={cn("capitalize", difficultyColors[question.difficulty])}>
          {question.difficulty}
        </Badge>
      </div>

      {/* Question */}
      <h3 className="mb-6 font-serif text-xl font-semibold text-foreground md:text-2xl">
        {question.question}
      </h3>

      {/* Options */}
      <div className="mb-6 space-y-3">
        {options.map(([key, value]) => (
          <Button
            key={key}
            variant={getOptionVariant(key)}
            className={cn(
              "w-full transition-all duration-200",
              selectedAnswer && key === question.answer && "ring-2 ring-success",
              selectedAnswer && key === selectedAnswer && key !== question.answer && "ring-2 ring-destructive"
            )}
            onClick={() => handleSelectAnswer(key)}
            disabled={isAnswered}
          >
            <span className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground">
              {key}
            </span>
            <span className="flex-1 text-left">{value}</span>
            {selectedAnswer && key === question.answer && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
            )}
            {selectedAnswer && key === selectedAnswer && key !== question.answer && (
              <XCircle className="h-5 w-5 shrink-0 text-destructive" />
            )}
          </Button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="animate-slide-up rounded-lg bg-secondary/50 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="mb-1 font-semibold text-foreground">
                {selectedAnswer === question.answer ? "Correct!" : "Not quite right"}
              </p>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default QuizQuestionCard;
