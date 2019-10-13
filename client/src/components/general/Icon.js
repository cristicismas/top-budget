import React from 'react';

const Icon = ({ icon, size, fill, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24">
      <path d={icon} />
    </svg>
  );
};

export default Icon;
