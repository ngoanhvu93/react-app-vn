import AppHeader from "~/_components/AppHeader";
import AppTabBar from "~/_components/AppTabBar";
import { useState, useEffect } from "react";
import { ArrowDownIcon } from "lucide-react";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show button when user is not at the bottom
      setShowScrollButton(scrollTop + windowHeight < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col mx-auto max-w-4xl">
      <AppHeader title="Ứng dụng" />
      <div className="flex flex-col items-center p-4 w-full mx-auto bg-gray-50">
        <p className="text-2xl font-bold text-center text-red-100 bg-amber-500 p-4  overflow-y-auto pb-20">
          {Array.from({ length: 51 }).map((_, index) => (
            <span key={index}>
              AI Gemini trong Gmail có thể vô tình tóm tắt nội dung email lừa
              đảo?
            </span>
          ))}
        </p>
        <button
          onClick={scrollToBottom}
          className="fixed bottom-20 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Cuộn xuống cuối trang"
        >
          <ArrowDownIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <AppTabBar />
      </div>
    </div>
  );
};

export default Home;
