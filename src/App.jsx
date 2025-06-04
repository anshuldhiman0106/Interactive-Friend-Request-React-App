import React, { useRef } from "react";
import { gsap } from "gsap";
import Letter from "./components/Letter"; // Ensure this import is correct

import Background from "./components/Background"; // Add this import

const App = () => {
  
  const boxRef = useRef(null);
  const letterRef = useRef(null);

const handleClick = () => {
  const tl = gsap.timeline();
  const box = boxRef.current;
  const select = gsap.utils.selector(box);

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // MOBILE TIMELINE
    tl.to(box, {
      top: "29%",
      duration: 0.5,
      ease: "power2.out",
    });

    tl.to(
      letterRef.current,
      {
        y: "100%",
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
      }
    );

    tl.to(
      box,
      {
        height: "40%", // slightly less for mobile to avoid overflow
        duration: 0.3,
        ease: "power1.inOut",
      },
      "<"
    );

    tl.fromTo(
      select("button:nth-of-type(1)"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

    tl.fromTo(
      select("button:nth-of-type(2)"),
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power1.out",
      },
      "<"
    );
  } else {
    // DESKTOP TIMELINE (original)
    tl.to(box, {
      top: "0%",
      duration: 0.6,
      ease: "power2.out",
    });

    tl.to(
      letterRef.current,
      {
        y: "100%",
        opacity: 0,
        duration: 0.7,
        ease: "power1.out",
      }
    );

    tl.to(
      box,
      {
        height: "100%",
        duration: 0.4,
        ease: "power1.inOut",
      },
      "<"
    );

    tl.fromTo(
      select("button:nth-of-type(1)"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      },
      "-=0.3"
    );

    tl.fromTo(
      select("button:nth-of-type(2)"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      },
      "<"
    );
  }
};


  return (
    <div className="w-screen relative h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <Background ref={boxRef} />
      <Letter ref={letterRef} onClick={handleClick} />
    </div>
  );
};

export default App;
