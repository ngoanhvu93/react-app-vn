import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Target,
  Clock,
  Zap,
  BookOpen,
  Award,
  AlertTriangle,
} from "lucide-react";

interface ReviewStatsProps {
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

export default function ReviewStats({
  stats,
  learningStreak,
  onStartReview,
}: ReviewStatsProps) {
  const getRetentionColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getRetentionIcon = (rate: number) => {
    if (rate >= 80) return <TrendingUp className="w-4 h-4" />;
    if (rate >= 60) return <Target className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  const getReviewRecommendation = () => {
    if (stats.due === 0) {
      return {
        title: "Tuyệt vời!",
        message:
          "Bạn đã hoàn thành tất cả bài ôn tập hôm nay. Hãy quay lại vào ngày mai!",
        type: "success",
        action: null,
      };
    }

    if (stats.overdue > 0) {
      return {
        title: "Cần ôn tập gấp!",
        message: `Có ${stats.overdue} từ đã quá hạn ôn tập. Hãy ôn tập ngay để duy trì kiến thức.`,
        type: "urgent",
        action: "Ôn tập ngay",
      };
    }

    if (stats.new > 0) {
      return {
        title: "Học từ mới",
        message: `Có ${stats.new} từ mới cần học. Hãy bắt đầu với những từ này!`,
        type: "new",
        action: "Học từ mới",
      };
    }

    return {
      title: "Ôn tập thường xuyên",
      message: `Có ${stats.due} từ cần ôn tập. Duy trì thói quen học tập mỗi ngày!`,
      type: "review",
      action: "Ôn tập",
    };
  };

  const recommendation = getReviewRecommendation();

  return (
    <div className="space-y-6">
      {/* Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-lg border-2 ${
          recommendation.type === "success"
            ? "bg-green-50 border-green-200"
            : recommendation.type === "urgent"
            ? "bg-red-50 border-red-200"
            : recommendation.type === "new"
            ? "bg-blue-50 border-blue-200"
            : "bg-yellow-50 border-yellow-200"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-2 rounded-lg ${
              recommendation.type === "success"
                ? "bg-green-100 text-green-600"
                : recommendation.type === "urgent"
                ? "bg-red-100 text-red-600"
                : recommendation.type === "new"
                ? "bg-blue-100 text-blue-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {recommendation.type === "success" && <Award className="w-5 h-5" />}
            {recommendation.type === "urgent" && (
              <AlertTriangle className="w-5 h-5" />
            )}
            {recommendation.type === "new" && <BookOpen className="w-5 h-5" />}
            {recommendation.type === "review" && <Target className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1">
              {recommendation.title}
            </h3>
            <p className="text-gray-600 mb-3">{recommendation.message}</p>
            {recommendation.action && (
              <button
                onClick={onStartReview}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  recommendation.type === "urgent"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : recommendation.type === "new"
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
              >
                {recommendation.action}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng từ vựng</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        {/* Due Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                stats.due > 0
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cần ôn tập</p>
              <p
                className={`text-2xl font-bold ${
                  stats.due > 0 ? "text-yellow-600" : "text-green-600"
                }`}
              >
                {stats.due}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Learning Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Chuỗi học tập</p>
              <p className="text-2xl font-bold text-orange-600">
                {learningStreak} ngày
              </p>
            </div>
          </div>
        </motion.div>

        {/* Retention Rate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                stats.retentionRate >= 80
                  ? "bg-green-100 text-green-600"
                  : stats.retentionRate >= 60
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {getRetentionIcon(stats.retentionRate)}
            </div>
            <div>
              <p className="text-sm text-gray-500">Tỷ lệ duy trì</p>
              <p
                className={`text-2xl font-bold ${getRetentionColor(
                  stats.retentionRate
                )}`}
              >
                {stats.retentionRate}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Thống kê học tập
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Đã học:</span>
              <span className="font-medium">{stats.learned}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Từ mới:</span>
              <span className="font-medium">{stats.new}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quá hạn:</span>
              <span
                className={`font-medium ${
                  stats.overdue > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {stats.overdue}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Hiệu quả học tập
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Ease Factor TB:</span>
              <span className="font-medium">{stats.avgEaseFactor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Khoảng cách TB:</span>
              <span className="font-medium">{stats.avgInterval} ngày</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Lời khuyên
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            {stats.retentionRate < 60 && (
              <p>• Tăng cường ôn tập để cải thiện tỷ lệ duy trì</p>
            )}
            {stats.avgEaseFactor < 1.5 && (
              <p>• Tập trung vào những từ khó để cải thiện ease factor</p>
            )}
            {stats.overdue > 0 && (
              <p>• Ôn tập ngay những từ quá hạn để tránh quên</p>
            )}
            {stats.retentionRate >= 80 && stats.due === 0 && (
              <p>• Duy trì thói quen học tập hàng ngày</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
