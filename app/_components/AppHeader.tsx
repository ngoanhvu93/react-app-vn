import React, { memo } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "~/lib/utils";

interface AppHeaderProps {
  title: React.ReactNode | string;
  children?: React.ReactNode;
  onBack?: () => void;
  fontSize?: "text-2xl" | "text-xl" | "text-lg" | "text-sm";
  standalone?: boolean;
}

const AppHeader = ({
  title,
  children,
  onBack,
  fontSize = "text-2xl",
}: AppHeaderProps) => {
  return (
    <div className="dark:bg-gray-900 light:bg-white sticky top-0 z-40 p-4 border-b border-gray-200">
      <div className="flex items-center justify-between w-full">
        {onBack && (
          <button
            className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
            title="Back"
            onClick={onBack}
          >
            <ChevronLeft className="size-6 flex justify-center items-center text-gray-600" />
          </button>
        )}
        <div
          className={cn("text-2xl font-bold flex-1 text-left w-full ", {
            "text-center": onBack,
            "text-2xl": fontSize === "text-2xl",
            "text-xl": fontSize === "text-xl",
            "text-lg": fontSize === "text-lg",
            "text-sm": fontSize === "text-sm",
          })}
        >
          {title}
        </div>
        {/* <UserProfile /> */}
      </div>
      {children}
    </div>
  );
};

export default AppHeader;
