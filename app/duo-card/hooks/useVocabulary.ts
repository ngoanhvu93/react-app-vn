import { useState, useEffect } from "react";
import type { VocabularyCard, AddWordFormData } from "../types";
import {
  parseVocabularyFromText,
  loadVocabularyFromFile,
} from "../utils/vocabularyImporter";

const STORAGE_KEY = "duo-cards-vocabulary";

export function useVocabulary() {
  const [vocabulary, setVocabulary] = useState<VocabularyCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadVocabulary = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const cards = parsed.map((card: any) => ({
          ...card,
          createdAt: new Date(card.createdAt),
          lastReviewed: card.lastReviewed
            ? new Date(card.lastReviewed)
            : undefined,
          nextReview: card.nextReview ? new Date(card.nextReview) : undefined,
        }));
        setVocabulary(cards);
      }
    } catch (error) {
      console.error("Error loading vocabulary:", error);
    }
  };

  const saveVocabulary = (cards: VocabularyCard[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (error) {
      console.error("Error saving vocabulary:", error);
    }
  };

  const addWord = (
    word: string,
    meaning: string,
    pronunciation: string,
    example: string,
    category?: string
  ) => {
    const newCard: VocabularyCard = {
      id: Date.now().toString(),
      word: word.trim(),
      meaning: meaning.trim(),
      pronunciation: pronunciation.trim(),
      example: example.trim(),
      category: category?.trim(),
      createdAt: new Date(),
      reviewCount: 0,
      difficulty: "medium",
      interval: 1,
      easeFactor: 2.5,
    };

    const updatedVocabulary = [...vocabulary, newCard];
    setVocabulary(updatedVocabulary);
    saveVocabulary(updatedVocabulary);
  };

  const updateCard = (id: string, updates: Partial<VocabularyCard>) => {
    const updatedVocabulary = vocabulary.map((card) =>
      card.id === id ? { ...card, ...updates } : card
    );
    setVocabulary(updatedVocabulary);
    saveVocabulary(updatedVocabulary);
  };

  const deleteCard = (id: string) => {
    const updatedVocabulary = vocabulary.filter((card) => card.id !== id);
    setVocabulary(updatedVocabulary);
    saveVocabulary(updatedVocabulary);
  };

  const importFromFile = async () => {
    setIsLoading(true);
    try {
      const text = await loadVocabularyFromFile();
      if (text) {
        const importedCards = parseVocabularyFromText(text);

        // Merge with existing vocabulary, avoiding duplicates
        const existingWords = new Set(
          vocabulary.map((card) => card.word.toLowerCase())
        );
        const newCards = importedCards.filter(
          (card) => !existingWords.has(card.word.toLowerCase())
        );

        if (newCards.length > 0) {
          const updatedVocabulary = [...vocabulary, ...newCards];
          setVocabulary(updatedVocabulary);
          saveVocabulary(updatedVocabulary);
          return {
            success: true,
            imported: newCards.length,
            total: importedCards.length,
          };
        } else {
          return { success: true, imported: 0, total: importedCards.length };
        }
      }
    } catch (error) {
      console.error("Error importing vocabulary:", error);
      return { success: false, error: "Failed to import vocabulary" };
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllVocabulary = () => {
    setVocabulary([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    loadVocabulary();
  }, []);

  return {
    vocabulary,
    isLoading,
    addWord,
    updateCard,
    deleteCard,
    loadVocabulary,
    importFromFile,
    clearAllVocabulary,
  };
}
