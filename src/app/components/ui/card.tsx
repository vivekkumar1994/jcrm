import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export function Button({ onClick, children, className = "" }: ButtonProps) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 ${className}`}>
      {children}
    </button>
  );
}
