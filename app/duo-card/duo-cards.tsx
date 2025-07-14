import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  BookOpen,
  Settings,
  Download,
  Upload,
  List,
  Grid3X3,
  CheckCircle,
} from "lucide-react";
import VocabularyCard from "./components/VocabularyCard";
import AddWordModal from "./components/AddWordModal";
import EditWordModal from "./components/EditWordModal";
import VocabularyList from "./components/VocabularyList";
import VocabularyStatusList from "./components/VocabularyStatusList";
import { useVocabulary } from "./hooks/useVocabulary";
import { useSpacedRepetition } from "./hooks/useSpacedRepetition";

export default function DuoCards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showImportSuccess, setShowImportSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "list" | "status">(
    "cards"
  );
  const [currentSessionCards, setCurrentSessionCards] = useState<any[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const {
    vocabulary,
    addWord,
    updateCard,
    deleteCard,
    loadVocabulary,
    importFromFile,
    isLoading,
  } = useVocabulary();
  const {
    getDueCards,
    getReviewQueue,
    markCardReviewed,
    getStats,
    getLearningStreak,
  } = useSpacedRepetition(vocabulary);

  const dueCards = getDueCards();
  const reviewQueue = getReviewQueue(50); // Get more cards for review queue
  const stats = getStats();
  const learningStreak = getLearningStreak();

  // Initialize session cards when due cards change
  useEffect(() => {
    if (dueCards.length > 0) {
      setCurrentSessionCards(dueCards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setShowCompletion(false);
    } else {
      // No due cards available
      setCurrentSessionCards([]);
      setShowCompletion(true);
    }
  }, [dueCards]);

  const currentCard = currentSessionCards[currentCardIndex];

  useEffect(() => {
    loadVocabulary();
  }, []);

  const handleNext = () => {
    if (currentCardIndex < currentSessionCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // If we're at the end of current session cards, try to get more cards
      const remainingCards = reviewQueue.filter(
        (card) =>
          !currentSessionCards.some((sessionCard) => sessionCard.id === card.id)
      );

      if (remainingCards.length > 0) {
        // Add remaining cards to session and continue
        const newSessionCards = [...currentSessionCards, ...remainingCards];
        setCurrentSessionCards(newSessionCards);
        setCurrentCardIndex(currentSessionCards.length); // Move to the first new card
        setIsFlipped(false);
      } else {
        // No more cards to review, show completion
        setShowCompletion(true);
      }
    }
  };

  const handleRestartReview = () => {
    setShowCompletion(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    // Refresh the session cards
    if (dueCards.length > 0) {
      setCurrentSessionCards(dueCards);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDifficulty = (difficulty: "easy" | "medium" | "hard") => {
    if (currentCard) {
      const updatedCard = markCardReviewed(currentCard.id, difficulty);
      if (updatedCard) {
        updateCard(currentCard.id, updatedCard);
      }
      handleNext();
    }
  };

  const handleAddWord = (
    word: string,
    meaning: string,
    pronunciation: string,
    example: string
  ) => {
    addWord(word, meaning, pronunciation, example);
    setShowAddModal(false);
  };

  const handleEditWord = (card: any) => {
    setEditingCard(card);
    setShowEditModal(true);
  };

  const handleSaveEdit = (id: string, updates: any) => {
    updateCard(id, updates);
    setShowEditModal(false);
    setEditingCard(null);
  };

  const handleDeleteWord = (id: string) => {
    deleteCard(id);
    // Reset card index if current card is deleted
    if (currentCard && currentCard.id === id) {
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  const handleImportVocabulary = async () => {
    const result = await importFromFile();
    if (result?.success) {
      setShowImportSuccess(true);
      setTimeout(() => setShowImportSuccess(false), 3000);
    }
  };

  const handleStartReview = () => {
    setViewMode("cards");
    setShowCompletion(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    // Refresh the session cards
    if (dueCards.length > 0) {
      setCurrentSessionCards(dueCards);
    }
  };

  if (vocabulary.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Chưa có từ vựng nào
          </h2>
          <p className="text-gray-600 mb-6">Hãy thêm từ vựng để bắt đầu học!</p>

          <div className="space-y-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Thêm từ vựng
            </button>

            <button
              onClick={handleImportVocabulary}
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              {isLoading ? "Đang import..." : "Import từ vựng có sẵn"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-800">Duo Cards</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleImportVocabulary}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                title="Import từ vựng"
              >
                <Download className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                title="Thêm từ mới"
              >
                <Plus className="w-4 h-4" />
                Thêm từ
              </button>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "cards"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="Chế độ thẻ"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="Chế độ danh sách"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("status")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "status"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="Chế độ trạng thái"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
              <button
                className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
                title="Cài đặt"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Tổng từ</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div
              className={`text-2xl font-bold ${
                stats.due > 0 ? "text-yellow-600" : "text-green-600"
              }`}
            >
              {stats.due}
            </div>
            <div className="text-sm text-gray-600">Cần ôn</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.learned}
            </div>
            <div className="text-sm text-gray-600">Đã học</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.new}
            </div>
            <div className="text-sm text-gray-600">Từ mới</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div
              className={`text-2xl font-bold ${
                stats.overdue > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {stats.overdue}
            </div>
            <div className="text-sm text-gray-600">Quá hạn</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {viewMode === "cards" ? (
          showCompletion ? (
            /* Completion Screen */
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 max-w-md mx-auto"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Hoàn thành ôn tập!
                </h2>
                <p className="text-gray-600 mb-6">
                  Bạn đã hoàn thành tất cả các từ cần ôn tập. Hãy quay lại vào
                  ngày mai để tiếp tục học tập!
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleRestartReview}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Ôn tập lại
                  </button>
                  <button
                    onClick={() => setViewMode("status")}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium"
                  >
                    Xem thống kê
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                  {currentCardIndex + 1} / {currentSessionCards.length} từ vựng
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentCardIndex === 0}
                    className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
                    title="Từ trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={
                      currentCardIndex === currentSessionCards.length - 1
                    }
                    className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
                    title="Từ tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card Container */}
              <AnimatePresence mode="wait">
                {currentCard && currentSessionCards.length > 0 ? (
                  <motion.div
                    key={currentCard.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center"
                  >
                    <VocabularyCard
                      card={currentCard}
                      isFlipped={isFlipped}
                      onFlip={handleCardFlip}
                      onDifficulty={handleDifficulty}
                    />
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-500">
                      Không có từ vựng nào để ôn tập
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </>
          )
        ) : viewMode === "list" ? (
          /* List View */
          <VocabularyList
            vocabulary={vocabulary}
            onDelete={handleDeleteWord}
            onEdit={handleEditWord}
          />
        ) : (
          /* Status View */
          <VocabularyStatusList
            vocabulary={vocabulary}
            onEdit={handleEditWord}
            onDelete={handleDeleteWord}
            stats={stats}
            learningStreak={learningStreak}
            onStartReview={handleStartReview}
          />
        )}
      </div>

      {/* Add Word Modal */}
      <AddWordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddWord={handleAddWord}
      />

      {/* Edit Word Modal */}
      <EditWordModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingCard(null);
        }}
        onSave={handleSaveEdit}
        card={editingCard}
      />

      {/* Import Success Toast */}
      <AnimatePresence>
        {showImportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              <span>Import từ vựng thành công!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
