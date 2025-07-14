import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { RotateCcw, Volume2, Check, X } from "lucide-react";
import type { VocabularyCard, Difficulty } from "../types";
import { useState, useRef } from "react";

interface VocabularyCardProps {
  card: VocabularyCard;
  isFlipped: boolean;
  onFlip: () => void;
  onDifficulty: (difficulty: Difficulty) => void;
}

export default function VocabularyCard({
  card,
  isFlipped,
  onFlip,
  onDifficulty,
}: VocabularyCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(
    null
  );
  const [dragStartTime, setDragStartTime] = useState<number>(0);
  const [dragDistance, setDragDistance] = useState(0);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const speakWord = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Chỉ cho phép click khi không đang drag và khoảng cách drag nhỏ
    if (!isDragging && dragDistance < 10) {
      onFlip();
    }
  };

  const handleDragStart = (event: any, info: PanInfo) => {
    setIsDragging(true);
    setDragDirection(null);
    setDragStartTime(Date.now());
    setDragDistance(0);
    dragStartRef.current = { x: event.clientX || 0, y: event.clientY || 0 };
  };

  const handleDrag = (event: any, info: PanInfo) => {
    const { offset } = info;
    const threshold = 30;
    setDragDistance(Math.abs(offset.x));

    if (offset.x > threshold) {
      setDragDirection("right");
    } else if (offset.x < -threshold) {
      setDragDirection("left");
    } else {
      setDragDirection(null);
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 80;
    const { offset } = info;
    const dragDuration = Date.now() - dragStartTime;

    // Kiểm tra xem có phải là tap đơn giản không
    const isSimpleTap =
      dragDuration < 200 && Math.abs(offset.x) < 10 && Math.abs(offset.y) < 10;

    if (isSimpleTap) {
      // Nếu là tap đơn giản, lật card
      onFlip();
    } else if (offset.x > swipeThreshold) {
      // Swipe right - "đã nhớ" (easy)
      onDifficulty("easy");
    } else if (offset.x < -swipeThreshold) {
      // Swipe left - "chưa nhớ" (hard)
      onDifficulty("hard");
    }

    // Reset states
    setIsDragging(false);
    setDragDirection(null);
    setDragDistance(0);
    dragStartRef.current = null;
  };

  return (
    <div className="w-full max-w-sm mx-auto px-2 sm:px-4">
      {/* Card */}
      <motion.div
        className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 cursor-pointer"
        onClick={handleCardClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ touchAction: "pan-y" }}
        animate={{
          x:
            dragDirection === "left" ? -20 : dragDirection === "right" ? 20 : 0,
          rotate:
            dragDirection === "left" ? -5 : dragDirection === "right" ? 5 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 md:p-6 flex flex-col justify-center items-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-center w-full">
              <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 break-words">
                  {card.word}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord();
                  }}
                  className="p-1 sm:p-2 text-blue-500 hover:text-blue-600 rounded-full hover:bg-blue-50 flex-shrink-0"
                  title="Phát âm"
                >
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg mb-2 break-words">
                {card.pronunciation}
              </p>
              {card.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2 sm:mb-3 break-words">
                  {card.category}
                </span>
              )}
              <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
                Nhấn để xem nghĩa
              </p>

              {/* Swipe hints for front */}
              <div className="flex items-center justify-between w-full gap-1 sm:gap-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span className="hidden sm:inline">Vuốt trái: Chưa nhớ</span>
                  <span className="sm:hidden">Trái</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="hidden sm:inline">Vuốt phải: Đã nhớ</span>
                  <span className="sm:hidden">Phải</span>
                  <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-xl border-2 border-blue-200 p-3 sm:p-4 md:p-6 flex flex-col justify-center items-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-center w-full">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 break-words">
                {card.meaning}
              </h3>
              <div className="bg-white rounded-lg p-2 sm:p-3 md:p-4 mb-2 sm:mb-4">
                <p className="text-gray-700 italic text-xs sm:text-sm md:text-base break-words">
                  "{card.example}"
                </p>
              </div>

              {/* Swipe hints */}
              <div className="flex items-center justify-between mb-2 sm:mb-3 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                  <span className="hidden sm:inline">Vuốt trái: Chưa nhớ</span>
                  <span className="sm:hidden">Trái</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="hidden sm:inline">Vuốt phải: Đã nhớ</span>
                  <span className="sm:hidden">Phải</span>
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                </div>
              </div>

              {/* Difficulty buttons */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Hoặc chọn mức độ khó:
                </p>
                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDifficulty("hard");
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-1 sm:px-2 md:px-4 py-1 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                  >
                    Khó
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDifficulty("medium");
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-1 sm:px-2 md:px-4 py-1 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                  >
                    <span className="hidden sm:inline">Bình thường</span>
                    <span className="sm:hidden">Bình thường</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDifficulty("easy");
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-1 sm:px-2 md:px-4 py-1 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                  >
                    Dễ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Flip button */}
      <div className="flex justify-center mt-2 sm:mt-3 md:mt-4">
        <button
          onClick={onFlip}
          className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-800 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Lật card"
        >
          <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">
            {isFlipped ? "Xem từ" : "Xem nghĩa"}
          </span>
        </button>
      </div>

      {/* Card info */}
      <div className="mt-2 sm:mt-3 md:mt-4 text-center text-xs sm:text-sm text-gray-500">
        <p>Lần ôn: {card.reviewCount}</p>
        {card.lastReviewed && (
          <p>Ôn lần cuối: {card.lastReviewed.toLocaleDateString("vi-VN")}</p>
        )}
      </div>
    </div>
  );
}
