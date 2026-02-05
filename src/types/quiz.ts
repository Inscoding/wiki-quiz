export interface QuizQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
}

export interface KeyEntities {
  people: string[];
  organizations: string[];
  locations: string[];
}

export interface QuizData {
  url: string;
  title: string;
  summary: string;
  key_entities: KeyEntities;
  sections: string[];
  quiz: QuizQuestion[];
  related_topics: string[];
}

export type QuizState = "idle" | "loading" | "ready" | "in-progress" | "completed";
