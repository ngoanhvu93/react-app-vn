import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit,
  Trash2,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  BookOpen,
  Calendar,
  Clock,
} from "lucide-react";
import type { VocabularyCard } from "../types";

interface VocabularyListProps {
  vocabulary: VocabularyCard[];
  onDelete: (id: string) => void;
  onEdit: (card: VocabularyCard) => void;
}

type SortField = "word" | "createdAt" | "lastReviewed" | "reviewCount";
type SortOrder = "asc" | "desc";

export default function VocabularyList({
  vocabulary,
  onDelete,
  onEdit,
}: VocabularyListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const filteredVocabulary = vocabulary
    .filter(
      (card) =>
        card.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "word":
          aValue = a.word.toLowerCase();
          bValue = b.word.toLowerCase();
          break;
        case "createdAt":
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case "lastReviewed":
          aValue = a.lastReviewed?.getTime() || 0;
          bValue = b.lastReviewed?.getTime() || 0;
          break;
        case "reviewCount":
          aValue = a.reviewCount;
          bValue = b.reviewCount;
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(null);
    onDelete(id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Danh sách từ vựng ({filteredVocabulary.length})
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm từ vựng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">Sắp xếp theo:</span>
          <button
            onClick={() => handleSort("word")}
            title="Sắp xếp theo từ vựng"
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
              sortField === "word"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Từ vựng
            {sortField === "word" &&
              (sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              ))}
          </button>
          <button
            onClick={() => handleSort("createdAt")}
            title="Sắp xếp theo ngày tạo"
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
              sortField === "createdAt"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Ngày tạo
            {sortField === "createdAt" &&
              (sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              ))}
          </button>
          <button
            onClick={() => handleSort("lastReviewed")}
            title="Sắp xếp theo lần ôn cuối"
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
              sortField === "lastReviewed"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Lần ôn cuối
            {sortField === "lastReviewed" &&
              (sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              ))}
          </button>
          <button
            onClick={() => handleSort("reviewCount")}
            title="Sắp xếp theo số lần ôn"
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
              sortField === "reviewCount"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Số lần ôn
            {sortField === "reviewCount" &&
              (sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              ))}
          </button>
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="divide-y divide-gray-200">
        <AnimatePresence>
          {filteredVocabulary.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {card.word}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                        card.difficulty
                      )}`}
                    >
                      {card.difficulty === "easy"
                        ? "Dễ"
                        : card.difficulty === "medium"
                        ? "Trung bình"
                        : "Khó"}
                    </span>
                    {card.category && (
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {card.category}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{card.meaning}</p>
                  {card.pronunciation && (
                    <p className="text-sm text-gray-500 mb-2">
                      /{card.pronunciation}/
                    </p>
                  )}
                  {card.example && (
                    <p className="text-sm text-gray-600 italic">
                      "{card.example}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onEdit(card)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Sửa từ vựng"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(card.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa từ vựng"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Ôn {card.reviewCount} lần</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Tạo: {formatDate(card.createdAt)}</span>
                </div>
                {card.lastReviewed && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Ôn cuối: {formatDate(card.lastReviewed)}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredVocabulary.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            {searchTerm ? (
              <div>
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Không tìm thấy từ vựng nào phù hợp</p>
              </div>
            ) : (
              <div>
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có từ vựng nào</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Xóa từ vựng
                  </h3>
                  <p className="text-sm text-gray-600">
                    Bạn có chắc chắn muốn xóa từ vựng này không?
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm!)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
