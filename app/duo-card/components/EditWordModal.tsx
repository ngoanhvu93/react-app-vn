import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, AlertCircle } from "lucide-react";
import type { VocabularyCard } from "../types";

interface EditWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<VocabularyCard>) => void;
  card: VocabularyCard | null;
}

export default function EditWordModal({
  isOpen,
  onClose,
  onSave,
  card,
}: EditWordModalProps) {
  const [formData, setFormData] = useState({
    word: "",
    meaning: "",
    pronunciation: "",
    example: "",
    category: "",
    difficulty: "medium" as "easy" | "medium" | "hard",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (card) {
      setFormData({
        word: card.word,
        meaning: card.meaning,
        pronunciation: card.pronunciation,
        example: card.example,
        category: card.category || "",
        difficulty: card.difficulty,
      });
      setErrors({});
    }
  }, [card]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.word.trim()) {
      newErrors.word = "Từ vựng không được để trống";
    }

    if (!formData.meaning.trim()) {
      newErrors.meaning = "Nghĩa không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !card) return;

    onSave(card.id, {
      word: formData.word.trim(),
      meaning: formData.meaning.trim(),
      pronunciation: formData.pronunciation.trim(),
      example: formData.example.trim(),
      category: formData.category.trim() || undefined,
      difficulty: formData.difficulty,
    });

    onClose();
  };

  const handleInputChange = (
    field: string,
    value: string | "easy" | "medium" | "hard"
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Chỉnh sửa từ vựng
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Word */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Từ vựng *
                </label>
                <input
                  type="text"
                  value={formData.word}
                  onChange={(e) => handleInputChange("word", e.target.value)}
                  className={`w-full px-3 py-2 border text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.word ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Nhập từ vựng..."
                />
                {errors.word && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.word}
                  </div>
                )}
              </div>

              {/* Meaning */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nghĩa *
                </label>
                <textarea
                  value={formData.meaning}
                  onChange={(e) => handleInputChange("meaning", e.target.value)}
                  rows={2}
                  className={`w-full px-3 py-2 border text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.meaning ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Nhập nghĩa của từ..."
                />
                {errors.meaning && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.meaning}
                  </div>
                )}
              </div>

              {/* Pronunciation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phát âm
                </label>
                <input
                  type="text"
                  value={formData.pronunciation}
                  onChange={(e) =>
                    handleInputChange("pronunciation", e.target.value)
                  }
                  className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: həˈloʊ"
                />
              </div>

              {/* Example */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ví dụ
                </label>
                <textarea
                  value={formData.example}
                  onChange={(e) => handleInputChange("example", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập câu ví dụ..."
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Động từ, Danh từ..."
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Độ khó
                </label>
                <div className="grid grid-cols-3 gap-2 text-gray-700">
                  {(["easy", "medium", "hard"] as const).map((difficulty) => (
                    <button
                      key={difficulty}
                      type="button"
                      onClick={() =>
                        handleInputChange("difficulty", difficulty)
                      }
                      title={`Độ khó: ${
                        difficulty === "easy"
                          ? "Dễ"
                          : difficulty === "medium"
                          ? "Trung bình"
                          : "Khó"
                      }`}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        formData.difficulty === difficulty
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {difficulty === "easy"
                        ? "Dễ"
                        : difficulty === "medium"
                        ? "Trung bình"
                        : "Khó"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
