import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Target,
  TrendingUp,
  Zap,
  Calendar,
  Info,
} from "lucide-react";
import type { VocabularyCard } from "../types";
import ReviewStats from "./ReviewStats";
import ReviewCalendar from "./ReviewCalendar";
import SuperMemoInfo from "./SuperMemoInfo";

interface VocabularyStatusListProps {
  vocabulary: VocabularyCard[];
  onEdit: (card: VocabularyCard) => void;
  onDelete: (id: string) => void;
  stats: {
    total: number;
    due: number;
    learned: number;
    new: number;
    overdue: number;
    avgEaseFactor: number;
    avgInterval: number;
    retentionRate: number;
  };
  learningStreak: number;
  onStartReview: () => void;
}

export default function VocabularyStatusList({
  vocabulary,
  onEdit,
  onDelete,
  stats,
  learningStreak,
  onStartReview,
}: VocabularyStatusListProps) {
  const [activeTab, setActiveTab] = useState<
    "memorized" | "not-memorized" | "stats" | "calendar" | "info"
  >("stats");

  // Phân loại từ vựng
  const memorizedCards = vocabulary.filter((card) => card.reviewCount > 0);
  const notMemorizedCards = vocabulary.filter((card) => card.reviewCount === 0);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Dễ";
      case "medium":
        return "Trung bình";
      case "hard":
        return "Khó";
      default:
        return "Chưa học";
    }
  };

  const getReviewPriority = (card: VocabularyCard) => {
    const now = new Date();
    let priority = 0;

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

    // Ease factor consideration
    priority += (2.5 - card.easeFactor) * 10;

    return priority;
  };

  const renderCard = (card: VocabularyCard) => {
    const priority = getReviewPriority(card);
    const isOverdue = card.nextReview && card.nextReview < new Date();

    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`bg-white rounded-lg p-4 shadow-sm border transition-shadow ${
          isOverdue
            ? "border-red-200 hover:shadow-md"
            : priority > 10
            ? "border-yellow-200 hover:shadow-md"
            : "border-gray-200 hover:shadow-md"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {card.word}
              </h3>
              <span className="text-sm text-gray-500">
                [{card.pronunciation}]
              </span>
              {isOverdue && (
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                  Quá hạn
                </span>
              )}
              {priority > 10 && !isOverdue && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full font-medium">
                  Ưu tiên
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-2">{card.meaning}</p>

            {card.example && (
              <p className="text-sm text-gray-600 italic mb-3">
                "{card.example}"
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500">
              {card.reviewCount > 0 ? (
                <>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Đã học {card.reviewCount} lần</span>
                  </div>
                  {card.lastReviewed && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Ôn lần cuối: {formatDate(card.lastReviewed)}</span>
                    </div>
                  )}
                  {card.nextReview && (
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      <span>Ôn tiếp: {formatDate(card.nextReview)}</span>
                    </div>
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      card.difficulty
                    )}`}
                  >
                    {getDifficultyText(card.difficulty)}
                  </span>
                  <span className="text-xs text-gray-400">
                    EF: {card.easeFactor.toFixed(2)}
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-1">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Chưa học</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 ml-4">
            <button
              onClick={() => onEdit(card)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Chỉnh sửa"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Xóa"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "stats"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Thống kê & Gợi ý</span>
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "calendar"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Lịch ôn tập</span>
        </button>
        <button
          onClick={() => setActiveTab("memorized")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "memorized"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Đã nhớ ({memorizedCards.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("not-memorized")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "not-memorized"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>Chưa nhớ ({notMemorizedCards.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("info")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "info"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Hướng dẫn</span>
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {activeTab === "stats" ? (
            <ReviewStats
              stats={stats}
              learningStreak={learningStreak}
              onStartReview={onStartReview}
            />
          ) : activeTab === "calendar" ? (
            <ReviewCalendar
              vocabulary={vocabulary}
              onStartReview={onStartReview}
            />
          ) : activeTab === "info" ? (
            <SuperMemoInfo />
          ) : activeTab === "memorized" ? (
            <>
              {memorizedCards.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có từ nào được học</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {memorizedCards
                    .sort((a, b) => getReviewPriority(b) - getReviewPriority(a))
                    .map(renderCard)}
                </div>
              )}
            </>
          ) : (
            <>
              {notMemorizedCards.length === 0 ? (
                <div className="text-center py-8">
                  <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tất cả từ vựng đã được học!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {notMemorizedCards.map(renderCard)}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
