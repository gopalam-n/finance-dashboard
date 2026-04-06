import React from 'react';
import { motion } from 'framer-motion';
import { FileX, RefreshCw } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import useStore from '../store/useStore';

const EmptyState = () => {
  const resetFilters = useStore((state) => state.resetFilters);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
      data-testid="empty-state"
    >
      <div className="w-full max-w-md text-center space-y-6">
        <div className="mx-auto w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <FileX className="h-12 w-12 text-zinc-400 dark:text-zinc-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-medium tracking-tight">No Transactions Found</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We couldn't find any transactions matching your current filters. Try adjusting your search criteria or clear all filters to see all transactions.
          </p>
        </div>
        <Button 
          onClick={resetFilters} 
          className="gap-2"
          data-testid="clear-filters-button"
        >
          <RefreshCw className="h-4 w-4" />
          Clear All Filters
        </Button>
      </div>
    </motion.div>
  );
};

export default EmptyState;
