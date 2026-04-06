import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import useStore, { useFilteredTransactions } from '../store/useStore';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { format } from 'date-fns';
import EmptyState from './EmptyState';

const TransactionTable = () => {
  const filters = useStore((state) => state.filters);
  const setFilters = useStore((state) => state.setFilters);
  const transactions = useFilteredTransactions();

  const categories = ['all', 'Food', 'Travel', 'Rent', 'Shopping', 'Bills'];

  const handleSort = (column) => {
    if (filters.sortBy === column) {
      setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilters({ sortBy: column, sortOrder: 'desc' });
    }
  };

  const SortIcon = ({ column }) => {
    if (filters.sortBy !== column) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return filters.sortOrder === 'asc' 
      ? <ArrowUp className="h-3 w-3" /> 
      : <ArrowDown className="h-3 w-3" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
      'Travel': 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',
      'Rent': 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400',
      'Shopping': 'bg-pink-100 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400',
      'Bills': 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
    };
    return colors[category] || 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400';
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border bg-white dark:bg-[#121214] border-zinc-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      {/* Filters Bar */}
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="pl-10"
              data-testid="search-input"
            />
          </div>

          {/* Category Filter */}
          <Select 
            value={filters.category} 
            onValueChange={(value) => setFilters({ category: value })}
          >
            <SelectTrigger className="w-full md:w-[180px]" data-testid="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat} data-testid={`category-option-${cat}`}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <Select 
            value={filters.dateRange} 
            onValueChange={(value) => setFilters({ dateRange: value })}
          >
            <SelectTrigger className="w-full md:w-[180px]" data-testid="date-filter">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="text-left p-4">
                  <button 
                    onClick={() => handleSort('date')} 
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                    data-testid="sort-date"
                  >
                    Date
                    <SortIcon column="date" />
                  </button>
                </th>
                <th className="text-left p-4">
                  <button 
                    onClick={() => handleSort('category')} 
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                    data-testid="sort-category"
                  >
                    Category
                    <SortIcon column="category" />
                  </button>
                </th>
                <th className="text-left p-4">Description</th>
                <th className="text-right p-4">
                  <button 
                    onClick={() => handleSort('amount')} 
                    className="flex items-center gap-2 ml-auto hover:text-foreground transition-colors"
                    data-testid="sort-amount"
                  >
                    Amount
                    <SortIcon column="amount" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-muted/50 transition-colors"
                  data-testid={`transaction-row-${index}`}
                >
                  <td className="p-4">
                    <span className="text-sm font-mono">
                      {format(new Date(tx.date), 'MMM dd, yyyy')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getCategoryColor(tx.category)}`}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{tx.description}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-mono font-medium">
                      ${tx.amount.toFixed(2)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      {transactions.length > 0 && (
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 text-sm text-muted-foreground">
          Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </div>
      )}
    </motion.div>
  );
};

export default TransactionTable;
