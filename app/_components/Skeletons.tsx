import React from "react";

export const AppCardSkeleton = () => {
  return (
    <div className="py-3 animate-pulse">
      <div className="flex space-x-3">
        <div className="h-16 w-16 bg-gray-200 rounded-xl flex-shrink-0"></div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="flex items-center">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <div className="w-6 h-3 bg-gray-200 rounded ml-1"></div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedAppCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-md animate-pulse">
      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="w-32 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-48 bg-gray-200"></div>
    </div>
  );
};

export const AppCollectionSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-60"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
      {[...Array(3)].map((_, i) => (
        <AppCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const CategoryItemSkeleton = () => {
  return (
    <div className="flex flex-col items-center animate-pulse">
      <div className="bg-gray-200 w-16 h-16 rounded-xl mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-12"></div>
    </div>
  );
};

export const CategoryListSkeleton = () => {
  return (
    <section className="mb-8 animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-y-4 gap-x-2">
        {[...Array(8)].map((_, i) => (
          <CategoryItemSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export const AppStoreSkeleton: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-4">
          {[...Array(2)].map((_, i) => (
            <FeaturedAppCardSkeleton key={i} />
          ))}
        </div>
      </div>

      <CategoryListSkeleton />

      <AppCollectionSkeleton />
      <AppCollectionSkeleton />
    </div>
  );
};
