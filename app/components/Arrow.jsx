"use client";

import { React, useEffect, useState } from "react";

export default function Arrow() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-16 h-16 lg:w-20 lg:h-20 bg-purple active:bg-black rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={isMobile ? "25" : "35"}
        height={isMobile ? "25" : "35"}
        viewBox="0 0 46 44"
      >
        <g fill="none" stroke="#FFF" strokeWidth="3">
          <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
        </g>
      </svg>
    </div>
  );
}
