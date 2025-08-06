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

  if (collapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-10 h-10 p-0 hover:bg-gray-100 rounded-xl">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="w-56 shadow-lg border-gray-200">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:bg-gray-50">
            <User className="mr-3 h-4 w-4 text-gray-500" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-50">
            <Settings className="mr-3 h-4 w-4 text-gray-500" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 hover:bg-red-50">
            <LogOut className="mr-3 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start p-3 h-auto bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200"
        >
          <div className="flex items-center space-x-3 w-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="end" className="w-56 shadow-lg border-gray-200">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="hover:bg-gray-50">
          <User className="mr-3 h-4 w-4 text-gray-500" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-gray-50">
          <Settings className="mr-3 h-4 w-4 text-gray-500" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600 hover:bg-red-50">
          <LogOut className="mr-3 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountToggle;
