import React, { forwardRef } from 'react';

const Letter = forwardRef(({ onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="absolute w-[90%] sm:w-[70%] md:w-[44%] h-[30%] sm:h-[65%] md:h-[69%] bg-[#E74C3C] rounded-lg shadow-2xl shadow-red-300 flex items-center justify-center cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onClick?.();
      }}
      
    >
      <img
        className="absolute z-[4] right-3 top-3 w-16 sm:w-20 md:w-24"
        src='./src/assets/stamp.png'
        alt="stamp"
      />
     <h1 className="text-center text-white font-bold font-[myFont] text-3xl sm:text-4xl md:text-5xl">
        For You
      </h1>
    </div>
  );
});

export default Letter;
