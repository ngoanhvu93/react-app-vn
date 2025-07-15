import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Search, Gamepad, Package2, Clock, Heart } from "lucide-react";
import { cn } from "~/lib/utils";

interface TabItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

const AppTabBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs: TabItem[] = [
    {
      id: "donate",
      name: "Ủng hộ",
      icon: <Heart className="text-gray-500" />,
      activeIcon: <Heart className="text-blue-500" />,
      path: "/donate",
    },
    {
      id: "games",
      name: "Trò chơi",
      icon: <Gamepad size={24} className="text-gray-500" />,
      activeIcon: <Gamepad size={24} className="text-blue-500" />,
      path: "/games",
    },
    {
      id: "apps",
      name: "Ứng dụng",
      icon: <Package2 className="text-gray-500" />,
      activeIcon: <Package2 className="text-blue-500" />,
      path: "/",
    },
    {
      id: "updates",
      name: "Hôm nay",
      icon: <Clock className="text-gray-500" />,
      activeIcon: <Clock className="text-blue-500" />,
      path: "/app-store",
    },
    {
      id: "search",
      name: "Tìm kiếm",
      icon: <Search size={24} className="text-gray-500" />,
      activeIcon: <Search size={24} className="text-blue-500" />,
      path: "/search",
    },
  ];

  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        window.navigator.standalone === true);

    setIsStandalone(standalone);
  }, []);

  return (
    <div
      className={cn(
        "flex-none sticky z-10 bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-100 py-3",
        {
          "pb-8": isStandalone,
        }
      )}
    >
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path;

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <div className="flex flex-col items-center">
                {isActive ? tab.activeIcon : tab.icon}
                <span
                  className={cn("text-xs mt-1 text-gray-500", {
                    "text-blue-500": isActive,
                  })}
                >
                  {tab.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AppTabBar;
