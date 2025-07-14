import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWord: (
    word: string,
    meaning: string,
    pronunciation: string,
    example: string,
    category?: string
  ) => void;
}

export default function AddWordModal({
  isOpen,
  onClose,
  onAddWord,
}: AddWordModalProps) {
  const [formData, setFormData] = useState({
    word: "",
    meaning: "",
    pronunciation: "",
    example: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.word.trim() && formData.meaning.trim()) {
      onAddWord(
        formData.word,
        formData.meaning,
        formData.pronunciation,
        formData.example,
        formData.category
      );
      setFormData({
        word: "",
        meaning: "",
        pronunciation: "",
        example: "",
        category: "",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Thêm từ vựng mới
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="word"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Từ tiếng Anh *
                </label>
                <input
                  type="text"
                  id="word"
                  value={formData.word}
                  onChange={(e) => handleInputChange("word", e.target.value)}
                  className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Ví dụ: Hello"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="meaning"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nghĩa tiếng Việt *
                </label>
                <input
                  type="text"
                  id="meaning"
                  value={formData.meaning}
                  onChange={(e) => handleInputChange("meaning", e.target.value)}
                  className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Ví dụ: Xin chào"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="pronunciation"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phiên âm
                </label>
                <input
                  type="text"
                  id="pronunciation"
                  value={formData.pronunciation}
                  onChange={(e) =>
                    handleInputChange("pronunciation", e.target.value)
                  }
                  className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Ví dụ: /həˈloʊ/"
                />
              </div>

              <div>
                <label
                  htmlFor="example"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ví dụ
                </label>
                <textarea
                  id="example"
                  value={formData.example}
                  onChange={(e) => handleInputChange("example", e.target.value)}
                  className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Ví dụ: Hello, how are you?"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Danh mục
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn danh mục</option>
                  <option value="Chào hỏi">Chào hỏi</option>
                  <option value="Lịch sự">Lịch sự</option>
                  <option value="Tính từ">Tính từ</option>
                  <option value="Thức ăn & đồ uống">Thức ăn & đồ uống</option>
                  <option value="Số đếm">Số đếm</option>
                  <option value="Màu sắc">Màu sắc</option>
                  <option value="Gia đình">Gia đình</option>
                  <option value="Nhà cửa">Nhà cửa</option>
                  <option value="Giáo dục">Giáo dục</option>
                  <option value="Giao thông">Giao thông</option>
                  <option value="Động vật">Động vật</option>
                  <option value="Kinh doanh">Kinh doanh</option>
                  <option value="Sức khỏe">Sức khỏe</option>
                  <option value="Thời gian">Thời gian</option>
                  <option value="Thiên nhiên">Thiên nhiên</option>
                  <option value="Địa điểm">Địa điểm</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Thêm từ
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
