import React from 'react';

const Grid = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default Grid;