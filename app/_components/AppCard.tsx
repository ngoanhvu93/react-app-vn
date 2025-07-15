import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router";

interface AppCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  developer: string;
  category: string;
  rating?: number;
  price?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  to?: string;
  action?: "NHẬN" | "MỞ" | "MUA";
  onClick?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  icon,
  title,
  developer,
  category,
  rating = 0,
  isFeatured = false,
  isNew = false,
  to = "/coming-soon",
  action = "MỞ",
  onClick,
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < Math.floor(rating)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const ActionButton = () => {
    return (
      <button
        onClick={onClick}
        className="bg-gray-200 hover:bg-gray-300 text-blue-600 font-semibold rounded-full px-4 py-1 text-sm transition-colors"
      >
        {action}
      </button>
    );
  };

  const CardContent = () => (
    <>
      <div className="flex space-x-3">
        <div className="h-16 w-16 bg-gray-100 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
          {icon}
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-semibold text-sm leading-tight line-clamp-1">
              {title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-1">{developer}</p>
            <p className="text-xs text-gray-400">{category}</p>
          </div>
          {rating > 0 && renderStars(rating)}
        </div>
        <div className="flex items-center">
          <ActionButton />
        </div>
      </div>
      {isFeatured && (
        <div className="mt-1 text-xs font-medium text-blue-600">
          Được đề xuất
        </div>
      )}
      {isNew && (
        <div className="mt-1 text-xs font-medium text-green-600">Mới</div>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="block py-3">
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="py-3">
      <CardContent />
    </div>
  );
};
