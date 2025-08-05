import React, { useState, useEffect, useRef } from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import { format } from 'date-fns';

const today = new Date();
const formattedDate = format(today, "EEEE, MMM do yyyy");

const ranges = [
  { label: "Prev 6 Months", value: "6m" },
  { label: "Prev 3 Months", value: "3m" },
  { label: "Prev 1 Month", value: "1m" },
  { label: "Last 15 Days", value: "15d" },
  { label: "Last 48 Hours", value: "48h" },
  { label: "Last 24 Hours", value: "24h" },
];

const TopBar = ({ onRangeChange }) => {
  const [selected, setSelected] = useState("6m");
  const [open, setOpen] = useState(false);
  const drawerRef = useRef();

  const selectedLabel = ranges.find(r => r.value === selected)?.label || "Prev 6 Months";

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRangeSelect = (value) => {
    setSelected(value);
    setOpen(false);
    if (onRangeChange) onRangeChange(value);
  };

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200 relative z-50">
      <div className="flex items-center justify-between">
        {/* Left: Greeting */}
        <div>
          <span className="text-sm font-bold block">Hey, Admin!</span>
          <span className="text-xs block text-stone-500">{formattedDate}</span>
        </div>

        {/* Right: Drawer Trigger + Drawer Content */}
        <div className="relative" ref={drawerRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex text-sm items-center gap-2 bg-stone-100 transition-all hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
          >
            <FiBarChart2 className="text-base" />
            <span>{selectedLabel}</span>
          </button>

          {/* Drawer Dropdown Panel */}
          <div
            className={`absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded-md shadow-lg transform transition-all duration-200 origin-top-right ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
              }`}
            style={{ zIndex: 9999 }}
          >
            <div className="p-3">
              <div className="text-xs font-semibold text-stone-500 mb-2">
                📊 Filter Dashboard Data
              </div>
              <div className="flex flex-col gap-1">
                {ranges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handleRangeSelect(range.value)}
                    className={`text-left text-sm px-3 py-2 rounded-md transition-colors ${selected === range.value
                        ? 'bg-violet-100 text-violet-700'
                        : 'hover:bg-stone-100'
                      }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;