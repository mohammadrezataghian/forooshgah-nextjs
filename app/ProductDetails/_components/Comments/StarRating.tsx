'use client'

type StarRatingProps = {
    value:number;
    max?:number;
    size:number;
}

const StarRating = ({ value, max = 5, size }:StarRatingProps) => {
    const percentage = Math.min((value / max) * 100, 100);
  
    return (
      <div className="inline-flex flex-nowrap relative">
        {/* Base layer (gray stars) */}
        <div className="flex">
          {Array.from({ length: max }).map((_, i) => (
            <div key={i} className="flex">
              <svg
              viewBox="0 0 24 24"
              style={{ width: size, height: size, fill: "#A1A3A8" }}
              >
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
              </svg>
            </div>
          ))}
        </div>
  
        {/* Filled layer (yellow stars) */}
        <div
          className="absolute right-0 top-0 overflow-hidden"
          style={{ width: `${percentage}%`, height: size }}
        >
          <div className="flex flex-nowrap absolute right-0 top-0">
            {Array.from({ length: max }).map((_, i) => (
              <div key={i} className="flex">
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: size, height: size, fill: "#FFDE21" }}
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  export default StarRating;