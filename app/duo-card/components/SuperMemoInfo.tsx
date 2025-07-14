import { motion } from "framer-motion";
import {
  Info,
  Lightbulb,
  TrendingUp,
  Clock,
  Target,
  Zap,
  AlertTriangle,
} from "lucide-react";

export default function SuperMemoInfo() {
  return (
    <div className="space-y-6">
      {/* Algorithm Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              Thuật toán SuperMemo 2
            </h3>
            <p className="text-sm text-gray-600">
              Thuật toán ôn tập thông minh dựa trên nghiên cứu khoa học
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              🎯 Nguyên lý hoạt động:
            </h4>
            <ul className="space-y-2 ml-4">
              <li>
                • <strong>Ease Factor (EF):</strong> Độ dễ của từ vựng (1.3 -
                2.5)
              </li>
              <li>
                • <strong>Interval:</strong> Khoảng cách giữa các lần ôn tập
              </li>
              <li>
                • <strong>Review Count:</strong> Số lần đã ôn tập
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              📊 Cách tính toán:
            </h4>
            <ul className="space-y-2 ml-4">
              <li>
                • <strong>Dễ:</strong> Tăng EF, tăng khoảng cách ôn tập
              </li>
              <li>
                • <strong>Trung bình:</strong> Giữ nguyên EF, tăng khoảng cách
                vừa phải
              </li>
              <li>
                • <strong>Khó:</strong> Giảm EF, giảm khoảng cách ôn tập
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Usage Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              💡 Cách sử dụng hiệu quả
            </h3>
            <p className="text-sm text-gray-600">
              Hướng dẫn để tối ưu hóa việc học tập
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-green-100 text-green-600 rounded">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Đánh giá chính xác
                </h4>
                <p className="text-sm text-gray-600">
                  Hãy đánh giá độ khó một cách trung thực. Đừng quá dễ dãi với
                  bản thân.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 bg-blue-100 text-blue-600 rounded">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Ôn tập đều đặn</h4>
                <p className="text-sm text-gray-600">
                  Duy trì thói quen ôn tập hàng ngày để thuật toán hoạt động
                  hiệu quả.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 bg-purple-100 text-purple-600 rounded">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Theo dõi tiến độ</h4>
                <p className="text-sm text-gray-600">
                  Quan sát ease factor và khoảng cách ôn tập để đánh giá hiệu
                  quả học tập.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-orange-100 text-orange-600 rounded">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Tập trung vào từ khó
                </h4>
                <p className="text-sm text-gray-600">
                  Ưu tiên ôn tập những từ có ease factor thấp hoặc đánh dấu
                  "Khó".
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 bg-red-100 text-red-600 rounded">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Ôn tập từ quá hạn</h4>
                <p className="text-sm text-gray-600">
                  Luôn ưu tiên ôn tập những từ đã quá hạn để tránh quên kiến
                  thức.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 bg-indigo-100 text-indigo-600 rounded">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Đặt mục tiêu</h4>
                <p className="text-sm text-gray-600">
                  Đặt mục tiêu số từ ôn tập mỗi ngày và duy trì chuỗi học tập.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Algorithm Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200"
      >
        <h3 className="font-semibold text-gray-800 mb-4">
          🚀 Lợi ích của SuperMemo 2
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Tối ưu thời gian</h4>
            <p className="text-sm text-gray-600">
              Chỉ ôn tập những từ cần thiết, tiết kiệm thời gian học tập
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Tăng hiệu quả</h4>
            <p className="text-sm text-gray-600">
              Tỷ lệ ghi nhớ cao hơn so với phương pháp học truyền thống
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Học thông minh</h4>
            <p className="text-sm text-gray-600">
              Thuật toán tự động điều chỉnh dựa trên khả năng của bạn
            </p>
          </div>
        </div>
      </motion.div>

      {/* Study Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        <h3 className="font-semibold text-gray-800 mb-4">
          📅 Lịch trình học tập đề xuất
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                Buổi sáng (15-20 phút)
              </h4>
              <p className="text-sm text-gray-600">
                Ôn tập từ quá hạn và từ khó
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                Buổi chiều (10-15 phút)
              </h4>
              <p className="text-sm text-gray-600">
                Học từ mới và ôn tập từ trung bình
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Buổi tối (10 phút)</h4>
              <p className="text-sm text-gray-600">Ôn tập nhanh những từ dễ</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>💡 Lưu ý:</strong> Lịch trình này có thể điều chỉnh theo
            thời gian và khả năng của bạn. Quan trọng nhất là duy trì thói quen
            học tập đều đặn.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
