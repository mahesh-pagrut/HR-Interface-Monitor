import React, { useState } from 'react';
import { Search as SearchIcon, Command } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CommandMenu from './CommandMenu';

const Search = () => {
  const [showCommandMenu, setShowCommandMenu] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground bg-sidebar-background border-sidebar-border hover:bg-sidebar-accent"
        onClick={() => setShowCommandMenu(true)}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span>Search interfaces...</span>
        <div className="ml-auto flex space-x-1">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
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