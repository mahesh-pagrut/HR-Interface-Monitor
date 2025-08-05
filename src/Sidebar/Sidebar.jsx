import React from 'react';
import AccountToggle from './AccountToggle';
import Search from './Search';
import RouteSelect from './RouteSelect';
import Plan from './Plan';

const Sidebar = () => {
  return (
    <div className="lg:sticky lg:top-4">
      <div className="overflow-y-auto h-[calc(100vh-32px)] lg:h-[calc(100vh-48px)]">
        <AccountToggle />
        <Search />
        <RouteSelect />
        <Plan />
      </div>
    </div>
  );
};

export default Sidebar;