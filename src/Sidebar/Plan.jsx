import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const Plan = () => {
  return (
    <div className="border border-stone-300 rounded-lg p-3 bg-stone-50">
      <p className="text-xs text-stone-500 mb-2">HR Monitor Pro</p>
      <p className="text-sm font-medium text-stone-900 mb-3">
        Upgrade for advanced analytics and unlimited interface monitoring
      </p>
      <button className="flex items-center gap-2 text-xs text-violet-600 hover:text-violet-700 font-medium">
        Learn more
        <FiArrowRight className="text-xs" />
      </button>
    </div>
  );
};

export default Plan;