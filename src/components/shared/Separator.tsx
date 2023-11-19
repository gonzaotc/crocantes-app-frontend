import React from "react";

interface SeparatorProps {
  className: string;
}

const Separator = ({ className }: SeparatorProps) => {
  return <hr className={`border-none border-transparent ${className}`}></hr>;
};

export default Separator;
