import React from 'react';
import ReactComponentMonoLib from '@/main';

export default () => {
  return (
    <div className="p-5 border w-4/5 mx-auto mt-10 bg-gray-100 rounded-md hover:bg-gray-200">
      <ReactComponentMonoLib className="debug-red inline-block p-1" />
    </div>
  );
};
