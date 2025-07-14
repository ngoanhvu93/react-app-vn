export interface VocabularyCard {
  id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  example: string;
  category?: string;
  createdAt: Date;
  lastReviewed?: Date;
  nextReview?: Date;
  reviewCount: number;
  difficulty: "easy" | "medium" | "hard";
  interval: number; // days until next review
  easeFactor: number; // SuperMemo algorithm ease factor
}

export interface AddWordFormData {
  word: string;
  meaning: string;
  pronunciation: string;
  example: string;
  category?: string;
}

export type Difficulty = "easy" | "medium" | "hard";
