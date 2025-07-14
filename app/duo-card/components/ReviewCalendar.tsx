import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import type { VocabularyCard } from "../types";

interface ReviewCalendarProps {
  vocabulary: VocabularyCard[];
  onStartReview: () => void;
}

export default function ReviewCalendar({
  vocabulary,
  onStartReview,
}: ReviewCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const getCardsForDate = (date: Date) => {
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    return vocabulary.filter((card) => {
      if (!card.nextReview) return false;
      return card.nextReview >= startOfDay && card.nextReview < endOfDay;
    });
  };

  const getOverdueCards = () => {
    const now = new Date();
    return vocabulary.filter(
      (card) => card.nextReview && card.nextReview < now && card.reviewCount > 0
    );
  };

  const getTodayCards = () => {
    return getCardsForDate(new Date());
  };

  const getTomorrowCards = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getCardsForDate(tomorrow);
  };

  const getWeekCards = () => {
    const cards = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayCards = getCardsForDate(date);
      cards.push({ date, cards: dayCards });
    }
    return cards;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getDateColor = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "bg-blue-500 text-white";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  const { daysInMonth, startingDay } = getDaysInMonth(selectedDate);
  const overdueCards = getOverdueCards();
  const todayCards = getTodayCards();
  const tomorrowCards = getTomorrowCards();
  const weekCards = getWeekCards();

  return (
    <div className="space-y-6">
      {/* Overdue Alert */}
      {overdueCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800">
                {overdueCards.length} từ quá hạn ôn tập
              </h3>
              <p className="text-red-600 text-sm">
                Hãy ôn tập ngay để tránh quên kiến thức
              </p>
            </div>
            <button
              onClick={onStartReview}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Ôn tập ngay
            </button>
          </div>
        </motion.div>
      )}

      {/* Today's Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Ôn tập hôm nay</h3>
            <p className="text-sm text-gray-600">
              {todayCards.length} từ cần ôn tập
            </p>
          </div>
        </div>

        {todayCards.length > 0 ? (
          <div className="space-y-3">
            {todayCards.slice(0, 5).map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{card.word}</h4>
                  <p className="text-sm text-gray-600">{card.meaning}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {card.reviewCount} lần ôn
                </div>
              </div>
            ))}
            {todayCards.length > 5 && (
              <p className="text-sm text-gray-500 text-center">
                Và {todayCards.length - 5} từ khác...
              </p>
            )}
            <button
              onClick={onStartReview}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium"
            >
              Bắt đầu ôn tập
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <Target className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-gray-500">Không có từ nào cần ôn tập hôm nay!</p>
          </div>
        )}
      </motion.div>

      {/* This Week Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              Lịch ôn tập tuần này
            </h3>
            <p className="text-sm text-gray-600">Tổng quan 7 ngày tới</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekCards.map(({ date, cards }) => (
            <div
              key={date.toISOString()}
              className={`p-3 rounded-lg text-center ${
                cards.length > 0
                  ? "bg-yellow-50 border border-yellow-200"
                  : "bg-gray-50"
              }`}
            >
              <div className="text-xs font-medium text-gray-600 mb-1">
                {formatDate(date)}
              </div>
              <div
                className={`text-lg font-bold ${
                  cards.length > 0 ? "text-yellow-600" : "text-gray-400"
                }`}
              >
                {cards.length}
              </div>
              <div className="text-xs text-gray-500">từ</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tomorrow's Preview */}
      {tomorrowCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Ôn tập ngày mai</h3>
              <p className="text-sm text-gray-600">
                {tomorrowCards.length} từ sẽ cần ôn tập
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {tomorrowCards.slice(0, 3).map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-2 bg-purple-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{card.word}</h4>
                  <p className="text-sm text-gray-600">{card.meaning}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {card.reviewCount} lần ôn
                </div>
              </div>
            ))}
            {tomorrowCards.length > 3 && (
              <p className="text-sm text-gray-500 text-center">
                Và {tomorrowCards.length - 3} từ khác...
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Study Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
      >
        <h3 className="font-semibold text-gray-800 mb-3">
          💡 Lời khuyên ôn tập
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Ôn tập đều đặn mỗi ngày để duy trì kiến thức</p>
          <p>• Tập trung vào những từ khó (đánh dấu "Khó")</p>
          <p>• Ôn tập ngay những từ quá hạn để tránh quên</p>
          <p>• Duy trì chuỗi học tập để tăng động lực</p>
          <p>• Sử dụng thuật toán SuperMemo để tối ưu thời gian ôn tập</p>
        </div>
      </motion.div>
    </div>
  );
}
