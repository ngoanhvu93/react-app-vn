import { HeartIcon, PlusIcon, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router";
import AppHeader from "~/_components/AppHeader";
import AppTabBar from "~/_components/AppTabBar";

const ogImage =
  "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-1.jpg";

export function meta() {
  return [
    { title: "Wedding Invitation Creator" },
    {
      name: "description",
      content: "Tạo thiệp cưới đẹp và lưu trữ trên Firebase",
    },
    {
      name: "og:image",
      content: ogImage,
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col mx-auto max-w-4xl">
      <AppHeader onBack={() => navigate("/")} title="Ứng dụng" />
      <div className="flex flex-col items-center p-4 w-full mx-auto bg-gray-50 h-[calc(100vh-134px)] overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          <header className="flex flex-col items-center gap-9">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center mb-6">
                <HeartIcon className="w-16 h-16 text-red-600" />
              </div>
              <h1 className="text-4xl font-bold text-red-700 font-serif">
                Wedding Invitation Creator
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Tạo thiệp cưới đẹp và lưu trữ trên Firebase. Chia sẻ thiệp cưới
                của bạn với bạn bè và gia đình.
              </p>
            </div>
          </header>

          <div className="max-w-[400px] w-full space-y-6 px-4">
            <nav className="rounded-3xl border border-gray-200 p-6 bg-white/80 backdrop-blur-sm shadow-xl space-y-4">
              <p className="leading-6 text-gray-700 text-center font-semibold text-lg">
                Bắt đầu tạo thiệp cưới
              </p>
              <ul className="space-y-3">
                {resources.map(({ href, text, icon, description }) => (
                  <li key={href}>
                    <div
                      className="group cursor-pointer flex items-center gap-3 self-stretch p-4 leading-normal text-gray-700 hover:text-red-600 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                      onClick={() => navigate(href)}
                    >
                      <div className="flex-shrink-0">{icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{text}</div>
                        <div className="text-sm text-gray-500">
                          {description}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <AppTabBar />
    </div>
  );
}

const resources = [
  {
    href: "/thiep-cuoi/ducphuc-hongloan",
    text: "Tạo Thiệp Cưới Mới",
    description: "Tạo thiệp cưới với thông tin tùy chỉnh",
    icon: <PlusIcon className="w-6 h-6 text-red-600" />,
  },
  {
    href: "/thiep-cuoi/ducphuc-hongloan",
    text: "Xem Thiệp Mẫu",
    description: "Xem ví dụ thiệp cưới đã tạo",
    icon: <EyeIcon className="w-6 h-6 text-blue-600" />,
  },
];
