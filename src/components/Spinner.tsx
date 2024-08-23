import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Spinner;