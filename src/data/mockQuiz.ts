import { QuizData } from "@/types/quiz";

export const mockQuizData: QuizData = {
  url: "https://en.wikipedia.org/wiki/Albert_Einstein",
  title: "Albert Einstein",
  summary: "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. His work is also known for its influence on the philosophy of science. He is best known to the general public for his mass–energy equivalence formula E = mc², which has been dubbed 'the world's most famous equation'.",
  key_entities: {
    people: ["Albert Einstein", "Mileva Marić", "Max Planck", "Niels Bohr"],
    organizations: ["Swiss Patent Office", "Prussian Academy of Sciences", "Institute for Advanced Study", "Nobel Committee"],
    locations: ["Ulm, Germany", "Zurich, Switzerland", "Berlin", "Princeton, New Jersey"]
  },
  sections: [
    "Early life and education",
    "Career and scientific achievements",
    "Theory of Relativity",
    "Nobel Prize",
    "Later years and death",
    "Legacy"
  ],
  quiz: [
    {
      question: "Where was Albert Einstein born?",
      options: {
        A: "Berlin, Germany",
        B: "Ulm, Germany",
        C: "Vienna, Austria",
        D: "Zurich, Switzerland"
      },
      answer: "B",
      difficulty: "easy",
      explanation: "According to the 'Early life' section, Einstein was born in Ulm, in the Kingdom of Württemberg in the German Empire."
    },
    {
      question: "What is the famous equation associated with Einstein's mass-energy equivalence?",
      options: {
        A: "F = ma",
        B: "E = hf",
        C: "E = mc²",
        D: "PV = nRT"
      },
      answer: "C",
      difficulty: "easy",
      explanation: "The article states that Einstein is best known for his mass–energy equivalence formula E = mc²."
    },
    {
      question: "At which institution did Einstein work in Princeton?",
      options: {
        A: "Princeton University",
        B: "Institute for Advanced Study",
        C: "Bell Labs",
        D: "Carnegie Foundation"
      },
      answer: "B",
      difficulty: "medium",
      explanation: "The 'Later years' section mentions Einstein joined the Institute for Advanced Study in Princeton."
    },
    {
      question: "For which discovery did Einstein receive the Nobel Prize in Physics?",
      options: {
        A: "Theory of General Relativity",
        B: "Special Theory of Relativity",
        C: "Photoelectric Effect",
        D: "Brownian Motion"
      },
      answer: "C",
      difficulty: "medium",
      explanation: "The 'Nobel Prize' section explains that Einstein received the 1921 Nobel Prize for his discovery of the law of the photoelectric effect."
    },
    {
      question: "What was Einstein's first wife's name?",
      options: {
        A: "Elsa Einstein",
        B: "Marie Curie",
        C: "Mileva Marić",
        D: "Lise Meitner"
      },
      answer: "C",
      difficulty: "hard",
      explanation: "According to the 'Personal life' section, Einstein's first wife was Mileva Marić, a Serbian physicist."
    }
  ],
  related_topics: [
    "Theory of Relativity",
    "Quantum Mechanics",
    "Nobel Prize in Physics",
    "History of Physics",
    "Princeton University"
  ]
};
