import React from "react";

const RetroLoader = () => {
  return (
    <div className="inline-flex items-center justify-center gap-1.5 px-4 py-2">
      <div className="w-2 h-2 bg-current animate-[square-bounce_0.75s_cubic-bezier(0.4,0,0.2,1)_infinite] [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-current animate-[square-bounce_0.75s_cubic-bezier(0.4,0,0.2,1)_infinite] [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-current animate-[square-bounce_0.75s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
    </div>
  );
};

export default RetroLoader;
