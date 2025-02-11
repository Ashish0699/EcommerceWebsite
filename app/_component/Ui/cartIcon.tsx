import React from "react";

const CartIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={400}
        height={400}
        viewBox="0 0 124 124"
        fill="none"
        {...props}
      >
        <rect width={124} height={124} rx={24} fill="currentColor" />
        <path
          d="M19.375 36.7818V100.625C19.375 102.834 21.1659 104.625 23.375 104.625H87.2181C90.7818 104.625 92.5664 100.316 90.0466 97.7966L26.2034 33.9534C23.6836 31.4336 19.375 33.2182 19.375 36.7818Z"
          fill="white"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{1.5} "
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <circle cx={63.2109} cy={37.5391} r={18.1641} fill="black" />
        <rect
          opacity={0.4}
          x={81.1328}
          y={80.7198}
          width={17.5687}
          height={17.3876}
          rx={4}
          transform="rotate(-45 81.1328 80.7198)"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

export default CartIcon;
