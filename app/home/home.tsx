import AppHeader from "~/_components/AppHeader";
import AppTabBar from "~/_components/AppTabBar";
import { useState, useEffect } from "react";
import { ArrowDownIcon } from "lucide-react";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    const scrollContainer = document.querySelector(".overflow-y-auto");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(".overflow-y-auto");
    if (scrollContainer) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
        setShowScrollButton(!isNearBottom);
      };

      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial state

      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="w-full flex flex-col mx-auto min-h-screen overflow-hidden max-w-4xl">
      <div className="flex-none">
        <AppHeader title="Ứng dụng" />
      </div>

      <div className="flex-grow h-[calc(100vh-300px)] overflow-y-auto relative">
        <p className="text-2xl font-bold text-center h-[2000px] text-red-100 bg-amber-500 p-4">
          AI Gemini trong Gmail có thể vô tình tóm tắt nội dung email lừa đảo?
          Vào ngày 15/7/2025, "blurrylogic" - một nhà nghiên cứu an ninh mạng đã
          chứng minh AI Gemini trong Gmail có thể bị thao túng để hiển thị phần
          tóm tắt nội dung từ email lừa đảo. Lỗ hổng này được gửi tới 0din,
          chương trình tiền thưởng tìm lỗi của Mozilla Foundation dành cho các
          ứng dụng AI. Cụ thể hơn, các câu lệnh lừa đảo có thể được chèn vào nội
          dung email dưới định dạng HTML (hoặc dưới dạng văn bản được ẩn bằng
          màu phông chữ vô hình). Gemini sẽ hiểu các câu lệnh này là mệnh lệnh
          và có thể hiển thị chúng trong bản tóm tắt email mà không hề đưa ra
          cảnh báo cho người dùng. Do câu lệnh lừa đảo được ẩn trong phần nội
          dung của email gốc nên người dùng sẽ khó phát hiện ra. Vì vậy, người
          dùng có khả năng tin rằng đó là cảnh báo do Gemini tạo ra. Nhà nghiên
          cứu blurrylogic chỉ ra Gemini trong Gmail có thể bị khai thác để hiển
          thị các tin nhắn buộc người nhận chia sẻ thông tin nhạy cảm mà không
          xác minh đúng cách, dẫn đến việc thông tin đăng nhập của họ có thể bị
          đánh cắp. Sau khi nghiên cứu trên được chia sẻ, Google đã chia sẻ chi
          tiết về các bước họ đã thực hiện để giúp AI Gemini cảnh giác hơn trước
          những chiêu trò như vậy. Chẳng hạn như: - Liên tục cập nhật kho dữ
          liệu về các lời nhắc hoặc chỉ dẫn độc hại có thể thao túng đầu ra của
          Gemini. - Huấn luyện liên tục các mô hình học máy cơ bản để đảm bảo AI
          không phản hồi các chỉ dẫn độc hại. - Gemini sẽ nhận diện các liên kết
          đáng ngờ (hoặc giả mạo thành những liên kết hữu ích) trong nội dung
          email và xóa khỏi các bản tóm tắt email.{" "}
        </p>

        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-20 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Cuộn xuống cuối trang"
          >
            <ArrowDownIcon className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="flex-none">
        <AppTabBar />
      </div>
    </div>
  );
};

export default Home;
