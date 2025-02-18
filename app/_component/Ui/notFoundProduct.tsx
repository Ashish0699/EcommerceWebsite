import React, { SVGProps } from "react";

const NotFoundProduct = (props: SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </>
  );
};

export default NotFoundProduct;
