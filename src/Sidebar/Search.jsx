import React, { useState } from 'react';
import { Search as SearchIcon, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommandMenu from './CommandMenu';

const Search = () => {
  const [showCommandMenu, setShowCommandMenu] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-gray-500 bg-gray-50 border-gray-200 hover:bg-gray-100 h-10 rounded-lg"
        onClick={() => setShowCommandMenu(true)}
      >
        <SearchIcon className="mr-3 h-4 w-4" />
        <span className="text-sm">Search interfaces...</span>
        <div className="ml-auto flex items-center">
          <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded bg-white border border-gray-200 px-2 font-mono text-xs font-medium text-gray-500 shadow-sm">
            <span>⌘</span>K
          </kbd>
        </div>
      </Button>

      <CommandMenu 
        open={showCommandMenu} 
        onOpenChange={setShowCommandMenu} 
      />
    </>
  );
};

export default Search;