import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface AppCollectionProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  horizontal?: boolean;
  children: React.ReactNode;
}

export const AppCollection: React.FC<AppCollectionProps> = ({
  title,
  subtitle,
  viewAllLink,
  horizontal = false,
  children,
}) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-2xl flex items-center gap-1 font-bold"
            >
              {title}
              <ChevronRight className="text-gray-500 p-0.5" size={32} />
            </Link>
          )}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>

      {horizontal ? (
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex space-x-4">{children}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1 divide-y divide-gray-100">
          {children}
        </div>
      )}
    </section>
  );
};
