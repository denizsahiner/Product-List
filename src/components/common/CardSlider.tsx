"use client";
import React, { useState, useRef, useEffect } from "react";

interface CardSliderProps {
  children: React.ReactNode[];

  cardsToShow?: number;
}

const CardSlider: React.FC<CardSliderProps> = ({
  children,
  cardsToShow = 4,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalCards = React.Children.count(children);

  const [responsiveCardsToShow, setResponsiveCardsToShow] =
    useState(cardsToShow);

  const maxIndex = Math.max(0, totalCards - responsiveCardsToShow);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setResponsiveCardsToShow(4);
      } else if (width >= 768) {
        setResponsiveCardsToShow(3);
      } else if (width >= 640) {
        setResponsiveCardsToShow(2);
      } else {
        setResponsiveCardsToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < maxIndex) {
        return prevIndex + 1;
      }
      return 0;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return maxIndex > 0 ? maxIndex : 0;
    });
  };

  useEffect(() => {
    if (sliderRef.current && sliderRef.current.children.length > 0) {
      const firstChild = sliderRef.current.children[0] as HTMLElement;

      const cardWithGap = firstChild.offsetWidth + 16;

      sliderRef.current.style.transform = `translateX(-${
        currentIndex * cardWithGap
      }px)`;
    }
  }, [currentIndex, responsiveCardsToShow, children]);

  return (
    <div className="relative w-full overflow-hidden">
      <button
        onClick={handlePrev}
        className="
          absolute left-4 md:left-10 top-2/5 -translate-y-1/2 
          p-2 z-10
          focus:outline-none 
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:scale-110 transition-transform duration-200
        "
        disabled={currentIndex === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="mx-4 md:mx-20">
        <div
          className="flex flex-nowrap transition-transform duration-300 ease-in-out gap-4"
          ref={sliderRef}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex-none"
              style={{
                width: `calc((100% - ${
                  16 * (responsiveCardsToShow - 1)
                }px) / ${responsiveCardsToShow})`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="
          absolute right-4 md:right-10 top-2/5 -translate-y-1/2 
          p-2 z-10
          focus:outline-none 
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:scale-110 transition-transform duration-200
        "
        disabled={currentIndex === maxIndex}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default CardSlider;
