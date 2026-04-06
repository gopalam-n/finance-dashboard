import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useMemo } from 'react';
import { mockTransactions } from '../data/mockData';

const useStore = create(
  persist(
    (set) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // Role (admin or user)
      role: 'admin',
      setRole: (role) => set({ role }),

      // All transactions
      allTransactions: mockTransactions,

      // Filters
      filters: {
        search: '',
        category: 'all',
        dateRange: 'all',
        sortBy: 'date',
        sortOrder: 'desc'
      },
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      resetFilters: () => set({
        filters: {
          search: '',
          category: 'all',
          dateRange: 'all',
          sortBy: 'date',
          sortOrder: 'desc'
        }
      }),
    }),
    {
      name: 'finance-dashboard-storage',
      partialize: (state) => ({
        theme: state.theme,
        role: state.role,
        filters: state.filters
      })
    }
  )
);

// Custom hook: derive filtered transactions reactively
export const useFilteredTransactions = () => {
  const allTransactions = useStore((s) => s.allTransactions);
  const role = useStore((s) => s.role);
  const filters = useStore((s) => s.filters);

  return useMemo(() => {
    let transactions = [...allTransactions];

    // RBAC: Filter by role
    if (role === 'user') {
      transactions = transactions.filter(t => t.userId === 'user-001');
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      transactions = transactions.filter(t =>
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      transactions = transactions.filter(t => t.category === filters.category);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      const last3Months = new Date(now.getFullYear(), now.getMonth() - 3, 1);

      transactions = transactions.filter(t => {
        const txDate = new Date(t.date);
        if (filters.dateRange === 'thisMonth') {
          return txDate >= startOfThisMonth;
        } else if (filters.dateRange === 'lastMonth') {
          return txDate >= startOfLastMonth && txDate <= endOfLastMonth;
        } else if (filters.dateRange === 'last3Months') {
          return txDate >= last3Months;
        }
        return true;
      });
    }

    // Apply sorting
    transactions.sort((a, b) => {
      let comparison = 0;
      if (filters.sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (filters.sortBy === 'amount') {
        comparison = a.amount - b.amount;
      } else if (filters.sortBy === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return transactions;
  }, [allTransactions, role, filters]);
};

export default useStore;
