import React, { useRef, useState } from "react";

const Background = React.forwardRef((props, ref) => {
  const selectedActionRef = useRef(null);
  const [celebration, setCelebration] = useState(false);

  const clickyes = () => {
    console.log("Yes clicked!");

    const container = ref.current;
    const yesButtons = container.querySelectorAll("button.yes-btn");
    yesButtons.forEach((btn) => {
      btn.style.opacity = "0";
      btn.style.pointerEvents = "none";
    });
    setCelebration(true);
  };

  const onClick1 = () => {
    console.log("Running onClick1 (move No button randomly + fade)");

    const button = ref.current.querySelector("button.no-btn");

    const top = Math.floor(Math.random() * 80);
    const left = Math.floor(Math.random() * 80);

    const opacity = parseFloat(getComputedStyle(button).opacity);
    if (opacity <= 0.2) {
      button.style.opacity = "0";
      button.style.pointerEvents = "none";
      button.style.cursor = "default";
      return;
    }

    button.style.opacity = `${opacity - Math.random() * 0.4}`;
    button.style.position = "absolute";
    button.style.top = `${top}%`;
    button.style.left = `${left}%`;
  };

  const onClick2 = () => {
    console.log("Running onClick2 (duplicate Yes buttons)");

    const container = ref.current;
    const noButton = container.querySelector("button.no-btn");

    const noRect = noButton.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const noTop = noRect.top - containerRect.top;
    const noLeft = noRect.left - containerRect.left;

    const yesButtons = container.querySelectorAll("button.yes-btn");

    yesButtons.forEach((btn) => {
      const clone = btn.cloneNode(true);
      clone.textContent = "Yes!";
      clone.classList.add("absolute", "yes-btn");

      const distance = 50 + Math.random() * 150;
      const angle = Math.random() * Math.PI * 2;

      const top = noTop + Math.sin(angle) * distance;
      const left = noLeft + Math.cos(angle) * distance;

      clone.style.top = `${top}px`;
      clone.style.left = `${left}px`;
      clone.style.transition = "all 0.3s ease";

      // Add click handler
      clone.addEventListener("click", clickyes);

      container.appendChild(clone);
    });
  };

  const onClick3 = () => {
    console.log("Running onClick3 (bouncing No button)");

    const container = ref.current;
    const noButton = container.querySelector("button.no-btn");

    noButton.style.pointerEvents = "none";
    noButton.style.cursor = "default";

    let vx = (Math.random() > 0.5 ? 1 : -1) * 4;
    let vy = (Math.random() > 0.5 ? 1 : -1) * 4;

    const containerRect = container.getBoundingClientRect();
    const btnRect = noButton.getBoundingClientRect();
    let x = btnRect.left - containerRect.left;
    let y = btnRect.top - containerRect.top;

    noButton.style.position = "absolute";

    const animate = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const bw = noButton.offsetWidth;
      const bh = noButton.offsetHeight;

      if (x + vx < 0 || x + bw + vx > cw) vx *= -1;
      if (y + vy < 0 || y + bh + vy > ch) vy *= -1;

      x += vx;
      y += vy;

      noButton.style.left = `${x}px`;
      noButton.style.top = `${y}px`;

      requestAnimationFrame(animate);
    };

    animate();
  };

  const handleYesClick = () => {
    clickyes();
  };

  const handleRandomAction = () => {
    if (!selectedActionRef.current) {
      const actions = [onClick1, onClick2, onClick3];
      selectedActionRef.current =
        actions[Math.floor(Math.random() * actions.length)];
    }

    selectedActionRef.current();
  };

  return (
    <div
      ref={ref}
      className="absolute w-[60%] sm:w-[70%] md:w-[50%] lg:w-[33%] flex flex-col items-center h-auto py-10 px-6 sm:px-10 rounded-lg bg-[#FFB6C1]"
    >
      {celebration ? (
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-lg w-fit -rotate-3">
            <div className="w-24 h-24 sm:w-48 sm:h-48 mb-4">
              <img
                src="/heart.gif"
                alt="Celebrating heart"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl mt-6 font-[kam-800] text-[#E74C3C]">
            Yay!
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-center font-[kam-700] text-[#333]">
            I'm so glad you said yes! Let's be friends forever!
          </p>
        </div>
      ) : (
        <>
          <div className="w-full">
            <h1 className="w-full sm:w-[90%] md:w-[70%] mb-8 leading-tight text-3xl sm:text-4xl md:text-6xl font-[kam-800] text-[#E74C3C] text-center">
              Will you be my Friend?
            </h1>
          </div>

          <button
            onClick={handleYesClick}
            className="yes-btn opacity-0 bg-[#E74C3C] mb-4 text-center text-base sm:text-lg md:text-xl font-[kam-700] text-white py-2 px-6 sm:py-3 sm:px-8 rounded-lg"
          >
            Yes!
          </button>

          <button
            onClick={handleRandomAction}
            className="no-btn opacity-0 bg-white text-[#E74C3C] text-xs sm:text-sm font-[kam-400] py-1.5 px-4 sm:py-2 sm:px-5 rounded-lg"
          >
            no
          </button>
        </>
      )}
    </div>
  );
});

export default Background;
