import { BookOpen, Brain, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Powered by AI</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Transform Wikipedia into
            <span className="text-gradient"> Interactive Quizzes</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl">
            Enter any Wikipedia article URL and instantly generate educational quizzes. 
            Test your knowledge with AI-crafted questions based on real content.
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Fact-based questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>Multiple difficulty levels</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span>Instant generation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
