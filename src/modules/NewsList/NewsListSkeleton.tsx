import { NewsCardSkeleton } from "modules/NewsCard";
import React from "react";
import NewsList from "./NewsList";

interface NewsListSkeletonProps {
  count?: number;
}

const NewsListSkeleton = ({ count = 4 }: NewsListSkeletonProps) => {
  return (
    <div className="mt-20">
      <NewsList>
        {Array(count)
          .fill(0)
          .map((item, index) => (
            <NewsCardSkeleton key={index} />
          ))}
      </NewsList>
    </div>
  );
};

export default NewsListSkeleton;
