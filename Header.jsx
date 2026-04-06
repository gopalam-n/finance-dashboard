import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Download, ChevronDown } from 'lucide-react';
import useStore, { useFilteredTransactions } from '../store/useStore';
import { userProfiles } from '../data/mockData';
import { Button, buttonVariants } from './ui/button';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const Header = () => {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const filteredTransactions = useFilteredTransactions();
  
  const currentUser = userProfiles[role];

  const handleExport = (format) => {
    if (format === 'csv') {
      exportToCSV(filteredTransactions);
    } else {
      exportToJSON(filteredTransactions);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/60 border-b border-zinc-200/50 dark:border-zinc-800/50"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-xl font-medium tracking-tight">Finance Dashboard</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">RBAC DEMO</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Export Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  data-testid="export-button"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('csv')} data-testid="export-csv">
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('json')} data-testid="export-json">
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0"
              data-testid="theme-toggle"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Role Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="gap-2 h-10"
                  data-testid="role-switcher"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-xs font-medium">{currentUser.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{role}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem 
                  onClick={() => setRole('admin')} 
                  className="gap-2"
                  data-testid="role-admin"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={userProfiles.admin.avatar} alt="Admin" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{userProfiles.admin.name}</span>
                    <span className="text-xs text-muted-foreground">View all transactions</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setRole('user')} 
                  className="gap-2"
                  data-testid="role-user"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={userProfiles.user.avatar} alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{userProfiles.user.name}</span>
                    <span className="text-xs text-muted-foreground">View your transactions</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
