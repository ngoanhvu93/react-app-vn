import React from "react";
import { Link } from "react-router";

interface FeaturedAppCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  to?: string;
  tagline?: string;
  actionLabel?: string;
}

export const FeaturedAppCard: React.FC<FeaturedAppCardProps> = ({
  id,
  title,
  subtitle,
  imageUrl,
  to = "",
  tagline,
  actionLabel = "GET",
}) => {
  const CardContent = () => (
    <div
      id={id}
      className="relative overflow-hidden rounded-xl bg-white shadow-md"
    >
      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="text-xs text-blue-600 font-medium uppercase">
            {subtitle}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1">{title}</h3>
        {tagline && <p className="text-sm text-gray-600 mb-3">{tagline}</p>}
        <button className="bg-gray-200 hover:bg-gray-300 text-blue-600 font-semibold rounded-full px-5 py-1.5 text-sm transition-colors">
          {actionLabel}
        </button>
      </div>
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};
