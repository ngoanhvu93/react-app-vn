import type { VocabularyCard } from "../types";

export function parseVocabularyFromText(text: string): VocabularyCard[] {
  const cards: VocabularyCard[] = [];
  const lines = text.split("\n");

  let currentCategory = "";
  let cardNumber = 1;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) continue;

    // Check if this is a category header
    if (trimmedLine.startsWith("===") && trimmedLine.endsWith("===")) {
      currentCategory = trimmedLine.replace(/=/g, "").trim();
      continue;
    }

    // Check if this is a numbered vocabulary line
    const vocabMatch = trimmedLine.match(
      /^\d+\.\s+(.+?)\s+-\s+(.+?)\s+-\s+"(.+?)"$/
    );
    if (vocabMatch) {
      const [, word, meaning, example] = vocabMatch;

      // Extract pronunciation from meaning (format: "meaning (pronunciation)")
      const pronunciationMatch = meaning.match(/^(.+?)\s+\((.+?)\)$/);
      let cleanMeaning = meaning;
      let pronunciation = "";

      if (pronunciationMatch) {
        cleanMeaning = pronunciationMatch[1].trim();
        pronunciation = pronunciationMatch[2].trim();
      }

      const card: VocabularyCard = {
        id: `imported-${cardNumber}`,
        word: word.trim(),
        meaning: cleanMeaning,
        pronunciation: pronunciation || word.trim(),
        example: example.trim(),
        category: currentCategory || "Khác",
        createdAt: new Date(),
        reviewCount: 0,
        difficulty: "medium",
        interval: 1,
        easeFactor: 2.5,
      };

      cards.push(card);
      cardNumber++;
    }
  }

  return cards;
}

export async function loadVocabularyFromFile(): Promise<string> {
  try {
    const response = await fetch("/all-vocabulary.txt");
    if (!response.ok) {
      throw new Error("Failed to load vocabulary file");
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading vocabulary file:", error);
    return "";
  }
}
