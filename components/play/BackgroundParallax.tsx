import React from "react";

const DynamicBackground = () => {
  const layers = [
    {
      id: 1,
      image: "/environments/bg_forest_last.png",
      speed: "animate-scroll-slowest",
    },

    {
      id: 2,
      image: "/environments/bg_forest_b3.png",
      speed: "animate-scroll-fast",
    },
    {
      id: 3,
      image: "/environments/bg_forest_b2.png",
      speed: "animate-scroll-medium",
    },
    {
      id: 4,
      image: "/environments/bg_forest_b1.png",
      speed: "animate-scroll-slow",
    },
    {
      id: 5,
      image: "/environments/bg_forest_ground.png",
      speed: "animate-scroll-ground",
    },
  ];

  return (
    <div className="relative w-full h-screen bottom-32  ">
      <img
        key={layers[0].id}
        className={"absolute w-full h-full object-cover z-1"}
        src={layers[0].image}
      />

      <img
        key={layers[1].id}
        className={`absolute w-full h-full object-cover z-2`}
        src={layers[1].image}
      />

      <img
        key={layers[2].id}
        className={`absolute w-full h-full object-cover z-3`}
        src={layers[2].image}
      />
      <img
        key={layers[3].id}
        className={`absolute w-full h-full object-cover z-4`}
        src={layers[3].image}
      />

      <img
        key={layers[4].id}
        className={`absolute w-full h-full object-cover z-5`}
        src={layers[4].image}
      />
    </div>
  );
};

export default DynamicBackground;
