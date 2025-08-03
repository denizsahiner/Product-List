import React from "react";

interface RatingDisplayProps {
  score: number;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ score }) => {
  const scaledScore = parseFloat((score * 5).toFixed(1));

  const fullStars = Math.floor(scaledScore);
  const hasHalfStar = scaledScore % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-[#E6CA97] ">
          ★
        </span>
      ))}

      {hasHalfStar && <span className="text-[#E6CA97] ">⯪</span>}

      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 ">
          ★
        </span>
      ))}

      <span className="font-avenir-book text-[14px] ml-1 mt-1">{scaledScore}/5</span>
    </div>
  );
};

export default RatingDisplay;
