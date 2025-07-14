import type { VocabularyCard, Difficulty } from "../types";

// Enhanced SuperMemo 2 algorithm implementation
const calculateNextReview = (
  card: VocabularyCard,
  difficulty: Difficulty
): { interval: number; easeFactor: number } => {
  let { interval, easeFactor, reviewCount } = card;

  // Calculate new ease factor with better precision
  let newEaseFactor = easeFactor;
  if (difficulty === "easy") {
    newEaseFactor = Math.max(1.3, easeFactor + 0.1 - (5 - 5) * 0.08);
  } else if (difficulty === "medium") {
    newEaseFactor = Math.max(1.3, easeFactor + (5 - 3) * 0.08 + (5 - 3) * 0.02);
  } else if (difficulty === "hard") {
    newEaseFactor = Math.max(1.3, easeFactor + (5 - 1) * 0.08 + (5 - 1) * 0.02);
  }

  // Calculate new interval with better progression
  let newInterval = interval;
  if (reviewCount === 0) {
    newInterval = 1;
  } else if (reviewCount === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(interval * newEaseFactor);
  }

  // Cap interval to prevent extremely long intervals
  newInterval = Math.min(newInterval, 365);

  return { interval: newInterval, easeFactor: newEaseFactor };
};

// Calculate review priority based on multiple factors
const calculateReviewPriority = (card: VocabularyCard): number => {
  const now = new Date();
  let priority = 0;

  // Base priority from review count (newer cards get higher priority)
  priority += (10 - Math.min(card.reviewCount, 10)) * 10;

  // Overdue penalty
  if (card.nextReview && card.nextReview < now) {
    const daysOverdue = Math.floor(
      (now.getTime() - card.nextReview.getTime()) / (1000 * 60 * 60 * 24)
    );
    priority += daysOverdue * 5;
  }

  // Difficulty-based priority
  if (card.difficulty === "hard") {
    priority += 20;
  } else if (card.difficulty === "medium") {
    priority += 10;
  }

  // Ease factor consideration (lower ease factor = higher priority)
  priority += (2.5 - card.easeFactor) * 10;

  return priority;
};

export function useSpacedRepetition(vocabulary: VocabularyCard[]) {
  const getDueCards = () => {
    const now = new Date();

    return vocabulary
      .filter((card) => {
        // New cards are always due
        if (card.reviewCount === 0) return true;

        // Cards with nextReview date in the past are due
        if (card.nextReview && card.nextReview <= now) return true;

        return false;
      })
      .sort((a, b) => {
        // Sort by calculated priority (higher priority first)
        const priorityA = calculateReviewPriority(a);
        const priorityB = calculateReviewPriority(b);

        if (priorityA !== priorityB) {
          return priorityB - priorityA;
        }

        // Fallback to review count and date
        if (a.reviewCount !== b.reviewCount) {
          return a.reviewCount - b.reviewCount;
        }

        if (a.nextReview && b.nextReview) {
          return a.nextReview.getTime() - b.nextReview.getTime();
        }

        return 0;
      });
  };

  const getReviewQueue = (limit?: number) => {
    const dueCards = getDueCards();
    const now = new Date();

    // Separate cards by type
    const newCards = dueCards.filter((card) => card.reviewCount === 0);
    const reviewCards = dueCards.filter((card) => card.reviewCount > 0);

    // Prioritize new cards but mix with review cards
    const queue = [];
    let newIndex = 0;
    let reviewIndex = 0;

    while (queue.length < (limit || dueCards.length)) {
      // Add new cards first, then mix with reviews
      if (
        newIndex < newCards.length &&
        (queue.length < 5 || reviewIndex >= reviewCards.length)
      ) {
        queue.push(newCards[newIndex]);
        newIndex++;
      } else if (reviewIndex < reviewCards.length) {
        queue.push(reviewCards[reviewIndex]);
        reviewIndex++;
      } else {
        break;
      }
    }

    return queue;
  };

  const markCardReviewed = (
    cardId: string,
    difficulty: Difficulty
  ): VocabularyCard | null => {
    const card = vocabulary.find((c) => c.id === cardId);
    if (!card) return null;

    const { interval, easeFactor } = calculateNextReview(card, difficulty);
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    const updatedCard: VocabularyCard = {
      ...card,
      lastReviewed: new Date(),
      nextReview,
      reviewCount: card.reviewCount + 1,
      difficulty,
      interval,
      easeFactor,
    };

    return updatedCard;
  };

  const getStats = () => {
    const now = new Date();
    const dueCards = getDueCards();
    const totalCards = vocabulary.length;
    const learnedCards = vocabulary.filter(
      (card) => card.reviewCount > 0
    ).length;
    const newCards = vocabulary.filter((card) => card.reviewCount === 0).length;
    const overdueCards = vocabulary.filter(
      (card) => card.nextReview && card.nextReview < now && card.reviewCount > 0
    ).length;

    // Calculate average ease factor and interval
    const learnedCardsWithStats = vocabulary.filter(
      (card) => card.reviewCount > 0
    );
    const avgEaseFactor =
      learnedCardsWithStats.length > 0
        ? learnedCardsWithStats.reduce(
            (sum, card) => sum + card.easeFactor,
            0
          ) / learnedCardsWithStats.length
        : 0;
    const avgInterval =
      learnedCardsWithStats.length > 0
        ? learnedCardsWithStats.reduce((sum, card) => sum + card.interval, 0) /
          learnedCardsWithStats.length
        : 0;

    // Calculate retention rate (cards reviewed in last 7 days)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentlyReviewed = vocabulary.filter(
      (card) => card.lastReviewed && card.lastReviewed > sevenDaysAgo
    ).length;

    return {
      total: totalCards,
      due: dueCards.length,
      learned: learnedCards,
      new: newCards,
      overdue: overdueCards,
      avgEaseFactor: Math.round(avgEaseFactor * 100) / 100,
      avgInterval: Math.round(avgInterval),
      retentionRate:
        totalCards > 0 ? Math.round((recentlyReviewed / totalCards) * 100) : 0,
    };
  };

  const getLearningStreak = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const cardsReviewedOnDate = vocabulary.filter(
        (card) =>
          card.lastReviewed &&
          card.lastReviewed >= currentDate &&
          card.lastReviewed <
            new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
      );

      if (cardsReviewedOnDate.length > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return {
    getDueCards,
    getReviewQueue,
    markCardReviewed,
    getStats,
    getLearningStreak,
  };
}
