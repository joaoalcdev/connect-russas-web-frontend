import React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-300 rounded ${className}`}>
      {/* You can add more divs here to mimic the shape of the content being loaded */}
    </div>
  );
};

export default Skeleton;
