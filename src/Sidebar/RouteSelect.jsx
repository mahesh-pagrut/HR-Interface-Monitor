import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiLink,
  FiActivity,
  FiBarChart2,
  FiAlertCircle,
  FiFileText,
  FiUsers,
  FiSettings
} from 'react-icons/fi';

const RouteSelect = () => {
  const routes = [
    { Icon: FiHome, title: "Dashboard", path: "/" },
    { Icon: FiLink, title: "Interface Logs", path: "/logs" },
    { Icon: FiActivity, title: "Real-Time Monitor", path: "/monitoring" },
    { Icon: FiBarChart2, title: "Analytics & Trends", path: "/analytics" },
    { Icon: FiAlertCircle, title: "Alerts", path: "/alerts" },
    { Icon: FiFileText, title: "Reports", path: "/reports" },
    { Icon: FiUsers, title: "Users", path: "/users" },
    { Icon: FiSettings, title: "Settings", path: "/settings" }
  ];

  return (
    <div className="space-y-1 mb-4">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
              isActive
                ? 'bg-white text-stone-950 shadow'
                : 'hover:bg-stone-200 bg-transparent text-stone-500 shadow-none'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <route.Icon className={isActive ? 'text-violet-500' : ''} />
              <span>{route.title}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default RouteSelect;