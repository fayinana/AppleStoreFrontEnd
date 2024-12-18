import React from "react";

interface LoadingSpinnerProps {
  color?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = "#0d0c2b",
  size = 40,
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center z-50">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          border: `${size / 10}px solid ${color}80`,
          borderTop: `${size / 10}px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
