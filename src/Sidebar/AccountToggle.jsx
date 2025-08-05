import React from 'react';
import { ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AccountToggle = ({ collapsed = false }) => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: null,
    role: 'HR Administrator',
  };

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  // Shared dropdown content
  const dropdownContent = (
    <DropdownMenuContent side="top" align="end" className="w-56 z-50 shadow-lg">
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <User className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive">
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full p-2 ${collapsed ? 'justify-center' : 'justify-start'} h-auto`}
        >
          <div className={`flex items-center ${collapsed ? '' : 'space-x-3'} w-full`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.role}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      {dropdownContent}
    </DropdownMenu>
  );
};

export default AccountToggle;
